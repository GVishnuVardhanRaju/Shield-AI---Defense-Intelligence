import type { ThreatRegion } from "@/types/airspace";

export const THREAT_REGIONS: ThreatRegion[] = [
  { id: "TR-001", name: "North America", latitude: 39.0, longitude: -98.0, radius: 26, level: "HIGH" },
  { id: "TR-002", name: "Europe", latitude: 48.0, longitude: 10.0, radius: 23, level: "MODERATE" },
  { id: "TR-003", name: "Middle East", latitude: 27.0, longitude: 45.0, radius: 28, level: "HIGH" },
  { id: "TR-004", name: "India", latitude: 22.0, longitude: 78.0, radius: 24, level: "CRITICAL" },
  { id: "TR-005", name: "East Asia", latitude: 36.0, longitude: 120.0, radius: 25, level: "HIGH" },
  { id: "TR-006", name: "Southeast Asia", latitude: 2.0, longitude: 110.0, radius: 19, level: "MODERATE" },
  { id: "TR-007", name: "Australia", latitude: -25.0, longitude: 135.0, radius: 18, level: "LOW" },
  { id: "TR-008", name: "South America", latitude: -15.0, longitude: -60.0, radius: 22, level: "MODERATE" },
];
