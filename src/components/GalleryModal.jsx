import Modal from "./Modal";
import { GALLERY_ITEMS } from "../data/projectData";

const TONES = {
  1: ["#cba135", "#8a6a1f"],
  2: ["#2fbf6a", "#1c7a44"],
  3: ["#3d7bd6", "#274f8a"],
  4: ["#d6673d", "#8a3f27"],
  5: ["#9b59d6", "#5f338a"],
  6: ["#0a0e17", "#2c333f"],
};

export default function GalleryModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Gallery" className="gallery-modal">
      <div className="gallery-grid">
        {GALLERY_ITEMS.map((item, i) => {
          const [a, b] = TONES[item.tone] || TONES[1];
          return (
            <div key={i} className="gallery-card" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
              {item.title}
            </div>
          );
        })}
      </div>
      <p className="modal-note">
        Placeholder cards — swap these for real property photos in <code>GalleryModal.jsx</code>.
      </p>
    </Modal>
  );
}
