"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Smooths mouse-wheel and anchor-link scrolling site-wide.
 * Touch stays native (syncTouch off): phones keep their own momentum
 * scrolling, which is smoother and lag-free compared with JS-driven touch.
 * Lenis turns itself off for prefers-reduced-motion users.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        // In-page links glide to their section and respect each section's scroll-margin.
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <RouteReset />
      {children}
    </ReactLenis>
  );
}

/** Drops any leftover glide when the route changes, so a new page never keeps scrolling. */
function RouteReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    lenis.start();
  }, [lenis, pathname]);

  return null;
}
