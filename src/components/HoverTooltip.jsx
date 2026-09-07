import { sqmToSqyd, plotDimensionsFt } from "../data/helpers";
import { FACING_NAME } from "../data/projectData";

export default function HoverTooltip({ plot, x, y }) {
  if (!plot) return null;
  const dims = plotDimensionsFt(plot);
  return (
    <div className="hover-tip" style={{ left: x + 16, top: y + 16 }}>
      <span className={"badge " + plot.status}>{plot.status.toUpperCase()}</span>
      <span className="plot-no">Plot #{plot.id}</span>
      <div className="area-line">{sqmToSqyd(plot.areaSqm)} Sq.Yd</div>
      <div className="sub-line">{dims.front} × {dims.depth} ft · {FACING_NAME[plot.facing]} Facing</div>
    </div>
  );
}
