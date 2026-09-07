import { PLOTS, FACING_NAME, ARROW } from "../data/projectData";

const DIRS = ["N", "S", "E", "W"];

export default function FacingPanel({ statusOn, facingFilter, onSetFilter }) {
  if (!statusOn) return null;

  const counts = { N: 0, S: 0, E: 0, W: 0 };
  PLOTS.forEach((p) => DIRS.forEach((d) => { if (p.facing.includes(d)) counts[d]++; }));

  return (
    <div className="panel facing-panel">
      <div className="panel-head static">FACING</div>
      <div className="panel-body">
        {DIRS.map((d) => (
          <button
            key={d}
            className={"facing-row" + (facingFilter === d ? " active" : "")}
            onClick={() => onSetFilter(facingFilter === d ? null : d)}
          >
            <span className="arrow">{ARROW[d]}</span>
            <span className="flabel">{FACING_NAME[d]}</span>
            <span className="fcount">{counts[d]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
