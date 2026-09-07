import {
  sqmToSqft,
  sqmToSqyd,
  plotDimensionsFt,
  estimatePrice,
  formatPrice,
} from "../data/helpers";
import { PROJECT, FACING_NAME, ARROW, STATUS_COLOR, STATUS_LABEL } from "../data/projectData";

function DimensionDiagram({ frontFt, depthFt, status }) {
  const maxW = 92, maxH = 84;
  const s = Math.min(maxW / frontFt, maxH / depthFt);
  const w = frontFt * s, h = depthFt * s;
  const boxX = 34, boxY = 6;
  const color = STATUS_COLOR[status] || "#cba135";
  return (
    <svg viewBox="0 0 132 145" width="132" height="145">
      <rect x={boxX} y={boxY} width={w.toFixed(1)} height={h.toFixed(1)} fill="rgba(255,255,255,0.05)" stroke={color} strokeWidth="2" rx="1" />
      <line x1="18" y1={boxY} x2="18" y2={(boxY + h).toFixed(1)} stroke="#5b6472" strokeWidth="1" />
      <line x1="14" y1={boxY} x2="22" y2={boxY} stroke="#5b6472" strokeWidth="1" />
      <line x1="14" y1={(boxY + h).toFixed(1)} x2="22" y2={(boxY + h).toFixed(1)} stroke="#5b6472" strokeWidth="1" />
      <text x="10" y={(boxY + h / 2).toFixed(1)} fill="#8b93a7" fontSize="9" textAnchor="middle" transform={`rotate(-90 10 ${(boxY + h / 2).toFixed(1)})`}>
        {depthFt} ft
      </text>
      <line x1={boxX} y1={(boxY + h + 16).toFixed(1)} x2={(boxX + w).toFixed(1)} y2={(boxY + h + 16).toFixed(1)} stroke="#5b6472" strokeWidth="1" />
      <line x1={boxX} y1={(boxY + h + 12).toFixed(1)} x2={boxX} y2={(boxY + h + 20).toFixed(1)} stroke="#5b6472" strokeWidth="1" />
      <line x1={(boxX + w).toFixed(1)} y1={(boxY + h + 12).toFixed(1)} x2={(boxX + w).toFixed(1)} y2={(boxY + h + 20).toFixed(1)} stroke="#5b6472" strokeWidth="1" />
      <text x={(boxX + w / 2).toFixed(1)} y={(boxY + h + 32).toFixed(1)} fill="#8b93a7" fontSize="9" textAnchor="middle">
        {frontFt} ft
      </text>
    </svg>
  );
}

export default function PlotDetailPanel({ plot, onClose, onRequestVisit }) {
  if (!plot) return null;
  const dims = plotDimensionsFt(plot);
  const sqft = sqmToSqft(plot.areaSqm);
  const waHref =
    "https://wa.me/" + PROJECT.whatsapp + "?text=" +
    encodeURIComponent(`Hi, I'm interested in Plot #${plot.id} at ${PROJECT.fullName}. Please share more details.`);

  return (
    <div className="plot-popup-overlay" onClick={onClose}>
      <div className="plot-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" aria-label="Close" onClick={onClose}>✕</button>
        <span className={"badge " + plot.status}>{STATUS_LABEL[plot.status]}</span>
        <div className="title-row">Plot #{plot.id}</div>
        <div className="popup-location">{PROJECT.location.toUpperCase()}</div>

        <div className="popup-diagram">
          <DimensionDiagram frontFt={dims.front} depthFt={dims.depth} status={plot.status} />
        </div>

        <div className="popup-specs">
          <div className="spec-row"><span>SQ. FEET</span><b>{sqft} Sq.Ft</b></div>
          <div className="spec-row"><span>SQ. METERS</span><b>{plot.areaSqm} Sq.M</b></div>
          <div className="spec-row"><span>SQ. YARDS</span><b>{sqmToSqyd(plot.areaSqm)} Sq.Yd</b></div>
          <div className="spec-row"><span>DIMENSIONS</span><b>{dims.front} × {dims.depth} ft</b></div>
          <div className="spec-row"><span>FACING</span><b>{ARROW[plot.facing]} {FACING_NAME[plot.facing]}</b></div>
          <div className="spec-row"><span>STATUS</span><b className={"status-text st-" + plot.status}>{STATUS_LABEL[plot.status]}</b></div>
          <div className="spec-row"><span>PRICE</span><b>₹{formatPrice(estimatePrice(plot.areaSqm))} <span className="muted">(example)</span></b></div>
        </div>

        <div className="popup-actions">
          <a className="wa-btn" href={waHref} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          <a className="call-btn" href={"tel:" + PROJECT.phone.replace(/\s+/g, "")}>📞 Call Now</a>
        </div>
        <button type="button" className="visit-link" onClick={() => onRequestVisit(plot.id)}>
          📅 Request a Site Visit
        </button>
      </div>
    </div>
  );
}
