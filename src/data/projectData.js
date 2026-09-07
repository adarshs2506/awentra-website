/* ============================================================
   AYESHA — Interactive 3D Masterplan — Project Data
   ------------------------------------------------------------
   Edit everything here to re-brand / re-price / re-plot the
   project. Nothing in the components needs to change for that.

   Coordinate space: 4320 x 7680 px (portrait) — matches
   /public/masterplan.png pixel-for-pixel. Plot polygons, facing
   and status are traced directly from that image. Corner plots
   are 5-6 point polygons instead of 4 — the renderer supports
   any point count.
   ============================================================ */

export const IMAGE_W = 4320;
export const IMAGE_H = 7680;

// World-space size of the masterplan plane (three.js units).
export const PLANE_W = 43.2;
export const PLANE_H = 76.8;

// ---- Project / brand info (EDIT ME) --------------------------------------
export const PROJECT = {
  name: "AWENTRA GROUP OF VISUALS",
  fullName: "AWENTRA GROUP OF VISUALS",
  location: "Lucknow, Uttar Pradesh",
  phone: "+91 73551 50877",
  whatsapp: "917355150877", // digits only, country code first
  email: "ayeshagroup@gmail.com",
  mapQuery: "Lucknow, Uttar Pradesh",
  ratePerSqYd: 35000, // example rate used only to compute demo prices
};

// ---- Gallery placeholder cards --------------------------------------------
export const GALLERY_ITEMS = [
  { title: "Grand Entrance Gate", tone: 1 },
  { title: "Central Amenity Park", tone: 2 },
  { title: "Landscaped Boulevard", tone: 3 },
  { title: "Kids' Play Area", tone: 4 },
  { title: "Jogging Track", tone: 5 },
  { title: "Night View — Street Lighting", tone: 6 },
];

export const FACING_NAME = {
  N: "North", S: "South", E: "East", W: "West",
  NE: "North-East", NW: "North-West", SE: "South-East", SW: "South-West",
};

export const ARROW = { N: "↑", S: "↓", E: "→", W: "←", NE: "↗", NW: "↖", SE: "↘", SW: "↙" };

export const STATUS_COLOR = {
  available: "#2fbf6a",
  booked: "#f0b429",
  sold: "#ff2d47",
};
export const STATUS_LABEL = { available: "Available", booked: "Booked", sold: "Sold" };

