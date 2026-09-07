import { IMAGE_W, IMAGE_H, PLANE_W, PLANE_H, PROJECT } from "./projectData";

// ---- pixel-space <-> world-space (three.js) conversion --------------------
// Plane & plot meshes are both rotated -90deg about X to lie flat, so a 2D
// shape point (sx, sy) and a plane vertex use the SAME mapping below and
// land in exactly the same place in the scene.
export function imageToShapeXY([x, y]) {
  const sx = PLANE_W * (x / IMAGE_W - 0.5);
  const sy = PLANE_H * (0.5 - y / IMAGE_H);
  return [sx, sy];
}

// World X/Z of a pixel point (useful for camera targeting / labels).
export function imageToWorldXZ([x, y]) {
  const worldX = PLANE_W * (x / IMAGE_W - 0.5);
  const worldZ = PLANE_H * (y / IMAGE_H - 0.5);
  return [worldX, worldZ];
}

export function plotCentroidPx(points) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  return [
    xs.reduce((a, b) => a + b, 0) / xs.length,
    ys.reduce((a, b) => a + b, 0) / ys.length,
  ];
}

// ---- pricing / unit helpers -------------------------------------------
export function sqmToSqyd(sqm) {
  return Math.round(sqm * 1.19599);
}
export function sqmToSqft(sqm) {
  return Math.round(sqm * 10.7639 * 10) / 10;
}
export function estimatePrice(areaSqm) {
  const sqyd = areaSqm * 1.19599;
  return sqyd * PROJECT.ratePerSqYd;
}
export function formatPrice(v) {
  if (v >= 1e7) return (v / 1e7).toFixed(2) + " Cr";
  return (v / 1e5).toFixed(2) + " L";
}

// ---- approximate real-world width x depth (ft) for a plot ----------------
// The masterplan is a slightly-angled aerial render, not a surveyed flat
// plan, so there's no exact pixel->feet scale given anywhere. We derive one
// PER PLOT from its own known area (areaSqm) vs its pixel-area (shoelace),
// then apply that local scale to its first two edges (or bounding box for
// irregular corner plots). Good enough for a to-scale dimension diagram.
function polygonAreaPx(points) {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a) / 2;
}
function distPx(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}
export function plotDimensionsFt(p) {
  const areaPx = polygonAreaPx(p.points);
  const areaSqFt = p.areaSqm * 10.7639;
  const scale = Math.sqrt(areaSqFt / areaPx); // feet per pixel, local to this plot
  let frontPx, depthPx;
  if (p.points.length <= 4) {
    frontPx = distPx(p.points[0], p.points[1]);
    depthPx = distPx(p.points[1], p.points[2]);
  } else {
    const xs = p.points.map((pt) => pt[0]);
    const ys = p.points.map((pt) => pt[1]);
    frontPx = Math.max(...xs) - Math.min(...xs);
    depthPx = Math.max(...ys) - Math.min(...ys);
  }
  const r1 = (n) => Math.round(n * 10) / 10;
  return { front: r1(frontPx * scale), depth: r1(depthPx * scale) };
}
