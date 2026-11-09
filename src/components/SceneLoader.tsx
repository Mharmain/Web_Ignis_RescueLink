"use client";
// Loads the 3D scene only in the browser (never on the server).
import dynamic from "next/dynamic";
const SceneCanvas = dynamic(() => import("./three/SceneCanvas"), { ssr: false });
export default function SceneLoader() { return <SceneCanvas />; }
