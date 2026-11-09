"use client";
// Building blocks of the 3D scenes. Everything is made from simple shapes (no model files).
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, forwardRef } from "react";
import * as THREE from "three";

/** Small deterministic random generator so the city looks the same every time. */
export function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The glowing route the ambulance follows (x/z positions on the ground). */
export function makeRoute() {
  return new THREE.CatmullRomCurve3(
    [[0, 0, 0], [0, 0, -22], [9, 0, -44], [-7, 0, -68], [3, 0, -92], [16, 0, -116], [16, 0, -142]].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false, "catmullrom", 0.4
  );
}

const PASTELS = ["#BFD7FF", "#D6E6FF", "#FFE1E2", "#E8F0FE", "#CFEBDD", "#FFF0D2", "#C9DAF8"];

/** About 60 buildings drawn with ONE instanced mesh (fast). */
export function City({ route, count }: { route: THREE.CatmullRomCurve3; count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const r = rng(7);
    const d = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const u = r();
      const base = route.getPointAt(u);
      const tan = route.getTangentAt(u);
      const side = r() < 0.5 ? -1 : 1;
      const off = 6 + r() * 16;
      const w = 2 + r() * 3.5, dep = 2 + r() * 3.5, h = 2.5 + r() * 10;
      d.position.set(base.x - tan.z * side * off + tan.x * (r() - 0.5) * 4, h / 2, base.z + tan.x * side * off + tan.z * (r() - 0.5) * 4);
      d.scale.set(w, h, dep);
      d.updateMatrix();
      m.setMatrixAt(i, d.matrix);
      m.setColorAt(i, col.set(PASTELS[Math.floor(r() * PASTELS.length)]));
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [route, count]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.8} />
    </instancedMesh>
  );
}

export function PulseRings({ color = "#E5484D", maxR = 6, count = 3 }: { color?: string; maxR?: number; count?: number }) {
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const ph = (clock.elapsedTime * 0.45 + i / count) % 1;
      m.scale.setScalar(0.3 + ph * maxR);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - ph) * 0.5;
    });
  });
  return (
    <group rotation-x={-Math.PI / 2} position={[0, 0.08, 0]}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/** Fire-site marker: a flame shape with pulse rings. */
export function FireMarker({ position }: { position: THREE.Vector3 }) {
  const flame = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!flame.current) return;
    const t = clock.elapsedTime;
    flame.current.scale.set(1 + Math.sin(t * 7) * 0.06, 1 + Math.sin(t * 5 + 1) * 0.12, 1 + Math.sin(t * 7) * 0.06);
  });
  return (
    <group position={position}>
      <PulseRings maxR={9} />
      <mesh position={[0, 4, -2.5]}><boxGeometry args={[7, 8, 5]} /><meshStandardMaterial color="#D6E6FF" /></mesh>
      <group ref={flame} position={[0, 0, 2]}>
        <mesh position={[0, 1.5, 0]}><coneGeometry args={[1.2, 3, 10]} /><meshStandardMaterial color="#F2704A" emissive="#E5484D" emissiveIntensity={1.2} /></mesh>
        <mesh position={[0, 1.1, 0.2]}><coneGeometry args={[0.7, 2, 10]} /><meshStandardMaterial color="#F2B04A" emissive="#F2B04A" emissiveIntensity={1.4} /></mesh>
      </group>
    </group>
  );
}

/** Low-poly ambulance. Forward direction = +X. */
export const Ambulance = forwardRef<THREE.Group>(function Ambulance(_, ref) {
  const red = useRef<THREE.MeshStandardMaterial>(null);
  const blue = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    const on = Math.sin(clock.elapsedTime * 9) > 0;
    if (red.current) red.current.emissiveIntensity = on ? 2.4 : 0.1;
    if (blue.current) blue.current.emissiveIntensity = on ? 0.1 : 2.4;
  });
  const white = <meshStandardMaterial color="#FFFFFF" roughness={0.5} />;
  const wheel = (x: number, z: number) => (
    <group position={[x, 0.5, z]} rotation-x={Math.PI / 2}>
      <mesh><cylinderGeometry args={[0.5, 0.5, 0.38, 20]} /><meshStandardMaterial color="#1B2B44" /></mesh>
      <mesh position={[0, z > 0 ? 0.2 : -0.2, 0]}><cylinderGeometry args={[0.25, 0.25, 0.04, 14]} /><meshStandardMaterial color="#DCE7F5" /></mesh>
    </group>
  );
  return (
    <group ref={ref}>
      <mesh position={[0, 0.62, 0]}><boxGeometry args={[4.6, 0.36, 1.9]} /><meshStandardMaterial color="#2B3A55" /></mesh>
      <mesh position={[-0.7, 1.7, 0]}><boxGeometry args={[2.9, 1.9, 2]} />{white}</mesh>
      <mesh position={[1.4, 1.3, 0]}><boxGeometry args={[1.3, 1.3, 2]} />{white}</mesh>
      <mesh position={[2.3, 0.95, 0]}><boxGeometry args={[0.8, 0.7, 1.95]} />{white}</mesh>
      <mesh position={[2.07, 1.55, 0]}><boxGeometry args={[0.1, 0.75, 1.7]} /><meshStandardMaterial color="#9CC8FF" /></mesh>
      {/* red stripe */}
      <mesh position={[-0.7, 1.25, 0]}><boxGeometry args={[2.94, 0.3, 2.04]} /><meshStandardMaterial color="#E5484D" /></mesh>
      {/* crosses on both sides */}
      {[-1.02, 1.02].map((z) => (
        <group key={z} position={[-0.7, 1.95, z]}>
          <mesh><boxGeometry args={[0.95, 0.27, 0.03]} /><meshStandardMaterial color="#E5484D" /></mesh>
          <mesh><boxGeometry args={[0.27, 0.95, 0.03]} /><meshStandardMaterial color="#E5484D" /></mesh>
        </group>
      ))}
      {/* roof light bar */}
      <mesh position={[1.4, 2.0, 0]}><boxGeometry args={[0.45, 0.14, 1.5]} /><meshStandardMaterial color="#2B3A55" /></mesh>
      <mesh position={[1.4, 2.18, -0.42]}><boxGeometry args={[0.38, 0.22, 0.6]} /><meshStandardMaterial ref={red} color="#E5484D" emissive="#E5484D" emissiveIntensity={1} /></mesh>
      <mesh position={[1.4, 2.18, 0.42]}><boxGeometry args={[0.38, 0.22, 0.6]} /><meshStandardMaterial ref={blue} color="#2F6FEB" emissive="#2F6FEB" emissiveIntensity={1} /></mesh>
      {wheel(-1.5, 1.0)}{wheel(-1.5, -1.0)}{wheel(1.7, 1.0)}{wheel(1.7, -1.0)}
    </group>
  );
});

export function Ground({ z = -70 }: { z?: number }) {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, z]}><planeGeometry args={[600, 600]} /><meshStandardMaterial color="#EAF1FF" /></mesh>
      <gridHelper args={[600, 150, "#C9D9EF", "#DCE7F5"]} position={[0, 0.02, z]} />
    </group>
  );
}

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#DCE9FF", "#FFE7E8", 0.7]} />
      <directionalLight position={[12, 22, 10]} intensity={1.15} />
    </>
  );
}

export function useRoute() { return useMemo(makeRoute, []); }
