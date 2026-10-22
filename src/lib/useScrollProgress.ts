import { RefObject, useEffect, useState } from "react";

/**
 * Progress (0–1) of a tall scroll track through the viewport: 0 when its top
 * reaches the top of the screen, 1 when its bottom reaches the bottom.
 * rAF-throttled and rounded to 1/1000, so tiny scroll changes skip a re-render.
 * Pass enabled=false to stop listening (e.g. reduced motion).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      // Same value → React bails out of the render.
      setProgress(Math.round(p * 1000) / 1000);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, enabled]);

  return progress;
}
