import { useCallback, useMemo, useState } from "react";
import Scene from "./components/Scene";
import TopBar from "./components/TopBar";
import CompassControl from "./components/CompassControl";
import StatusPanel from "./components/StatusPanel";
import FacingPanel from "./components/FacingPanel";
import ZoomControls from "./components/ZoomControls";
import MapActions from "./components/MapActions";
import HoverTooltip from "./components/HoverTooltip";
import PlotDetailPanel from "./components/PlotDetailPanel";
import GalleryModal from "./components/GalleryModal";
import LocationModal from "./components/LocationModal";
import VisitModal from "./components/VisitModal";
import { PLOTS, PROJECT } from "./data/projectData";
import { imageToWorldXZ, plotCentroidPx } from "./data/helpers";
import "./App.css";

export default function App() {
  const [view, setView] = useState("2d");
  const [statusOn, setStatusOn] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);
  const [facingFilter, setFacingFilter] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);
  const [zoomTick, setZoomTick] = useState(null);
  const [zoomPct, setZoomPct] = useState(100);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [visitPlotId, setVisitPlotId] = useState(null);

  const plotsById = useMemo(() => {
    const m = new Map();
    PLOTS.forEach((p) => m.set(String(p.id), p));
    return m;
  }, []);

  const handleHover = useCallback((plot, e) => {
    setHovered(plot);
    if (e?.nativeEvent) setPointer({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
  }, []);
  const handleUnhover = useCallback(() => setHovered(null), []);

  const handleSelect = useCallback((plot) => {
    setSelectedPlot(plot);
    setHovered(null);
  }, []);

  const handleSearch = useCallback((query) => {
    const plot = plotsById.get(query);
    if (!plot) return false;
    setSelectedPlot(plot);
    const centroid = plotCentroidPx(plot.points);
    const [wx, wz] = imageToWorldXZ(centroid);
    setFocusTarget([wx, 0, wz]);
    return true;
  }, [plotsById]);

  const openVisitModal = useCallback((plotId) => {
    setSelectedPlot(null);
    setVisitPlotId(plotId || null);
    setVisitOpen(true);
  }, []);

  return (
    <div className="app-root">
      <TopBar
        onOpenGallery={() => setGalleryOpen(true)}
        onSearch={handleSearch}
      />

      <CompassControl view={view} onToggleView={() => setView((v) => (v === "3d" ? "2d" : "3d"))} />

      <Scene
        view={view}
        showStatus={statusOn}
        statusFilter={statusFilter}
        facingFilter={facingFilter}
        selectedPlotId={selectedPlot?.id ?? null}
        hoveredPlotId={hovered?.id ?? null}
        focusTarget={focusTarget}
        zoomTick={zoomTick}
        onHoverPlot={handleHover}
        onUnhoverPlot={handleUnhover}
        onSelectPlot={handleSelect}
        onZoomPctChange={setZoomPct}
      />

      <StatusPanel
        statusOn={statusOn}
        onToggleOn={() => setStatusOn((v) => !v)}
        statusFilter={statusFilter}
        onSetFilter={setStatusFilter}
      />

      <FacingPanel statusOn={statusOn} facingFilter={facingFilter} onSetFilter={setFacingFilter} />

      <ZoomControls
        view={view}
        onZoom={(type) => setZoomTick({ type, t: Date.now() })}
        zoomPct={zoomPct}
      />

      <MapActions
        view={view}
        onOpenGallery={() => setGalleryOpen(true)}
        onOpenLocation={() => setLocationOpen(true)}
      />

      <HoverTooltip plot={hovered} x={pointer.x} y={pointer.y} />

      <PlotDetailPanel
        plot={selectedPlot}
        onClose={() => setSelectedPlot(null)}
        onRequestVisit={openVisitModal}
      />

      <GalleryModal open={galleryOpen} onClose={() => setGalleryOpen(false)} />
      <LocationModal open={locationOpen} onClose={() => setLocationOpen(false)} />
      <VisitModal open={visitOpen} onClose={() => setVisitOpen(false)} plotId={visitPlotId} />

      {/* <footer className="footer-credit">
        {PROJECT.name} · Interactive 3D Masterplan — built with React + Three.js
      </footer> */}
    </div>
  );
}
