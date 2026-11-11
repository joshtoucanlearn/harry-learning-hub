"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Galaxy } from "./galaxy";

// One fixed background: Harry's dark pixel sky, with no controls.
// Motion stops when the visitor prefers reduced motion.
export function SiteSky({ assetPrefix = "" }: { assetPrefix?: string }) {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const follow = () => setCalm(media.matches);
    follow();
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const fallbackStyle = {
    "--sky-fallback-image": `url("${assetPrefix}/loading-pixel-sky.png")`,
  } as CSSProperties;

  return (
    <div className="sky-experience site-sky" style={fallbackStyle}>
      <Galaxy calm={calm} colour={0} burst={0} preset="pixel" assetPrefix={assetPrefix} />
    </div>
  );
}
