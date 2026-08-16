import type { AiPrediction } from "@/types/airspace";

export const AI_PREDICTIONS: AiPrediction[] = [
  { id: "AI-001", name: "India Corridor", latitude: 22.0, longitude: 78.0, radius: 22, confidence: 91.7, sectors: ["India", "Border Sector", "Urban Airspace"] },
  { id: "AI-002", name: "East Asia Drift", latitude: 36.0, longitude: 120.0, radius: 23, confidence: 88.2, sectors: ["East Asia", "Sea Corridor", "High-Density Urban Airspace"] },
  { id: "AI-003", name: "Levant Threat Arc", latitude: 30.0, longitude: 45.0, radius: 24, confidence: 86.4, sectors: ["Middle East", "Oil Infrastructure", "Air Corridors"] },
  { id: "AI-004", name: "North Atlantic Approach", latitude: 48.0, longitude: 10.0, radius: 18, confidence: 82.9, sectors: ["Europe", "Commercial Routes", "Airports"] },
];
