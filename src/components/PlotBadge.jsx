import { Html } from "@react-three/drei";
import { imageToWorldXZ, plotCentroidPx } from "../data/helpers";
import { STATUS_COLOR } from "../data/projectData";

export default function PlotBadge({ plot, selected, hovered }) {
  const centroid = plotCentroidPx(plot.points);
  const [wx, wz] = imageToWorldXZ(centroid);
  const color = STATUS_COLOR[plot.status];
  const active = selected || hovered;

  return (
    <Html position={[wx, 0.2, wz]} center distanceFactor={undefined} occlude={false} zIndexRange={[10, 0]}>
      <div
        className="plot-badge"
        style={{
          borderColor: active ? "#cba135" : color,
          background: active ? "#cba135" : "#12181f",
          color: active ? "#1a1200" : "#fff",
          transform: active ? "scale(1.18)" : "scale(1)",
        }}
      >
        {plot.id}
      </div>
    </Html>
  );
}