// ---- Plot geometry ---------------------------------------------------------
// points: [[x,y], ...] plot corners in image-pixel space (4 for a regular
// plot, 5-6 for corner plots). areaSqm matches the number printed on the
// real photo for every plot.
export const PLOTS = [
  { id: 1, points: [[681,1275],[1185,1313],[1166,2382],[662,2370]], areaSqm: 477.832, facing: "SE", status: "booked" },
  { id: 2, points: [[1193,1317],[1666,1351],[1647,2390],[1170,2382]], areaSqm: 465.615, facing: "SE", status: "sold" },
  { id: 3, points: [[2040,1382],[2574,1416],[2555,2447],[2021,2435]], areaSqm: 518.934, facing: "NE", status: "sold" },
  { id: 4, points: [[2586,1420],[3108,1458],[3089,2458],[2566,2447]], areaSqm: 465.187, facing: "NE", status: "available" },
  { id: 5, points: [[3116,1458],[3685,1496],[3666,2470],[3097,2458]], areaSqm: 491.894, facing: "E", status: "booked" },
  { id: 6, points: [[3154,2466],[3669,2477],[3662,2920],[3150,2909]], areaSqm: 214.199, facing: "E", status: "booked" },
  { id: 7, points: [[2883,2462],[3143,2466],[3135,2909],[2868,2905]], areaSqm: 112, facing: "S", status: "sold" },
  { id: 8, points: [[2608,2458],[2872,2462],[2864,2905],[2601,2897]], areaSqm: 112, facing: "S", status: "available" },
  { id: 9, points: [[2341,2454],[2597,2458],[2593,2901],[2330,2893]], areaSqm: 112, facing: "S", status: "available" },
  { id: 10, points: [[2021,2443],[2326,2451],[2322,2893],[2025,2890],[2013,2874]], areaSqm: 140, facing: "SE", status: "available" },
  { id: 11, points: [[1620,2882],[1639,2867],[1647,2401],[666,2378],[658,2863],[1620,2882]], areaSqm: 456, facing: "N", status: "available" },
  { id: 12, points: [[639,3336],[1612,3355],[1628,3370],[1620,3840],[628,3821],[635,3542]], areaSqm: 456, facing: "N", status: "available" },
  { id: 13, points: [[1181,3840],[1620,3848],[1609,4103],[1177,4096]], areaSqm: 107.088, facing: "W", status: "available" },
  { id: 14, points: [[1177,4103],[1609,4111],[1609,4371],[1170,4359]], areaSqm: 107.088, facing: "W", status: "available" },
  { id: 15, points: [[1170,4374],[1609,4382],[1605,4634],[1166,4630]], areaSqm: 107.088, facing: "W", status: "available" },
  { id: 16, points: [[1166,4638],[1605,4645],[1597,4901],[1162,4894]], areaSqm: 107.088, facing: "W", status: "booked" },
  { id: 17, points: [[1162,4905],[1601,4913],[1597,5168],[1158,5161]], areaSqm: 107.088, facing: "W", status: "booked" },
  { id: 18, points: [[1158,5168],[1597,5180],[1589,5466],[1574,5481],[1147,5470]], areaSqm: 138, facing: "SW", status: "booked" },
  { id: 19, points: [[2005,3378],[2017,3367],[2295,3370],[2284,3794],[1994,3790]], areaSqm: 128.25, facing: "SW", status: "available" },
  { id: 20, points: [[2303,3367],[2292,3794],[2555,3798],[2563,3374]], areaSqm: 108, facing: "E", status: "available" },
  { id: 21, points: [[2578,3374],[2837,3378],[2826,3802],[2570,3798]], areaSqm: 108, facing: "E", status: "available" },
  { id: 22, points: [[2849,3378],[3112,3386],[3101,3809],[2841,3802],[2845,3638]], areaSqm: 108, facing: "E", status: "available" },
  { id: 23, points: [[3120,3382],[3658,3393],[3650,3821],[3112,3809]], areaSqm: 215.18, facing: "N", status: "available" },
  { id: 24, points: [[3112,3813],[3650,3829],[3643,4252],[3101,4245]], areaSqm: 216.166, facing: "N", status: "available" },
  { id: 25, points: [[2841,3813],[3097,3817],[3093,4245],[2830,4237]], areaSqm: 108, facing: "W", status: "available" },
  { id: 26, points: [[2570,3806],[2826,3813],[2822,4237],[2559,4233]], areaSqm: 108, facing: "W", status: "available" },
  { id: 27, points: [[2292,3802],[2555,3806],[2551,4233],[2288,4226]], areaSqm: 108, facing: "W", status: "available" },
  { id: 28, points: [[1994,3798],[2284,3802],[2280,4226],[2005,4222],[1990,4210]], areaSqm: 128.25, facing: "NW", status: "available" },
  { id: 29, points: [[1979,4615],[1990,4600],[2284,4603],[2276,5042],[1971,5039]], areaSqm: 140, facing: "NW", status: "available" },
  { id: 30, points: [[2295,4600],[2555,4607],[2547,5046],[2288,5042]], areaSqm: 112, facing: "S", status: "available" },
  { id: 31, points: [[2566,4607],[2826,4611],[2822,5050],[2559,5046]], areaSqm: 112, facing: "S", status: "available" },
  { id: 32, points: [[2837,4611],[3101,4615],[3093,5058],[2826,5054]], areaSqm: 112, facing: "S", status: "available" },
  { id: 33, points: [[3112,4615],[3635,4626],[3631,5065],[3101,5058]], areaSqm: 218.269, facing: "E", status: "available" },
  { id: 34, points: [[3101,5065],[3631,5077],[3627,5520],[3093,5508]], areaSqm: 215.103, facing: "E", status: "available" },
  { id: 35, points: [[2830,5061],[3093,5065],[3082,5508],[2822,5504]], areaSqm: 112, facing: "N", status: "available" },
  { id: 36, points: [[2555,5058],[2818,5061],[2814,5504],[2551,5500]], areaSqm: 112, facing: "N", status: "available" },
  { id: 37, points: [[2288,5054],[2547,5058],[2536,5497],[2280,5493]], areaSqm: 112, facing: "N", status: "booked" },
  { id: 38, points: [[1971,5046],[2276,5050],[2265,5493],[1975,5485],[1963,5474]], areaSqm: 140, facing: "NE", status: "booked" },
];
