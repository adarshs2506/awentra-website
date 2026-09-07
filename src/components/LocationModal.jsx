import Modal from "./Modal";
import { PROJECT } from "../data/projectData";

export default function LocationModal({ open, onClose }) {
  const src = "https://www.google.com/maps?q=" + encodeURIComponent(PROJECT.mapQuery) + "&output=embed";
  return (
    <Modal open={open} onClose={onClose} title="Location" className="location-modal">
      {open && (
        <iframe
          title="Location map"
          src={src}
          width="100%"
          height="420"
          style={{ border: 0, borderRadius: 10 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </Modal>
  );
}
