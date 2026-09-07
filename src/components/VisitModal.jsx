import { useState, useEffect } from "react";
import Modal from "./Modal";
import { PROJECT } from "../data/projectData";

export default function VisitModal({ open, onClose, plotId }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mailHref, setMailHref] = useState("#");

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    const body = `Site visit request\nName: ${name}\nPhone: ${phone}\nPlot: ${plotId ? "#" + plotId : "Not specified"}`;
    const mailto = `mailto:${PROJECT.email}?subject=${encodeURIComponent("Site Visit Request — " + PROJECT.fullName)}&body=${encodeURIComponent(body)}`;
    setMailHref(mailto);
    setSubmitted(true);
  };

  return (
    <Modal open={open} onClose={onClose} title="Request a Site Visit" className="visit-modal">
      {!submitted ? (
        <form onSubmit={submit}>
          <label>Full Name
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label>Phone Number
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." />
          </label>
          <label>Plot
            <input value={plotId ? "#" + plotId : ""} readOnly />
          </label>
          <button type="submit" className="submit-btn">Request Visit</button>
        </form>
      ) : (
        <div className="visit-success">
          <p>Thanks{name ? ", " + name : ""}! This is a demo form — no backend is attached yet.</p>
          <p>Connect it to your CRM / Google Sheet / email API (Formspree, EmailJS, etc.) to capture real leads.</p>
          <a className="mail-fallback" href={mailHref}>✉️ Send this request by email instead</a>
        </div>
      )}
    </Modal>
  );
}
