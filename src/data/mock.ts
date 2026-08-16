export type ThreatLevel = "Low" | "Moderate" | "High" | "Critical";
export type DetectionStatus = "Tracking" | "Identified" | "Investigating" | "Alert";

// Deterministic PRNG so SSR and client render identical mock data.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const rand = rng(20260814);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)]!;
const between = (a: number, b: number, d = 0) =>
  Number((a + rand() * (b - a)).toFixed(d));

export const DRONE_MODELS = [
  "DJI Mavic 3",
  "DJI Mini 4",
  "FPV Racing Drone",
  "Fixed Wing UAV",
  "Recon UAV",
  "Surveillance Drone",
  "Unknown Drone",
] as const;

export const INDIA_LOCATIONS = [
  "New Delhi — Sector Alpha",
  "Mumbai Coastal Grid",
  "Bengaluru Tech Corridor",
  "Chennai Port Perimeter",
  "Hyderabad Command Ring",
  "Amritsar Border Sector",
  "Jaisalmer Desert Sector",
  "Leh–Ladakh High Sector",
  "Kolkata Riverfront Zone",
  "Pune Defence Estate",
  "Ahmedabad Industrial Belt",
  "Guwahati North-East Grid",
  "Srinagar Valley Sector",
  "Kochi Naval Airspace",
  "Lucknow Civic Perimeter",
] as const;

export const THREAT_LEVELS: ThreatLevel[] = ["Low", "Moderate", "High", "Critical"];
const STATUSES: DetectionStatus[] = ["Tracking", "Identified", "Investigating", "Alert"];

export interface Detection {
  id: string;
  model: string;
  time: string;
  timestamp: number;
  altitude: number;
  speed: number;
  location: string;
  threat: ThreatLevel;
  status: DetectionStatus;
  signal: number;
  operatorTrace: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const DETECTIONS: Detection[] = Array.from({ length: 100 }, (_, i) => {
  const mins = i * 7 + Math.floor(rand() * 5);
  const h = 23 - Math.floor(mins / 60);
  const m = 59 - (mins % 60);
  const threat = pick(THREAT_LEVELS);
  return {
    id: `SKY-${String(4821 - i)}`,
    model: pick(DRONE_MODELS),
    time: `${pad(Math.max(h, 0))}:${pad(m)}:${pad(Math.floor(rand() * 60))} IST`,
    timestamp: mins,
    altitude: between(40, 4200),
    speed: between(8, 165),
    location: pick(INDIA_LOCATIONS),
    threat,
    status: threat === "Critical" ? "Alert" : pick(STATUSES),
    signal: between(38, 99),
    operatorTrace: rand() > 0.55 ? "Triangulated" : "Unresolved",
  };
});

export interface Zone {
  id: string;
  name: string;
  type: "Restricted" | "Airport" | "Military" | "Critical Infrastructure";
  status: "Secure" | "Elevated" | "Breach";
  radiusKm: number;
  x: number;
  y: number;
  country: string;
}

const ZONE_TYPES: Zone["type"][] = [
  "Restricted",
  "Airport",
  "Military",
  "Critical Infrastructure",
];
export const COUNTRIES = ["India", "USA", "China", "Australia", "United Kingdom"];

export const ZONES: Zone[] = Array.from({ length: 50 }, (_, i) => ({
  id: `ZN-${100 + i}`,
  name: `${pick(INDIA_LOCATIONS).split(" —")[0]} ${pick(["Delta", "Bravo", "Echo", "Kilo", "Zulu", "Sierra"])}`,
  type: pick(ZONE_TYPES),
  status: pick(["Secure", "Secure", "Elevated", "Breach"] as Zone["status"][]),
  radiusKm: between(4, 60),
  x: between(8, 92, 1),
  y: between(10, 90, 1),
  country: i < 34 ? "India" : pick(COUNTRIES),
}));

export interface RadarStation {
  id: string;
  name: string;
  coverageKm: number;
  uptime: number;
  x: number;
  y: number;
  country: string;
}

export const RADAR_STATIONS: RadarStation[] = Array.from({ length: 25 }, (_, i) => ({
  id: `RS-${20 + i}`,
  name: `${pick(INDIA_LOCATIONS).split(" —")[0]} Radar ${i + 1}`,
  coverageKm: between(25, 180),
  uptime: between(93, 99.9, 1),
  x: between(6, 94, 1),
  y: between(8, 92, 1),
  country: i < 17 ? "India" : pick(COUNTRIES),
}));

export interface AlertItem {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  detail: string;
  zone: string;
  time: string;
  acknowledged: boolean;
}

const ALERT_TEXT: Record<AlertItem["severity"], [string, string][]> = {
  Critical: [
    ["Unknown UAV entered restricted zone", "Interception protocol armed. Counter-UAS on standby."],
    ["Swarm signature detected", "Multiple correlated tracks converging on protected airspace."],
  ],
  High: [
    ["Drone detected near airport perimeter", "Approach corridor conflict — ATC notified."],
    ["RF jamming attempt registered", "Control-link anomaly on 5.8GHz band."],
  ],
  Medium: [
    ["Unidentified flight path detected", "Track deviates from filed civilian corridors."],
    ["Repeated loitering behaviour", "Same signature observed over 3 consecutive passes."],
  ],
  Low: [
    ["Authorized inspection drone operating", "Permit verified against national UTM registry."],
    ["Routine survey flight logged", "Operator credentials matched, no action required."],
  ],
};

export const ALERTS: AlertItem[] = Array.from({ length: 500 }, (_, i) => {
  const severity = pick(["Critical", "High", "Medium", "Low", "Low", "Medium"] as AlertItem["severity"][]);
  const [title, detail] = pick(ALERT_TEXT[severity]);
  const mins = i * 3 + 2;
  return {
    id: `ALR-${9000 - i}`,
    severity,
    title,
    detail,
    zone: pick(INDIA_LOCATIONS),
    time: `T-${Math.floor(mins / 60)}h ${pad(mins % 60)}m`,
    acknowledged: rand() > 0.6,
  };
});

export const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
];

