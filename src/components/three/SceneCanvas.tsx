"use client";
// Fixed full-screen 3D background. Home: scroll drives an ambulance along a route to a fire site.
// Other pages: a lighter floating scene that reacts to scroll.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { useEnv } from "../EnvProvider";
import { live } from "@/lib/scroll";
import SceneBoundary from "./SceneBoundary";
import { Ambulance, City, FireMarker, Ground, Lights, PulseRings, rng, useRoute } from "./parts";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => v * v * (3 - 2 * v);

function HomeScene({ small, touch }: { small: boolean; touch: boolean }) {
  const route = useRoute();
  const amb = useRef<THREE.Group>(null);
  const t = useRef(0);
  const cam = useRef(new THREE.Vector3(5, 2.4, 6.5));
  const tube = useMemo(() => new THREE.TubeGeometry(route, 240, 0.14, 6, false), [route]);
  const glow = useMemo(() => new THREE.TubeGeometry(route, 240, 0.55, 6, false), [route]);
  const fire = useMemo(() => route.getPointAt(1), [route]);
  const size = useThree((s) => s.size);

  useFrame(({ camera, clock }) => {
    const c = camera as THREE.PerspectiveCamera;
    const p = live.p;
    const hero = 1 - ease(clamp01(p / 0.1)); // 1 at the top of the page, 0 after the hero
    const target = clamp01((p - 0.04) / 0.9);
    t.current += (target - t.current) * 0.07; // smooth follow
    const u = Math.min(t.current, 0.999);
    const pos = route.getPointAt(u);
    const tan = route.getTangentAt(u);
    const g = amb.current;
    if (g) {
      g.position.set(pos.x, Math.sin(clock.elapsedTime * 1.6) * 0.07 * hero, pos.z);
      g.rotation.y = Math.atan2(-tan.z, tan.x) + Math.sin(clock.elapsedTime * 0.5) * 0.55 * hero;
    }
    // camera: 3/4 hero view  ->  chase view behind the ambulance
    const chase = new THREE.Vector3(pos.x - tan.x * 9, 4.6, pos.z - tan.z * 9);
    const heroPos = new THREE.Vector3(pos.x + 5.5 + (touch ? 0 : live.mx * 0.9), 2.5 + (touch ? 0 : live.my * 0.4), pos.z + 7);
    cam.current.lerp(chase.lerp(heroPos, hero), 0.1);
    c.position.copy(cam.current);
    c.lookAt(pos.x, 0.9, pos.z);
    // push the ambulance to the right (desktop) or lower (mobile) so hero text stays readable
    if (hero > 0.002) {
      const w = size.width, h = size.height;
      if (small) c.setViewOffset(w, h, 0, -h * 0.2 * hero, w, h);
      else c.setViewOffset(w, h, -w * 0.2 * hero, 0, w, h);
    } else if (c.view) c.clearViewOffset();
    c.updateProjectionMatrix();
  });

  return (
    <>
      <fog attach="fog" args={["#F5F9FF", 35, 140]} />
      <Lights />
      <Ground />
      <City route={route} count={small ? 32 : 60} />
      <mesh geometry={glow} position-y={0.1}><meshBasicMaterial color="#E5484D" transparent opacity={0.16} depthWrite={false} /></mesh>
      <mesh geometry={tube} position-y={0.12}><meshBasicMaterial color="#E5484D" /></mesh>
      <PulseRings maxR={5} />
      <FireMarker position={fire} />
      <Ambulance ref={amb} />
    </>
  );
}

function LightScene({ small }: { small: boolean }) {
  const group = useRef<THREE.Group>(null);
  const city = useRef<THREE.InstancedMesh>(null);
  const pts = useMemo(() => {
    const r = rng(3);
    const a = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) { a[i * 3] = (r() - 0.5) * 50; a[i * 3 + 1] = r() * 20; a[i * 3 + 2] = (r() - 0.5) * 30 - 5; }
    return a;
  }, []);
  const n = small ? 8 : 14;
  useLayoutEffect(() => {
    const m = city.current; if (!m) return;
    const r = rng(11), d = new THREE.Object3D(), col = new THREE.Color();
    const cols = ["#BFD7FF", "#E8F0FE", "#FFE1E2", "#CFEBDD", "#FFF0D2"];
    for (let i = 0; i < n; i++) {
      const side = i % 2 ? 1 : -1, h = 3 + r() * 9;
      d.position.set(side * (9 + r() * 14), h / 2, -r() * 24); d.scale.set(2 + r() * 3, h, 2 + r() * 3);
      d.updateMatrix(); m.setMatrixAt(i, d.matrix); m.setColorAt(i, col.set(cols[i % cols.length]));
    }
    m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [n]);

  useFrame(({ camera, clock }) => {
    const p = live.p, t = clock.elapsedTime;
    if (group.current) { group.current.rotation.y = p * 1.4 + t * 0.03; group.current.position.y = p * 7; }
    camera.position.x += (live.mx * 1.2 - camera.position.x) * 0.05;
    camera.position.y = 4 + p * 3; camera.position.z = 15;
    camera.lookAt(0, 4 + p * 2, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#F5F9FF", 20, 70]} />
      <Lights />
      <Ground z={-20} />
      <instancedMesh ref={city} args={[undefined, undefined, n]} frustumCulled={false}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial /></instancedMesh>
      <group ref={group}>
        {([[-8, 5, -4, "#2F6FEB", 3.2], [9, 8, -8, "#E5484D", 2.4], [0, 12, -12, "#1E9E5A", 4]] as const).map(([x, y, z, c, r], i) => (
          <mesh key={i} position={[x, y, z]} rotation={[1 + i * 0.4, 0.3 * i, 0]}><torusGeometry args={[r, 0.12, 12, 48]} /><meshStandardMaterial color={c} transparent opacity={0.35} /></mesh>
        ))}
        <mesh position={[6, 3, -2]}><sphereGeometry args={[1, 24, 24]} /><meshStandardMaterial color="#F2B04A" transparent opacity={0.35} /></mesh>
        <mesh position={[-10, 9, -9]}><sphereGeometry args={[1.5, 24, 24]} /><meshStandardMaterial color="#2F6FEB" transparent opacity={0.25} /></mesh>
        <points>
          <bufferGeometry><bufferAttribute attach="attributes-position" args={[pts, 3]} /></bufferGeometry>
          <pointsMaterial size={0.18} color="#2F6FEB" transparent opacity={0.5} sizeAttenuation />
        </points>
      </group>
    </>
  );
}

export default function SceneCanvas() {
  const { mode, small, touch, failScene } = useEnv();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      live.p = max > 0 ? clamp01(window.scrollY / max) : 0;
    };
    const onMouse = (e: MouseEvent) => { live.mx = (e.clientX / window.innerWidth - 0.5) * 2; live.my = -(e.clientY / window.innerHeight - 0.5) * 2; };
    const onVis = () => setVisible(!document.hidden); // pause drawing when the tab is hidden
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMouse); document.removeEventListener("visibilitychange", onVis);
    };
  }, [pathname]);

  if (mode !== "3d") return null;
  const isHome = pathname === "/";
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-95">
      <SceneBoundary onError={failScene}>
        <Canvas
          key={isHome ? "home" : "light"}
          dpr={[1, small ? 1.25 : 1.5]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ fov: 42, position: isHome ? [5.5, 2.5, 7] : [0, 4, 15], near: 0.1, far: 220 }}
          onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); failScene(); })}
        >
          {isHome ? <HomeScene small={small} touch={touch} /> : <LightScene small={small} />}
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
