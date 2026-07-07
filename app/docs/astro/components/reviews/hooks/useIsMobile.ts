"use client";

import { useState, useEffect } from "react";

/**
 * Tracks window width and returns true when it falls below `breakpoint`.
 * Used by CodePreview to swap tab buttons for a <select> on mobile.
 */
export function useIsMobile(breakpoint = 600): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
