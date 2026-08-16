export type ThreatLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
export type RadarStatus = "ONLINE" | "DEGRADED" | "OFFLINE";
export type TheatreKey = "GLOBAL" | "INDIA" | "USA" | "CHINA" | "AUSTRALIA" | "UNITED KINGDOM";
export type ZoneCategory =
  | "Airport"
  | "Military Facility"
  | "Critical Infrastructure"
  | "Border Sector"
  | "Government Facility"
  | "Energy Infrastructure";

export interface RadarStation {
  id: string;
  name: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  coverageRadius: number;
  status: RadarStatus;
  signalStrength: number;
}

export interface CountryThreatProfile {
  country: string;
  airspaceStatus: "Secure" | "Elevated" | "Heightened" | "Critical";
  activeDetections: number;
  radarCoverage: number;
  threatLevel: ThreatLevel;
  radarStations: number;
  protectedZones: number;
  lastUpdated: string;
}

export interface DetectionPoint {
  id: string;
  droneName: string;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  threatLevel: ThreatLevel;
  country: string;
  city: string;
  sensor: string;
  confidence: number;
  location: string;
}

export interface ProtectedZone {
  id: string;
  name: string;
  label: string;
  category: ZoneCategory;
  latitude: number;
  longitude: number;
  radiusKm: number;
  country: string;
  threatLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
}

export interface FlightPath {
  id: string;
  from: { city: string; latitude: number; longitude: number };
  to: { city: string; latitude: number; longitude: number };
  status: "AUTHORIZED" | "UNAUTHORIZED";
  color: "cyan" | "red";
}

export interface TheatrePreset {
  key: TheatreKey;
  label: string;
  center: [number, number];
  scale: number;
}
