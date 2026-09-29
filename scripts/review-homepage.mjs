/**
 * Homepage review harness — Playwright + axe-core.
 * Captures screenshots, console errors, overflow, and a11y violations.
 */
import { chromium, devices } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.REVIEW_URL || "http://localhost:3003";
const OUT = path.join(process.cwd(), ".review");

async function ensureOut() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(path.join(OUT, "shots"), { recursive: true });
}

async function measureOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const offenders = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > clientWidth + 2 && r.right > clientWidth + 8) {
        const tag = el.tagName.toLowerCase();
        const cls = typeof el.className === "string" ? el.className.slice(0, 80) : "";
        offenders.push({ tag, cls, width: Math.round(r.width), right: Math.round(r.right) });
      }
    });
    return {
      scrollWidth,
      clientWidth,
      hasHorizontalScroll: scrollWidth > clientWidth + 2,
      offenders: offenders.slice(0, 12),
    };
  });
}

async function sectionSnapshots(page, prefix) {
  const ids = [
    "top",
    "trust",
    "story",
    "products",
    "why",
    "process",
    "sample",
    "contact",
  ];
  const results = [];
  for (const id of ids) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) {
      results.push({ id, present: false });
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const file = path.join(OUT, "shots", `${prefix}-${id}.png`);
    await el.screenshot({ path: file });
    results.push({ id, present: true, file: path.relative(process.cwd(), file) });
  }
  return results;
}

async function runViewport(browser, name, options = {}) {
  const context = await browser.newContext({
    ...options,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(String(err)));

  const started = Date.now();
  const response = await page.goto(BASE, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(1200);
  const loadMs = Date.now() - started;

  const fullPath = path.join(OUT, "shots", `${name}-full.png`);
  await page.screenshot({ path: fullPath, fullPage: true });

  const heroPath = path.join(OUT, "shots", `${name}-hero.png`);
  await page.screenshot({ path: heroPath, fullPage: false });

  const overflow = await measureOverflow(page);
  const sections = await sectionSnapshots(page, name);

  // Heading outline
  const headings = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => ({
      tag: h.tagName,
      text: (h.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120),
    })),
  );

  // Landmark / interactive counts
  const structure = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelectorAll("h1").length,
    nav: document.querySelectorAll("nav").length,
    main: document.querySelectorAll("main").length,
    footer: document.querySelectorAll("footer").length,
    imagesMissingAlt: [...document.querySelectorAll("img")].filter(
      (i) => !i.hasAttribute("alt"),
    ).length,
    buttonsWithoutName: [...document.querySelectorAll("button")].filter((b) => {
      const label =
        b.getAttribute("aria-label") ||
        b.textContent?.trim() ||
        b.getAttribute("title");
      return !label;
    }).length,
    linksWithoutName: [...document.querySelectorAll("a")].filter((a) => {
      const label =
        a.getAttribute("aria-label") ||
        a.textContent?.trim() ||
        a.getAttribute("title");
      return !label;
    }).length,
  }));

  // Touch targets on mobile-ish widths
  const smallTargets = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll("a, button")];
    return nodes
      .map((el) => {
        const r = el.getBoundingClientRect();
        const label = (el.getAttribute("aria-label") || el.textContent || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 60);
        return {
          label,
          w: Math.round(r.width),
          h: Math.round(r.height),
        };
      })
      .filter((t) => t.w > 0 && t.h > 0 && (t.w < 44 || t.h < 44))
      .slice(0, 20);
  });

  let axe;
  try {
    axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  } catch (e) {
    axe = { error: String(e), violations: [] };
  }

  await context.close();

  return {
    name,
    viewport: page.viewportSize(),
    status: response?.status() ?? null,
    loadMs,
    consoleErrors,
    pageErrors,
    overflow,
    headings,
    structure,
    smallTargets,
    sections,
    shots: {
      full: path.relative(process.cwd(), fullPath),
      hero: path.relative(process.cwd(), heroPath),
    },
    axe: {
      violations: (axe.violations || []).map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.slice(0, 5).map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      passes: axe.passes?.length ?? 0,
      incomplete: axe.incomplete?.length ?? 0,
    },
  };
}

async function main() {
  await ensureOut();
  const browser = await chromium.launch({ headless: true });

  const desktop = await runViewport(browser, "desktop", {
    viewport: { width: 1440, height: 900 },
  });
  const mobile = await runViewport(browser, "mobile", {
    ...devices["iPhone 13"],
  });

  await browser.close();

  const report = {
    url: BASE,
    generatedAt: new Date().toISOString(),
    desktop,
    mobile,
  };

  const jsonPath = path.join(OUT, "report.json");
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  console.error(`\nWrote ${jsonPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
