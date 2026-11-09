"use client";
// Plain <img> that shows a pretty gradient block if the file is missing.
import { ReactNode, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function SafeImage({
  src, alt, className = "", fallback, eager = false,
}: { src: string; alt: string; className?: string; fallback?: ReactNode; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The image may fail before React attaches onError, so check once after mount.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !src) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-tint via-white to-[#FFE3E4] text-blue/60 ${className}`}>
        {fallback ?? <Icon name="image" className="h-10 w-10" />}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
