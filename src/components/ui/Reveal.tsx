"use client";
// Section/card entrance: rotateX + translateZ settle to 0. Staggered with `delay`.
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useEnv } from "../EnvProvider";

export default function Reveal({ children, delay = 0, className = "", as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const { reduced } = useEnv();
  const M = as === "li" ? motion.li : motion.div;
  if (reduced) return as === "li" ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  return (
    <M
      className={className}
      style={{ transformPerspective: 1000 }}
      initial={{ opacity: 0, rotateX: 18, y: 40, z: -80 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