export const MONTHLY_TRENDS = MONTHS.map((m) => ({
  month: m,
  detections: Math.round(between(680, 2400)),
  threats: Math.round(between(40, 320)),
  intercepts: Math.round(between(10, 140)),
}));

export const DAILY_DETECTIONS = Array.from({ length: 24 }, (_, h) => ({
  hour: `${pad(h)}:00`,
  detections: Math.round(between(4, 62)),
  critical: Math.round(between(0, 9)),
}));

export const THREAT_CATEGORIES = [
  { name: "Unauthorized Intrusion", value: 34 },
  { name: "Surveillance", value: 26 },
  { name: "Smuggling Payload", value: 17 },
  { name: "Signal Interference", value: 13 },
  { name: "Unclassified", value: 10 },
];

export const DRONE_TYPE_SPLIT = [
  { name: "Consumer Quad", value: 41 },
  { name: "FPV Racing", value: 22 },
  { name: "Fixed Wing", value: 18 },
  { name: "Military Grade", value: 11 },
  { name: "Unknown", value: 8 },
];

export const ALTITUDE_BANDS = [
  { band: "0-100m", flights: 412 },
  { band: "100-400m", flights: 738 },
  { band: "400-1km", flights: 521 },
  { band: "1-2km", flights: 264 },
  { band: "2-4km", flights: 118 },
  { band: "4km+", flights: 39 },
];

export const SUCCESS_RATE = MONTHS.map((m, i) => ({
  month: m,
  accuracy: Number((94.2 + Math.sin(i / 2) * 1.6 + i * 0.18).toFixed(1)),
}));

export const HEATMAP = Array.from({ length: 7 }, (_, d) =>
  Array.from({ length: 12 }, (_, h) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d]!,
    slot: `${pad(h * 2)}h`,
    value: Math.round(between(2, 100)),
  })),
);

export interface DroneProfile {
  id: string;
  name: string;
  type: string;
  range: string;
  speed: string;
  altitude: string;
  battery: string;
  applications: string[];
  threat: ThreatLevel;
  signature: string;
  image: string;
}

export const DRONE_PROFILES: DroneProfile[] = [
  {
    id: "mavic3",
    name: "DJI Mavic 3",
    type: "Consumer Quadcopter",
    range: "30 km",
    speed: "75 km/h",
    altitude: "6,000 m",
    battery: "46 min",
    applications: ["Aerial photography", "Mapping", "Inspection"],
    threat: "Moderate",
    signature: "OcuSync 3+ / 2.4–5.8 GHz",
    image: "mavic",
  },
  {
    id: "mini4",
    name: "DJI Mini 4",
    type: "Sub-250g Quadcopter",
    range: "20 km",
    speed: "57 km/h",
    altitude: "4,000 m",
    battery: "34 min",
    applications: ["Recreational", "Content capture", "Light survey"],
    threat: "Low",
    signature: "OcuSync 4 / low RCS",
    image: "mini",
  },
  {
    id: "fpv",
    name: "FPV Racing Drone",
    type: "High-Agility Racer",
    range: "8 km",
    speed: "180 km/h",
    altitude: "1,500 m",
    battery: "9 min",
    applications: ["Racing", "Freestyle", "Rapid incursion"],
    threat: "High",
    signature: "Analog 5.8 GHz / ELRS 868 MHz",
    image: "fpv",
  },
  {
    id: "recon",
    name: "Recon UAV",
    type: "Tactical ISR Platform",
    range: "120 km",
    speed: "130 km/h",
    altitude: "5,500 m",
    battery: "6 h",
    applications: ["Reconnaissance", "Border patrol", "Target acquisition"],
    threat: "Critical",
    signature: "Encrypted datalink / low emission",
    image: "recon",
  },
  {
    id: "fixedwing",
    name: "Fixed Wing UAV",
    type: "Long-Endurance Fixed Wing",
    range: "200 km",
    speed: "145 km/h",
    altitude: "7,000 m",
    battery: "10 h",
    applications: ["Corridor mapping", "Pipeline survey", "Long patrol"],
    threat: "High",
    signature: "SATCOM relay / 1.2 GHz",
    image: "fixed",
  },
  {
    id: "surveillance",
    name: "Surveillance Drone",
    type: "Persistent Observation",
    range: "45 km",
    speed: "60 km/h",
    altitude: "3,200 m",
    battery: "3 h",
    applications: ["Perimeter watch", "Crowd monitoring", "Night ISR"],
    threat: "High",
    signature: "Thermal payload / mesh uplink",
    image: "surveil",
  },
];

