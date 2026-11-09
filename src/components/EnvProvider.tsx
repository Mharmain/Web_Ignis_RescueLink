"use client";
// Decides once, in the browser, whether we can show the 3D scene.
// "static" = show simple SVG illustration and no scroll animation.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Env = { mode: "pending" | "3d" | "static"; reduced: boolean; touch: boolean; small: boolean; failScene: () => void };
const Ctx = createContext<Env>({ mode: "pending", reduced: false, touch: false, small: false, failScene: () => {} });
export const useEnv = () => useContext(Ctx);

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function EnvProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ mode: "pending" as Env["mode"], reduced: false, touch: false, small: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const weak = (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || (navigator.hardwareConcurrency || 4) <= 2;
    const small = window.innerWidth < 768;
    const ok = !reduced && !weak && hasWebGL();
    setState({ mode: ok ? "3d" : "static", reduced, touch, small });
  }, []);

  const failScene = useCallback(() => setState((s) => ({ ...s, mode: "static" })), []);
  const value = useMemo(() => ({ ...state, failScene }), [state, failScene]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
