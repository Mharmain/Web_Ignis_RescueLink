"use client";
// Translucent rings/spheres that drift at different speeds while scrolling.
import { motion, useScroll, useTransform } from "framer-motion";
import { useEnv } from "../EnvProvider";

function Shape({ className, speed, kind }: { className: string; speed: number; kind: "ring" | "sphere" }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -3000 * speed]);
  return (
    <motion.span
      style={{ y }}
      className={`${className} absolute ${kind === "ring" ? "rounded-full border-[14px] border-blue/10" : "rounded-full bg-gradient-to-br from-brand/15 to-blue/10"}`}
    />
  );
}

export default function ParallaxShapes() {
  const { reduced, mode } = useEnv();
  if (reduced || mode === "pending") return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      <Shape kind="ring" speed={0.12} className="left-[4%] top-[60%] h-40 w-40" />
      <Shape kind="sphere" speed={0.25} className="right-[6%] top-[90%] h-24 w-24" />
      <Shape kind="ring" speed={0.35} className="right-[12%] top-[130%] h-56 w-56" />
      <Shape kind="sphere" speed={0.18} className="left-[10%] top-[170%] h-32 w-32" />
    </div>
  );
}
