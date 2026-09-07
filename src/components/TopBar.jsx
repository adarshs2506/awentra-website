import { useState } from "react";
import { PROJECT } from "../data/projectData";

export default function TopBar({ onOpenGallery, onSearch }) {
  const [query, setQuery] = useState("");
  const [errorFlash, setErrorFlash] = useState(false);

  const waHref =
    "https://wa.me/" + PROJECT.whatsapp + "?text=" +
    encodeURIComponent("Hi, I'm interested in " + PROJECT.fullName + ". Please share more details.");

  const submit = () => {
    const q = query.trim().replace(/^#/, "");
    if (!q) return;
    const ok = onSearch(q);
    if (!ok) {
      setErrorFlash(true);
      setTimeout(() => setErrorFlash(false), 900);
    }
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">{PROJECT.name.charAt(0)}</div>
        <div className="brand-text">
          <div className="brand-name">{PROJECT.name}</div>
          <div className="brand-loc">{PROJECT.location}</div>
        </div>
      </div>

      <div className={"topbar-search" + (errorFlash ? " error" : "")}>
        <span className="search-icon">🔎</span>
        <input
          placeholder="Search plot number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button className="go-btn" onClick={submit}>GO</button>
      </div>

      <div className="topbar-actions">
        <a className="icon-btn" href={"tel:" + PROJECT.phone.replace(/\s+/g, "")} aria-label="Call">📞</a>
        {/* <button className="icon-btn" onClick={onOpenGallery} aria-label="Gallery">▦</button> */}
        <a className="pill-btn wa" href={waHref} target="_blank" rel="noopener noreferrer"><span>💬</span><span>WhatsApp</span></a>
      </div>
    </header>
  );
}
