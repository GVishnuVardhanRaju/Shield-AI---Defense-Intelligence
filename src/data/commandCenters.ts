import type { CommandCenter } from "@/types/airspace";

export const COMMAND_CENTERS: CommandCenter[] = [
  { id: "CC-001", name: "Washington Command", country: "United States", city: "Washington", latitude: 38.9072, longitude: -77.0369, sensors: 18, activeTracks: 126, alerts: 7, systemHealth: 98, radarCoverage: 95.8 },
  { id: "CC-002", name: "London Joint Ops", country: "United Kingdom", city: "London", latitude: 51.5072, longitude: -0.1276, sensors: 13, activeTracks: 98, alerts: 5, systemHealth: 94, radarCoverage: 94.2 },
  { id: "CC-003", name: "New Delhi Control", country: "India", city: "New Delhi", latitude: 28.6139, longitude: 77.209, sensors: 21, activeTracks: 148, alerts: 11, systemHealth: 97, radarCoverage: 97.2 },
  { id: "CC-004", name: "Singapore Regional Hub", country: "Singapore", city: "Singapore", latitude: 1.3521, longitude: 103.8198, sensors: 12, activeTracks: 83, alerts: 4, systemHealth: 96, radarCoverage: 93.8 },
  { id: "CC-005", name: "Sydney Joint Airspace", country: "Australia", city: "Sydney", latitude: -33.8688, longitude: 151.2093, sensors: 10, activeTracks: 69, alerts: 3, systemHealth: 95, radarCoverage: 94.7 },
];
