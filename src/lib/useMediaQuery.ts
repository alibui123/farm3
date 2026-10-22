import { useSyncExternalStore } from "react";

/**
 * Hydration-safe media query. The server snapshot is false, so the first
 * client render matches the server, then React re-renders with the real value.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Tailwind's lg breakpoint. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
