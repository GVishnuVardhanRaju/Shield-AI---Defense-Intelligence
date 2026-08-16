import type { FlightPath } from "@/types/global-map";

export const FLIGHT_PATHS: FlightPath[] = [
  {
    id: "FP-001",
    from: { city: "London", latitude: 51.5072, longitude: -0.1276 },
    to: { city: "Paris", latitude: 48.8566, longitude: 2.3522 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-002",
    from: { city: "Dubai", latitude: 25.2048, longitude: 55.2708 },
    to: { city: "Mumbai", latitude: 19.076, longitude: 72.8777 },
    status: "UNAUTHORIZED",
    color: "red",
  },
  {
    id: "FP-003",
    from: { city: "Singapore", latitude: 1.3521, longitude: 103.8198 },
    to: { city: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-004",
    from: { city: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
    to: { city: "Seoul", latitude: 37.5665, longitude: 126.978 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-005",
    from: { city: "New York", latitude: 40.7128, longitude: -74.006 },
    to: { city: "Washington", latitude: 38.9072, longitude: -77.0369 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-006",
    from: { city: "Cairo", latitude: 30.0444, longitude: 31.2357 },
    to: { city: "Dubai", latitude: 25.2048, longitude: 55.2708 },
    status: "UNAUTHORIZED",
    color: "red",
  },
  {
    id: "FP-007",
    from: { city: "Beijing", latitude: 39.9042, longitude: 116.4074 },
    to: { city: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-008",
    from: { city: "Johannesburg", latitude: -26.2041, longitude: 28.0473 },
    to: { city: "Cairo", latitude: 30.0444, longitude: 31.2357 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-009",
    from: { city: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    to: { city: "Seattle", latitude: 47.6062, longitude: -122.3321 },
    status: "AUTHORIZED",
    color: "cyan",
  },
  {
    id: "FP-010",
    from: { city: "New Delhi", latitude: 28.6139, longitude: 77.209 },
    to: { city: "Singapore", latitude: 1.3521, longitude: 103.8198 },
    status: "UNAUTHORIZED",
    color: "red",
  },
] as const;
