export default function ZoomControls({ view, onZoom, zoomPct }) {
  const is3d = view === "3d";
  return (
    <div className={`zoom-controls${is3d ? " mode-3d" : ""}`}>
      <button onClick={() => onZoom("in")} aria-label="Zoom in">+</button>
      <button onClick={() => onZoom("out")} aria-label="Zoom out">−</button>
      <button onClick={() => onZoom("reset")} className="zoom-reset">RST</button>
      <div className="zoom-pct">{zoomPct}%</div>
    </div>
  );
}
