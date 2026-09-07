export default function MapActions({ view, onOpenGallery, onOpenLocation }) {
  const is3d = view === "3d";
  return (
    <div className={`map-actions${is3d ? " mode-3d" : ""}`}>
      <button className="map-action-btn" onClick={onOpenGallery}>
        <span className="map-action-icon">🖼</span><span>GALLERY</span>
      </button>
      <button className="map-action-btn" onClick={onOpenLocation}>
        <span className="map-action-icon pin">📍</span><span>LOCATION</span>
      </button>
    </div>
  );
}
