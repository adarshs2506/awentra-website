# AYESHA — Interactive 3D Masterplan (React + Three.js)

React + Vite + Three.js (via `@react-three/fiber` + `@react-three/drei`)
rebuild of the original vanilla-JS masterplan viewer — same features, same
data, but the 2D/3D toggle, pan, zoom, and plot rendering are now a real
WebGL scene instead of CSS 3D transforms, matching the kind of stack used
by JS-rendered masterplan viewers like your reference site.

## Run it in VS Code

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd ayesha-3d
npm install
npm run dev
```

Open the printed `http://localhost:5173` URL. Hot-reload is on — edit any
file and the browser updates instantly.

To build a deployable production bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally to double check
```

`dist/` is a static site — deploy it to Vercel, Netlify, GitHub Pages, or
any static host.

## What's inside

```
ayesha-3d/
├── public/
│   └── masterplan.png       ← the real aerial masterplan photo (texture)
├── src/
│   ├── data/
│   │   ├── projectData.js   ← ALL your data: brand, plots, gallery (EDIT HERE)
│   │   └── helpers.js       ← pricing / unit-conversion / geometry math
│   ├── components/
│   │   ├── Scene.jsx        ← the Three.js canvas: plane + plots + camera rig
│   │   ├── PlotMesh.jsx     ← one clickable/hoverable plot polygon
│   │   ├── TopBar.jsx, StatusPanel.jsx, FacingPanel.jsx,
│   │   │   ZoomAndSearch.jsx, HoverTooltip.jsx, PlotDetailPanel.jsx
│   │   ├── Modal.jsx, GalleryModal.jsx, LocationModal.jsx, VisitModal.jsx
│   │   └── App.css           ← all component styling (dark navy + gold theme)
│   └── App.jsx               ← wires all state + components together
```

## How the 3D works

- The masterplan photo is mapped onto a single textured `PlaneGeometry`.
- Every plot is traced from the same pixel coordinates as the original
  project (`points: [[x,y], ...]` in `projectData.js`) and rendered as a
  flat, slightly-raised `ShapeGeometry` mesh sitting just above the plane,
  colored by status and highlighted on hover / click / filter — all real
  raycasting via `@react-three/fiber`'s built-in pointer events, no manual
  hit-testing code needed.
- **2D view** = camera looking straight down (orthographic-feel top view).
- **3D view** = camera pulled back and tilted, with full orbit/rotate.
- Both are driven by `OrbitControls` from `@react-three/drei`, so drag-pan,
  scroll-to-zoom, and pinch-to-zoom on mobile all work natively — no custom
  touch-event code required (the original vanilla-JS version had to hand-roll
  all of that).
- Toggling 2D/3D or searching a plot smoothly animates the camera to the new
  position/target over ~0.8s, then hands full control back to OrbitControls
  so it never fights your dragging.

## Customizing your data / branding

Everything is in **`src/data/projectData.js`**:

- `PROJECT` — name, location, phone, WhatsApp number, email, price rate.
- `PLOTS` — array of `{ id, points, areaSqm, facing, status }`. Add/remove
  plots freely; counts, colors, and popups all update automatically.
- `GALLERY_ITEMS` — gallery modal cards. Swap the colored placeholders for
  real photos by editing `src/components/GalleryModal.jsx` (add an `<img>`
  where the placeholder `<div>` is).

## Before going to production

- `PROJECT.phone` / `whatsapp` / `email` are placeholders — put your real
  numbers in.
- The "Request Site Visit" form has no backend — wire the `submit` handler
  in `src/components/VisitModal.jsx` to your CRM / Google Sheet / email API
  (Formspree, EmailJS, or your own server) to actually capture leads.
- Gallery images are colored placeholder cards — replace with real photos.
- The bundle currently ships as a single ~300KB gzip JS chunk (Three.js is
  a sizeable library). For a production deploy you may want to code-split
  with `React.lazy()` around `<Scene />`, which is easy to add if needed.
