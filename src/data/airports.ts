import type { AirportPoint } from "@/types/airspace";

export const AIRPORTS: AirportPoint[] = [
  { id: "APT-001", name: "Washington DCA", country: "United States", latitude: 38.8512, longitude: -77.0402, activeAircraft: 118, droneDetections: 4, threatLevel: "LOW", radarCoverage: 95 },
  { id: "APT-002", name: "LAX", country: "United States", latitude: 33.9416, longitude: -118.4085, activeAircraft: 134, droneDetections: 6, threatLevel: "MODERATE", radarCoverage: 91 },
  { id: "APT-003", name: "Heathrow", country: "United Kingdom", latitude: 51.4700, longitude: -0.4543, activeAircraft: 102, droneDetections: 5, threatLevel: "MODERATE", radarCoverage: 94 },
  { id: "APT-004", name: "CDG", country: "France", latitude: 49.0097, longitude: 2.5479, activeAircraft: 96, droneDetections: 3, threatLevel: "LOW", radarCoverage: 92 },
  { id: "APT-005", name: "Berlin Brandenburg", country: "Germany", latitude: 52.3667, longitude: 13.5033, activeAircraft: 88, droneDetections: 2, threatLevel: "LOW", radarCoverage: 90 },
  { id: "APT-006", name: "Cairo International", country: "Egypt", latitude: 30.1219, longitude: 31.4056, activeAircraft: 76, droneDetections: 7, threatLevel: "HIGH", radarCoverage: 86 },
  { id: "APT-007", name: "Dubai Intl", country: "United Arab Emirates", latitude: 25.2532, longitude: 55.3657, activeAircraft: 109, droneDetections: 8, threatLevel: "HIGH", radarCoverage: 89 },
  { id: "APT-008", name: "Indira Gandhi", country: "India", latitude: 28.5562, longitude: 77.1000, activeAircraft: 144, droneDetections: 11, threatLevel: "HIGH", radarCoverage: 97 },
  { id: "APT-009", name: "Beijing Capital", country: "China", latitude: 40.0799, longitude: 116.6031, activeAircraft: 120, droneDetections: 7, threatLevel: "MODERATE", radarCoverage: 95 },
  { id: "APT-010", name: "Tokyo Haneda", country: "Japan", latitude: 35.5494, longitude: 139.7798, activeAircraft: 128, droneDetections: 6, threatLevel: "MODERATE", radarCoverage: 93 },
  { id: "APT-011", name: "Singapore Changi", country: "Singapore", latitude: 1.3644, longitude: 103.9915, activeAircraft: 122, droneDetections: 5, threatLevel: "MODERATE", radarCoverage: 94 },
  { id: "APT-012", name: "Sydney Kingsford Smith", country: "Australia", latitude: -33.9399, longitude: 151.1753, activeAircraft: 98, droneDetections: 4, threatLevel: "LOW", radarCoverage: 92 },
  { id: "APT-013", name: "São Paulo Guarulhos", country: "Brazil", latitude: -23.4314, longitude: -46.4695, activeAircraft: 87, droneDetections: 3, threatLevel: "LOW", radarCoverage: 90 },
];
