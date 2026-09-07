import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import PlotMesh from "./PlotMesh";
import PlotBadge from "./PlotBadge";
import { PLANE_W, PLANE_H, PLOTS } from "../data/projectData";

// 2D = the reference "flattened aerial" look: a fixed, moderately tilted
// bird's-eye angle (matches how the underlying masterplan photo itself
// looks), locked so the user can't rotate it — only pan/zoom.
// 3D = a lower, closer, fully free-orbit perspective for exploring.
const VIEW_PRESETS = {
  "2d": { pos: [0, 48, 30], target: [0, 0, 0], minPolar: 0.558, maxPolar: 0.558, rotate: false, dist: 56.6 },
  "3d": { pos: [0, 26, 46], target: [0, 0, 0], minPolar: 0.3, maxPolar: 1.3, rotate: true, dist: 52.8 },
};

function MasterplanPlane() {
  const texture = useTexture("/masterplan.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[PLANE_W, PLANE_H]} />
      <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
    </mesh>
  );
}

// Only actively drives the camera for ~0.8s right after the view mode
// changes or a search/focus request comes in — otherwise OrbitControls
// owns the camera fully, so user drag/zoom/pan is never fought.
function CameraRig({ view, controlsRef, focusTarget }) {
  const { camera } = useThree();
  const desired = useRef(new THREE.Vector3(...VIEW_PRESETS[view].pos));
  const desiredTarget = useRef(new THREE.Vector3(...VIEW_PRESETS[view].target));
  const animatingUntil = useRef(0);

  useEffect(() => {
    const preset = VIEW_PRESETS[view];
    desired.current.set(...preset.pos);
    desiredTarget.current.set(...(focusTarget || preset.target));
    animatingUntil.current = performance.now() + 800;
  }, [view, focusTarget]);

  useFrame(() => {
    if (performance.now() > animatingUntil.current) return;
    camera.position.lerp(desired.current, 0.12);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTarget.current, 0.12);
      controlsRef.current.update();
    }
  });

  return null;
}

// Reports an approximate "zoom %" (100% = default distance for the
// current view) up to the parent for the RST/% readout, without forcing
// a re-render every frame — only when it changes meaningfully.
function ZoomReporter({ view, controlsRef, onZoomPctChange }) {
  const last = useRef(100);
  useFrame(() => {
    if (!controlsRef.current) return;
    const cam = controlsRef.current.object;
    const target = controlsRef.current.target;
    const dist = cam.position.distanceTo(target);
    const pct = Math.round((VIEW_PRESETS[view].dist / dist) * 100);
    const clamped = Math.min(400, Math.max(20, pct));
    if (Math.abs(clamped - last.current) >= 1) {
      last.current = clamped;
      onZoomPctChange(clamped);
    }
  });
  return null;
}

export default function Scene({
  view,
  showStatus,
  statusFilter,
  facingFilter,
  selectedPlotId,
  hoveredPlotId,
  focusTarget,
  zoomTick,
  onHoverPlot,
  onUnhoverPlot,
  onSelectPlot,
  onZoomPctChange,
}) {
  const controlsRef = useRef();
  const preset = VIEW_PRESETS[view];

  // imperative zoom in/out/reset triggered from parent via zoomTick
  useEffect(() => {
    if (!zoomTick || !controlsRef.current) return;
    const controls = controlsRef.current;
    const cam = controls.object;
    if (zoomTick.type === "reset") {
      cam.position.set(...preset.pos);
      controls.target.set(0, 0, 0);
      controls.update();
      return;
    }
    const dir = new THREE.Vector3().subVectors(cam.position, controls.target);
    const factor = zoomTick.type === "in" ? 0.8 : 1.25;
    dir.multiplyScalar(factor);
    const dist = dir.length();
    const clamped = Math.min(90, Math.max(6, dist));
    dir.setLength(clamped);
    cam.position.copy(controls.target).add(dir);
    controls.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomTick]);

  return (
    <Canvas
      shadows
      camera={{ fov: 42, near: 0.1, far: 300, position: preset.pos }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0a0e17"]} />
      <fog attach="fog" args={["#0a0e17", 60, 140]} />
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[20, 40, 10]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Suspense fallback={null}>
        <MasterplanPlane />
        {PLOTS.map((plot) => (
          <PlotMesh
            key={plot.id}
            plot={plot}
            view={view}
            showStatus={showStatus}
            statusFilter={statusFilter}
            facingFilter={facingFilter}
            selected={selectedPlotId === plot.id}
            onHover={onHoverPlot}
            onUnhover={onUnhoverPlot}
            onSelect={onSelectPlot}
          />
        ))}
        {PLOTS.map((plot) => (
          <PlotBadge
            key={"badge-" + plot.id}
            plot={plot}
            selected={selectedPlotId === plot.id}
            hovered={hoveredPlotId === plot.id}
          />
        ))}
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enableRotate={preset.rotate}
        enablePan={true}
        enableZoom={true}
        minDistance={6}
        maxDistance={90}
        minPolarAngle={preset.minPolar}
        maxPolarAngle={preset.maxPolar}
        target={preset.target}
        makeDefault
      />
      <CameraRig view={view} controlsRef={controlsRef} focusTarget={focusTarget} />
      <ZoomReporter view={view} controlsRef={controlsRef} onZoomPctChange={onZoomPctChange} />
    </Canvas>
  );
}
