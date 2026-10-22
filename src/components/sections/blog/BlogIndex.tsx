"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronRight, CookingPot, ListChecks, Milk, Package, SearchCheck, Snowflake } from "lucide-react";
import {
  BLOG_PAGE,
  BLOG_POSTS,
  SHOW_PENDING,
  type BlogCategory,
  type BlogPost,
} from "@/lib/constants";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { KeepBrand } from "@/components/ui/Brand";
import { Pending, PendingBadge } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Per-category cover tint, drawn in CSS until real photos exist. */
const COVER: Record<BlogCategory, string> = {
  "Buying milk": "color-mix(in srgb, var(--amber) 28%, var(--cream))",
  "Milk types": "color-mix(in srgb, var(--sage) 45%, var(--cream))",
  "At home": "color-mix(in srgb, var(--amber) 12%, var(--milk))",
  Quality: "color-mix(in srgb, var(--sage) 30%, #d6ebf2)",
};

/** Icon per post, falling back to the category's book. */
const ICONS: Record<string, typeof Milk> = {
  "how-to-spot-adulterated-milk": SearchCheck,
  "cow-milk-vs-buffalo-milk": Milk,
  "how-to-boil-and-store-fresh-milk": CookingPot,
  "why-chilling-matters-for-fresh-milk": Snowflake,
  "fresh-milk-vs-packaged-milk": Package,
  "how-to-choose-milk-delivery-service-lahore": ListChecks,
};

function Cover({ post, index, large = false }: { post: BlogPost; index: number; large?: boolean }) {
  const Icon = ICONS[post.slug] ?? BookOpen;
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${large ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px]" : "aspect-[16/10]"}`}
      style={{ background: COVER[post.category] }}
      aria-hidden
    >
      {/* Watermark numeral as SVG text: decorative, so it stays out of text contrast checks. */}
      <svg
        viewBox="0 0 200 120"
        className={`absolute -right-3 -bottom-5 ${large ? "w-[22rem]" : "w-[13rem]"}`}
      >
        <text
          x="200"
          y="118"
          textAnchor="end"
          className="font-display"
          fontSize="150"
          fontWeight="600"
          fill="var(--soil)"
          fillOpacity="0.07"
        >
          {String(index + 1).padStart(2, "0")}
        </text>
      </svg>
      <span
        className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-milk/80 text-pasture shadow-[0_12px_30px_rgba(43,33,24,0.1)] ${
          large ? "h-28 w-28" : "h-20 w-20"
        }`}
      >
        <Icon size={large ? 48 : 34} strokeWidth={1.5} />
      </span>
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-6 w-full">
        <path d="M0,20 C70,4 130,36 200,20 C270,4 330,36 400,20 L400,40 L0,40 Z" fill="var(--milk)" fillOpacity="0.55" />
      </svg>
    </div>
  );
}

function PostCard({ post, index, large = false }: { post: BlogPost; index: number; large?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const draft = post.status === "draft";

  const body = (
    <>
      <Cover post={post} index={index} large={large} />
      <div className={large ? "flex flex-col justify-center lg:py-4" : "mt-5"}>
        <p className="flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
          {post.category}
          {draft && <PendingBadge />}
        </p>
        <h2
          className={`mt-2 font-display leading-snug font-semibold text-soil ${
            large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {post.title}
        </h2>
        <p className={`mt-3 text-soil-muted ${large ? "md:text-lg" : "line-clamp-3 text-sm"}`}>{post.answer}</p>
        {draft ? (
          <Pending className="mt-4">{post.pendingNote}</Pending>
        ) : (
          <p className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="text-soil-muted">
              {BLOG_PAGE.author}
              {post.reviewedOn && ` · Reviewed ${post.reviewedOn}`}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-pasture">
              {BLOG_PAGE.readLabel}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </p>
        )}
      </div>
    </>
  );

  const layout = `group block h-full rounded-3xl border bg-milk p-4 md:p-5 ${
    large ? "grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10" : ""
  }`;

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {draft ? (
        <div className={`${layout} border-dashed border-amber-deep/40`}>{body}</div>
      ) : (
        <Link
          href={`/blog/${post.slug}`}
          className={`${layout} focus-ring border-pasture/10 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-pasture/25 hover:shadow-[0_24px_50px_rgba(43,33,24,0.08)]`}
        >
          {body}
        </Link>
      )}
    </motion.article>
  );
}

export function BlogIndex() {
  const posts = BLOG_POSTS.filter((p) => p.status === "published" || SHOW_PENDING);
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const [active, setActive] = useState<BlogCategory | "All">("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.category === active);
  const [featured, ...rest] = shown;

  return (
    <section className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-16 -right-28 h-80 w-80 opacity-25"
        color="#F2A93B"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 text-sm text-soil-muted">
            <li>
              <Link href="/" className="focus-ring rounded hover:text-pasture">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="font-medium text-soil">
              Blog
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,6.5vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance text-soil">
          <KeepBrand text={BLOG_PAGE.heading} />
        </h1>
        <p className="mt-4 max-w-2xl text-soil-muted md:text-lg">{BLOG_PAGE.intro}</p>

        {categories.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter guides by topic">
            {(["All", ...categories] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-pasture text-milk"
                    : "bg-pasture/10 text-pasture hover:bg-pasture/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {featured ? (
          <div className="mt-12 space-y-6">
            <PostCard post={featured} index={BLOG_POSTS.indexOf(featured)} large />
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} index={BLOG_POSTS.indexOf(post)} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12 grid items-center gap-8 rounded-3xl border border-pasture/10 bg-milk p-6 md:grid-cols-[auto_1fr] md:p-10">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-pasture/10 text-pasture" aria-hidden>
              <BookOpen size={36} strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-soil md:text-3xl">{BLOG_PAGE.empty.title}</h2>
              <p className="mt-3 max-w-2xl text-soil-muted">{BLOG_PAGE.empty.body}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/faq"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-pasture px-5 py-2.5 text-sm font-medium text-milk hover:bg-pasture-deep"
                >
                  Read our FAQ
                  <ArrowRight size={15} aria-hidden />
                </Link>
                <Link
                  href="/quality"
                  className="focus-ring inline-flex items-center rounded-full border border-pasture/25 px-5 py-2.5 text-sm font-medium text-pasture hover:bg-pasture/5"
                >
                  How we keep milk pure
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
