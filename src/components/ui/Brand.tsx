import { Fragment } from "react";
import { SITE } from "@/lib/constants";

/** Renders text with every "Al Shukr" kept on one line, so headings never break at the hyphen. */
export function KeepBrand({ text }: { text: string }) {
  const parts = text.split(SITE.shortName);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="whitespace-nowrap">{SITE.shortName}</span>}
    </Fragment>
  ));
}
