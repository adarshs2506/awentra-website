export default function Modal({ open, onClose, title, children, className = "" }) {
  if (!open) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={"modal-card " + className}>
        <div className="modal-head">
          <span>{title}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
