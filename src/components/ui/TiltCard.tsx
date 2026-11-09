"use client";
// Card that tilts toward the mouse with a soft glare. Off on touch / reduced motion.
import { ReactNode, useRef } from "react";
import { useEnv } from "../EnvProvider";

export default function TiltCard({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { touch, reduced } = useEnv();
  const off = touch || reduced;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (off || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`${off ? "" : "tilt"} relative ${className}`}>
      {children}
      {!off && <span className="glare" aria-hidden="true" />}
    </div>
  );
}
