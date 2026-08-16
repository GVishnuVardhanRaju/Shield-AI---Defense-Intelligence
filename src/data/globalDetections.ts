import { DETECTIONS } from "@/data/mock";
import type { DetectionPoint } from "@/types/global-map";

const LOCATION_SEEDS = [
  { country: "India", city: "New Delhi", latitude: 28.6139, longitude: 77.209, sensor: "RADAR-IN-01" },
  { country: "India", city: "Mumbai", latitude: 19.076, longitude: 72.8777, sensor: "RADAR-IN-02" },
  { country: "India", city: "Bengaluru", latitude: 12.9716, longitude: 77.5946, sensor: "RADAR-IN-03" },
  { country: "United States", city: "Washington", latitude: 38.9072, longitude: -77.0369, sensor: "RADAR-US-01" },
  { country: "United States", city: "Los Angeles", latitude: 34.0522, longitude: -118.2437, sensor: "RADAR-US-02" },
  { country: "United Kingdom", city: "London", latitude: 51.5072, longitude: -0.1276, sensor: "RADAR-UK-01" },
  { country: "Germany", city: "Berlin", latitude: 52.52, longitude: 13.405, sensor: "RADAR-EU-01" },
  { country: "France", city: "Paris", latitude: 48.8566, longitude: 2.3522, sensor: "RADAR-EU-02" },
  { country: "South Africa", city: "Johannesburg", latitude: -26.2041, longitude: 28.0473, sensor: "RADAR-SA-01" },
  { country: "Egypt", city: "Cairo", latitude: 30.0444, longitude: 31.2357, sensor: "RADAR-EG-01" },
  { country: "United Arab Emirates", city: "Dubai", latitude: 25.2048, longitude: 55.2708, sensor: "RADAR-AE-01" },
  { country: "China", city: "Beijing", latitude: 39.9042, longitude: 116.4074, sensor: "RADAR-CN-01" },
  { country: "Japan", city: "Tokyo", latitude: 35.6762, longitude: 139.6503, sensor: "RADAR-JP-01" },
  { country: "South Korea", city: "Seoul", latitude: 37.5665, longitude: 126.978, sensor: "RADAR-KR-01" },
  { country: "Singapore", city: "Singapore", latitude: 1.3521, longitude: 103.8198, sensor: "RADAR-SG-01" },
  { country: "Australia", city: "Sydney", latitude: -33.8688, longitude: 151.2093, sensor: "RADAR-AU-01" },
  { country: "Russia", city: "Moscow", latitude: 55.7558, longitude: 37.6173, sensor: "RADAR-RU-01" },
  { country: "Brazil", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, sensor: "RADAR-BR-01" },
] as const;

export const GLOBAL_DETECTIONS: DetectionPoint[] = Array.from({ length: 100 }, (_, index) => {
  const source = DETECTIONS[index % DETECTIONS.length];
  const seed = LOCATION_SEEDS[index % LOCATION_SEEDS.length];
  const offsetLat = ((index % 5) - 2) * 0.8;
  const offsetLon = ((index % 7) - 3) * 0.9;

  return {
    id: `DET-${String(index + 1).padStart(3, "0")}`,
    droneName: source.model,
    latitude: Number((seed.latitude + offsetLat).toFixed(4)),
    longitude: Number((seed.longitude + offsetLon).toFixed(4)),
    altitude: source.altitude,
    speed: source.speed,
    threatLevel: source.threat.toUpperCase() as DetectionPoint["threatLevel"],
    country: seed.country,
    city: seed.city,
    sensor: seed.sensor,
    confidence: 89 + (index % 10),
    location: source.location,
  };
});