export const AI_INSIGHTS = [
  {
    title: "Threat Forecasting",
    confidence: 92,
    text: "Elevated FPV drone activity detected near restricted sectors. Forecast indicates a 3x spike over the next 48 hours along the Amritsar border corridor.",
  },
  {
    title: "Drone Activity Analysis",
    confidence: 87,
    text: "Surveillance drone activity increased by 18% during evening hours across metropolitan protected zones.",
  },
  {
    title: "Pattern Recognition",
    confidence: 95,
    text: "Recurring flight geometry matched across 14 tracks — consistent with a single operator conducting staged reconnaissance.",
  },
  {
    title: "Risk Assessment",
    confidence: 78,
    text: "High probability of unauthorized airspace intrusion in Zone Delta within the next operational window.",
  },
  {
    title: "Airspace Insights",
    confidence: 84,
    text: "Jaisalmer desert sector shows degraded radar overlap. Recommend re-tasking mobile station RS-31 for continuous coverage.",
  },
  {
    title: "Counter-UAS Readiness",
    confidence: 90,
    text: "Jamming assets at 4 of 6 metro command nodes report full readiness. Kochi node requires calibration within 12 hours.",
  },
];

export const REPORTS = [
  { id: "RPT-D-4421", title: "Daily Airspace Situation Report", category: "Daily Reports", pages: 12, size: "2.4 MB", date: "14 Aug 2026", classification: "Restricted" },
  { id: "RPT-D-4420", title: "Daily Detection Log — Northern Command", category: "Daily Reports", pages: 8, size: "1.1 MB", date: "13 Aug 2026", classification: "Internal" },
  { id: "RPT-W-0912", title: "Weekly Threat Posture Review", category: "Weekly Reports", pages: 34, size: "6.8 MB", date: "11 Aug 2026", classification: "Confidential" },
  { id: "RPT-W-0911", title: "Weekly Sensor Health & Coverage", category: "Weekly Reports", pages: 21, size: "3.9 MB", date: "04 Aug 2026", classification: "Internal" },
  { id: "RPT-M-0233", title: "Monthly National Airspace Intelligence", category: "Monthly Reports", pages: 96, size: "18.2 MB", date: "01 Aug 2026", classification: "Confidential" },
  { id: "RPT-M-0232", title: "Monthly Counter-UAS Effectiveness", category: "Monthly Reports", pages: 61, size: "11.5 MB", date: "01 Jul 2026", classification: "Restricted" },
  { id: "RPT-T-1180", title: "Threat Summary — FPV Incursion Cluster", category: "Threat Summaries", pages: 17, size: "4.2 MB", date: "12 Aug 2026", classification: "Confidential" },
  { id: "RPT-T-1179", title: "Threat Summary — Border Sector Overflights", category: "Threat Summaries", pages: 23, size: "5.6 MB", date: "09 Aug 2026", classification: "Restricted" },
  { id: "RPT-A-3307", title: "Airspace Activity Report — Metro Corridors", category: "Airspace Activity Reports", pages: 44, size: "9.1 MB", date: "10 Aug 2026", classification: "Internal" },
  { id: "RPT-A-3306", title: "Airspace Activity Report — Coastal Grid", category: "Airspace Activity Reports", pages: 38, size: "7.7 MB", date: "07 Aug 2026", classification: "Internal" },
];

export const TICKER = [
  "SKY-4821 // Unknown UAV — Amritsar Border Sector — CRITICAL",
  "Radar RS-24 uptime 99.4% — nominal",
  "SKY-4809 // FPV Racing Drone — Pune Defence Estate — HIGH",
  "Zone Delta perimeter integrity restored",
  "AI Forecast: intrusion probability 74% next 6h",
  "SKY-4788 // DJI Mavic 3 — Mumbai Coastal Grid — MODERATE",
  "15 command centers online — national mesh synchronized",
];

export const threatColor = (t: ThreatLevel | AlertItem["severity"]) =>
  t === "Critical"
    ? "text-threat"
    : t === "High"
      ? "text-warn"
      : t === "Moderate" || t === "Medium"
        ? "text-cyan"
        : "text-radar";

export const threatBg = (t: ThreatLevel | AlertItem["severity"]) =>
  t === "Critical"
    ? "bg-threat/15 text-threat border-threat/40"
    : t === "High"
      ? "bg-warn/15 text-warn border-warn/40"
      : t === "Moderate" || t === "Medium"
        ? "bg-cyan/15 text-cyan border-cyan/40"
        : "bg-radar/15 text-radar border-radar/40";