export type ThreatLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
export type RadarStatus = "ONLINE" | "DEGRADED" | "OFFLINE";
export type ZoneCategory =
  | "Airport"
  | "Military Facility"
  | "Government Facility"
  | "Critical Infrastructure"
  | "Energy Facility"
  | "Border Sector";

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

export interface DetectionPoint {
  id: string;
  droneName: string;
  droneType: string;
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
  status: "Tracking" | "Identified" | "Investigating" | "Alert";
  detectionTime: string;
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
  threatLevel: ThreatLevel;
}

export interface RestrictedZone {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
  threatLevel: "WARNING" | "RESTRICTED";
}

export interface FlightPath {
  id: string;
  name: string;
  from: { city: string; latitude: number; longitude: number };
  to: { city: string; latitude: number; longitude: number };
  status: "AUTHORIZED" | "SUSPICIOUS" | "UNAUTHORIZED";
  color: "cyan" | "orange" | "red";
  altitude: number;
  speed: number;
  drone: string;
  threatLevel: ThreatLevel;
}

export interface ThreatRegion {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  level: ThreatLevel;
}

export interface AiPrediction {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  confidence: number;
  sectors: string[];
}

export interface CommandCenter {
  id: string;
  name: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  sensors: number;
  activeTracks: number;
  alerts: number;
  systemHealth: number;
  radarCoverage: number;
}

export interface AirportPoint {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  activeAircraft: number;
  droneDetections: number;
  threatLevel: ThreatLevel;
  radarCoverage: number;
}
