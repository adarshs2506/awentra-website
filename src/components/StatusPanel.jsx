import { PLOTS, STATUS_LABEL } from "../data/projectData";

export default function StatusPanel({ statusOn, onToggleOn, statusFilter, onSetFilter }) {
  const counts = { available: 0, booked: 0, sold: 0 };
  PLOTS.forEach((p) => counts[p.status]++);

  return (
    <div className="panel status-panel">
      <div className="panel-head static">
        <span>STATUS</span>
        <button
          className={"ios-switch" + (statusOn ? " on" : "")}
          onClick={onToggleOn}
          aria-label="Toggle status colors"
        >
          <span className="ios-switch-knob" />
        </button>
      </div>
      <div className="panel-body">
        {["available", "booked", "sold"].map((st) => (
          <button
            key={st}
            className={"legend-row" + (statusFilter === st ? " active" : "")}
            onClick={() => onSetFilter(statusFilter === st ? null : st)}
          >
            <span className={"legend-check " + st + (statusFilter === st ? " checked" : "")} />
            <span className={"legend-label " + st}>{STATUS_LABEL[st]}</span>
            <span className="legend-count">{counts[st]}</span>
          </button>
        ))}
        <div className="legend-total">
          <span>Total</span>
          <b>{PLOTS.length}</b>
        </div>
      </div>
    </div>
  );
}
