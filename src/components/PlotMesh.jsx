import { useMemo, useState } from "react";
import * as THREE from "three";
import { imageToShapeXY } from "../data/helpers";
import { STATUS_COLOR } from "../data/projectData";

const GOLD = "#cba135";

export default function PlotMesh({ plot, view, showStatus, statusFilter, facingFilter, selected, onHover, onUnhover, onSelect }) {
  const [hovered, setHovered] = useState(false);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    plot.points.forEach(([x, y], i) => {
      const [sx, sy] = imageToShapeXY([x, y]);
      if (i === 0) s.moveTo(sx, sy);
      else s.lineTo(sx, sy);
    });
    s.closePath();
    return s;
  }, [plot]);

  const edgeGeometry = useMemo(() => {
    const pts = plot.points.map(([x, y]) => {
      const [sx, sy] = imageToShapeXY([x, y]);
      return new THREE.Vector3(sx, sy, 0);
    });
    pts.push(pts[0]);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [plot]);

  const facingMatches = facingFilter && plot.facing.includes(facingFilter);
  const statusMatches = statusFilter && plot.status === statusFilter;
  const dimmed = (statusFilter && !statusMatches) || (facingFilter && !facingMatches);

  let fillColor = STATUS_COLOR[plot.status];
  let fillOpacity = 0.0;
  let edgeColor = "#8b93a7";
  let edgeOpacity = 0.35;

  if (showStatus) {
    fillOpacity = dimmed ? 0.06 : 0.42;
    edgeColor = fillColor;
    edgeOpacity = dimmed ? 0.25 : 0.95;
  }
  if (facingFilter) {
    if (facingMatches) {
      edgeColor = GOLD;
      edgeOpacity = 0.95;
      fillOpacity = Math.max(fillOpacity, 0.3);
    } else {
      fillOpacity = Math.min(fillOpacity, 0.04);
      edgeOpacity = 0.15;
    }
  }
  if (hovered) {
    fillOpacity = Math.max(fillOpacity, 0.35);
    edgeColor = GOLD;
    edgeOpacity = 1;
  }
  if (selected) {
    fillOpacity = Math.max(fillOpacity, 0.5);
    edgeColor = GOLD;
    edgeOpacity = 1;
  }

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, hovered || selected ? 0.06 : 0.03, 0]}>
      <mesh
        geometry={new THREE.ShapeGeometry(shape)}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(plot, e);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          onHover(plot, e);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onUnhover();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(plot);
        }}
      >
        <meshBasicMaterial
          color={fillColor}
          transparent
          opacity={fillOpacity}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <line geometry={edgeGeometry}>
        <lineBasicMaterial attach="material" color={edgeColor} transparent opacity={edgeOpacity} linewidth={selected || hovered ? 2 : 1} />
      </line>
    </group>
  );
}
