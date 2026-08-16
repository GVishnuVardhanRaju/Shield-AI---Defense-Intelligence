import type { RestrictedZone } from "@/types/airspace";

export const RESTRICTED_ZONES: RestrictedZone[] = [
  { id: "RZ-001", name: "Military Airspace", country: "United States", latitude: 38.2, longitude: -77.0, radiusKm: 42, threatLevel: "RESTRICTED" },
  { id: "RZ-002", name: "Airport Perimeter", country: "United Kingdom", latitude: 51.5, longitude: -0.1, radiusKm: 28, threatLevel: "WARNING" },
  { id: "RZ-003", name: "Government Zone", country: "India", latitude: 28.6, longitude: 77.2, radiusKm: 35, threatLevel: "RESTRICTED" },
  { id: "RZ-004", name: "Border Restricted Sector", country: "China", latitude: 39.9, longitude: 116.4, radiusKm: 40, threatLevel: "RESTRICTED" },
  { id: "RZ-005", name: "Airport Perimeter", country: "Japan", latitude: 35.7, longitude: 139.7, radiusKm: 24, threatLevel: "WARNING" },
  { id: "RZ-006", name: "Military Airspace", country: "Saudi Arabia", latitude: 24.7, longitude: 46.7, radiusKm: 48, threatLevel: "RESTRICTED" },
  { id: "RZ-007", name: "Border Restricted Sector", country: "Australia", latitude: -33.9, longitude: 151.2, radiusKm: 30, threatLevel: "WARNING" },
  { id: "RZ-008", name: "Government Zone", country: "France", latitude: 48.9, longitude: 2.3, radiusKm: 26, threatLevel: "WARNING" },
  { id: "RZ-009", name: "Airspace Control", country: "Brazil", latitude: -23.5, longitude: -46.6, radiusKm: 32, threatLevel: "WARNING" },
  { id: "RZ-010", name: "Border Restricted Sector", country: "South Africa", latitude: -26.2, longitude: 28.0, radiusKm: 29, threatLevel: "RESTRICTED" },
];
