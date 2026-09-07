export default function CompassControl({ view, onToggleView }) {
  return (
    <div className="compass-stack">
      <div className="compass-dial" title="North">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#12181f" stroke="rgba(255,255,255,0.12)" />
          <path d="M20 6 L25 20 L20 17 L15 20 Z" fill="#cba135" />
          <path d="M20 34 L25 20 L20 23 L15 20 Z" fill="#5b6472" />
        </svg>
        <span className="compass-n">N</span>
      </div>
      <button className="view-toggle-round" onClick={onToggleView}>
        {view === "3d" ? "3D" : "2D"}
      </button>
    </div>
  );
}
