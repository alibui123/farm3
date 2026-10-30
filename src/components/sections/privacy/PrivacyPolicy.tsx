import Link from "next/link";
import { ChevronRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { CONTACT, PRIVACY, WHATSAPP } from "@/lib/constants";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { Pending } from "@/components/ui/Pending";

/** Static policy page: hero, "in short" summary, then numbered sections beside a sticky contents list. */
export function PrivacyPolicy() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-20 -right-28 h-80 w-80 opacity-25"
        color="#A9C4A0"
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
              {PRIVACY.heading}
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance text-soil">
          {PRIVACY.heading}
        </h1>
        <p className="mt-3 text-sm text-soil-muted">Last updated: {PRIVACY.updated}</p>
        <p className="mt-4 max-w-2xl text-soil-muted md:text-lg">{PRIVACY.intro}</p>
        <Pending className="mt-6 max-w-2xl">{PRIVACY.pendingNote}</Pending>

        <div className="mt-10 max-w-3xl rounded-3xl border border-pasture/10 bg-milk p-6 shadow-[0_20px_50px_rgba(43,33,24,0.06)] md:p-8">
          <p className="inline-flex items-center gap-2 font-display text-xl text-soil">
            <ShieldCheck size={22} className="text-pasture" aria-hidden />
            In short
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {PRIVACY.summary.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-soil">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-14">
          <nav aria-label="Policy sections" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 border-l border-pasture/15">
              {PRIVACY.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="focus-ring -ml-px flex gap-2 border-l-2 border-transparent py-1.5 pr-2 pl-4 text-sm text-soil-muted transition-colors hover:border-pasture hover:text-pasture"
                  >
                    <span className="w-5 shrink-0 text-soil-muted/70">{i + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-12">
            {PRIVACY.sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2
                  id={`${section.id}-title`}
                  className="flex items-baseline gap-3 font-display text-2xl font-semibold text-soil md:text-3xl"
                >
                  <span className="text-lg text-pasture md:text-xl">{i + 1}.</span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-soil-muted">
                  {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
                  {section.list && (
                    <ul className="space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pasture" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.after?.map((text) => <p key={text}>{text}</p>)}
                </div>
              </section>
            ))}

            <div className="rounded-3xl bg-pasture p-6 text-milk md:p-8">
              <h2 className="font-display text-2xl font-semibold">{PRIVACY.contactHeading}</h2>
              <p className="mt-2 text-milk/85">{PRIVACY.contactText}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-soil"
                >
                  <MessageCircle size={17} aria-hidden />
                  Message us on WhatsApp
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-milk/10 px-6 py-3 text-sm font-medium text-milk hover:bg-milk/20"
                >
                  <Phone size={16} aria-hidden />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
