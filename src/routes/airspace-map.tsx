import { motion } from "framer-motion";
import {
  Compass,
  Crosshair,
  Layers3,
  MapPinned,
  Minus,
  Plane,
  Plus,
  Radar as RadarIcon,
  Route,
  ShieldAlert,
  Signal,
  Waypoints,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps";

import { Counter, GlassPanel, PageShell, SectionHeading, StatusDot } from "@/components/shield/primitives";
import { AIRPORTS } from "@/data/airports";
import { AI_PREDICTIONS } from "@/data/aiPredictions";
import { COMMAND_CENTERS } from "@/data/commandCenters";
import { FLIGHT_PATHS } from "@/data/flightPaths";
import { GLOBAL_DETECTIONS } from "@/data/globalDetections";
import { PROTECTED_ZONES } from "@/data/protectedZones";
import { RADAR_STATIONS } from "@/data/radarStations";
import { RESTRICTED_ZONES } from "@/data/restrictedZones";
import { THREAT_REGIONS } from "@/data/threatRegions";
import { GLOBAL_THEATRES, MAJOR_CITIES, WORLD_GEO_URL } from "@/data/worldMapData";
import type { TheatreKey } from "@/types/global-map";

const LAYER_META = [
  { key: "borders", label: "Country Borders", icon: Compass, tone: "text-radar" },
  { key: "radar", label: "Radar Stations", icon: RadarIcon, tone: "text-radar" },
  { key: "detections", label: "Drone Detections", icon: Signal, tone: "text-threat" },
  { key: "protected", label: "Protected Zones", icon: ShieldAlert, tone: "text-cyan" },
  { key: "restricted", label: "Restricted Areas", icon: Waypoints, tone: "text-warn" },
  { key: "paths", label: "Flight Paths", icon: Route, tone: "text-cyan" },
  { key: "cities", label: "City Labels", icon: MapPinned, tone: "text-cyan" },
  { key: "heatmap", label: "Threat Heatmap", icon: Signal, tone: "text-warn" },
  { key: "predictions", label: "AI Predictions", icon: Compass, tone: "text-cyan" },
  { key: "commandCenters", label: "Command Centers", icon: RadarIcon, tone: "text-radar" },
  { key: "airports", label: "Airports", icon: Plane, tone: "text-cyan" },
] as const;

const ACTIVE_REGIONS = [
  { name: "India", detections: 18 },
  { name: "East Asia", detections: 26 },
  { name: "Europe", detections: 21 },
  { name: "Middle East", detections: 17 },
  { name: "North America", detections: 23 },
] as const;

const normalizeCountryName = (value: string | undefined) => {
  const raw = value ?? "";
  const map: Record<string, string> = {
    "United States of America": "United States",
    "United States": "United States",
    "Republic of Korea": "South Korea",
    "South Korea": "South Korea",
    "Russian Federation": "Russia",
    Russia: "Russia",
    "United Kingdom": "United Kingdom",
    "United Arab Emirates": "United Arab Emirates",
    "Czechia": "Czech Republic",
    "Macedonia": "North Macedonia",
    "Democratic Republic of the Congo": "Congo",
  };
  return map[raw] ?? raw;
};

export function AirspaceMap() {
  const [selectedTheatre, setSelectedTheatre] = useState<TheatreKey>("GLOBAL");
  const [selectedCountry, setSelectedCountry] = useState<string>("United States");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [layers, setLayers] = useState<Record<string, boolean>>({
    borders: true,
    radar: true,
    detections: true,
    protected: true,
    restricted: true,
    paths: true,
    cities: true,
    heatmap: true,
    predictions: true,
    commandCenters: true,
    airports: true,
  });

  const activeTheatre = useMemo(
    () => GLOBAL_THEATRES.find((t) => t.key === selectedTheatre) ?? GLOBAL_THEATRES[0],
    [selectedTheatre],
  );

  const countryMetrics = useMemo(
    () =>
      new Map(
        [
          {
            country: "India",
            airspaceStatus: "Elevated",
            activeDetections: 18,
            radarCoverage: 97.2,
            threatLevel: "MODERATE",
            radarStations: 7,
            protectedZones: 12,
            lastUpdated: "12:45:32 UTC",
          },
          {
            country: "United States",
            airspaceStatus: "Heightened",
            activeDetections: 24,
            radarCoverage: 95.8,
            threatLevel: "HIGH",
            radarStations: 9,
            protectedZones: 16,
            lastUpdated: "12:43:10 UTC",
          },
          {
            country: "China",
            airspaceStatus: "Elevated",
            activeDetections: 21,
            radarCoverage: 96.6,
            threatLevel: "MODERATE",
            radarStations: 8,
            protectedZones: 14,
            lastUpdated: "12:41:54 UTC",
          },
          {
            country: "Australia",
            airspaceStatus: "Secure",
            activeDetections: 9,
            radarCoverage: 94.7,
            threatLevel: "LOW",
            radarStations: 5,
            protectedZones: 9,
            lastUpdated: "12:39:41 UTC",
          },
          {
            country: "United Kingdom",
            airspaceStatus: "Elevated",
            activeDetections: 12,
            radarCoverage: 94.2,
            threatLevel: "MODERATE",
            radarStations: 4,
            protectedZones: 7,
            lastUpdated: "12:38:08 UTC",
          },
          {
            country: "France",
            airspaceStatus: "Secure",
            activeDetections: 10,
            radarCoverage: 93.4,
            threatLevel: "LOW",
            radarStations: 5,
            protectedZones: 8,
            lastUpdated: "12:35:27 UTC",
          },
        ].map((entry) => [entry.country, entry]),
      ),
    [],
  );

  const selectedCountryMetrics = countryMetrics.get(selectedCountry) ?? {
    country: selectedCountry,
    airspaceStatus: "Secure",
    activeDetections: 9,
    radarCoverage: 94.1,
    threatLevel: "LOW",
    radarStations: 4,
    protectedZones: 8,
    lastUpdated: "12:30:04 UTC",
  };

  const hoveredCountryMetrics = hoveredCountry ? countryMetrics.get(hoveredCountry) : null;

  const toggleLayer = (key: string) =>
    setLayers((current) => ({
      ...current,
      [key]: !current[key],
    }));

  const mapScale = activeTheatre.scale * zoom;
  const detectionTotal = GLOBAL_DETECTIONS.length;
  const criticalCount = GLOBAL_DETECTIONS.filter((d) => d.threatLevel === "CRITICAL").length;
  const radarTotal = RADAR_STATIONS.length;
  const protectedTotal = PROTECTED_ZONES.length;
  const restrictedTotal = 50;
  const coverage = 96.4;
  const importantCityLabels = new Set([
    "Washington",
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Berlin",
    "Cairo",
    "Dubai",
    "Johannesburg",
    "New Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Sydney",
    "Melbourne",
    "São Paulo",
  ]);
  const visibleMajorCities = MAJOR_CITIES.filter((city) => {
    if (selectedTheatre === "GLOBAL") return importantCityLabels.has(city.city);
    if (selectedTheatre === "INDIA") return ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad"].includes(city.city);
    if (selectedTheatre === "USA") return ["Washington", "New York", "Los Angeles"].includes(city.city);
    if (selectedTheatre === "CHINA") return ["Beijing", "Shanghai", "Tokyo", "Seoul"].includes(city.city);
    if (selectedTheatre === "AUSTRALIA") return ["Sydney", "Melbourne"].includes(city.city);
    if (selectedTheatre === "UNITED KINGDOM") return ["London", "Paris", "Berlin"].includes(city.city);
    return importantCityLabels.has(city.city);
  });

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 03 · Geospatial Surveillance"
        title="GLOBAL AIRSPACE MAP"
        description="Real-time global drone detection, radar coverage, protected zones, and threat intelligence."
      />

      <div className="mb-4 grid gap-4 xl:grid-cols-[1.05fr_2.7fr_1fr]">
        <GlassPanel hover={false} className="space-y-4">
          <div>
            <p className="hud-label mb-3">Theatre</p>
            <div className="flex flex-wrap gap-2">
              {GLOBAL_THEATRES.map((theatre) => (
                <button
                  key={theatre.key}
                  onClick={() => {
                    setSelectedTheatre(theatre.key);
                    setZoom(1);
                    if (theatre.key === "GLOBAL") setSelectedCountry("United States");
                  }}
                  className={`rounded-md border px-2.5 py-1.5 text-[11px] transition-colors ${
                    selectedTheatre === theatre.key
                      ? "border-radar/60 bg-radar/12 text-radar"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {theatre.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="hud-label mb-3">Layers</p>
            <div className="space-y-2">
              {LAYER_META.map(({ key, label, icon: Icon, tone }) => (
                <button
                  key={key}
                  onClick={() => toggleLayer(key)}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs transition-colors ${
                    layers[key] ? "border-radar/40 bg-radar/10 text-foreground" : "border-border opacity-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className={`size-3.5 ${tone}`} />
                    {label}
                  </span>
                  <span className="font-mono text-[10px]">{layers[key] ? "ON" : "OFF"}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="hud-label mb-3">Global Status</p>
            <dl className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Active detections</dt>
                <dd className="font-mono text-radar">
                  <Counter value={detectionTotal} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Critical threats</dt>
                <dd className="font-mono text-threat">
                  <Counter value={criticalCount} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Radar stations</dt>
                <dd className="font-mono text-cyan">
                  <Counter value={radarTotal} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Protected zones</dt>
                <dd className="font-mono text-warn">
                  <Counter value={protectedTotal} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Global coverage</dt>
                <dd className="font-mono text-radar">{coverage.toFixed(1)}%</dd>
              </div>
            </dl>
          </div>
        </GlassPanel>

        <GlassPanel hover={false} className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <StatusDot />
              <span className="hud-label">Global airspace surveillance</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((value) => Math.max(0.75, Number((value - 0.1).toFixed(2))))}
                className="rounded border border-border bg-background/40 p-1.5 text-muted-foreground transition hover:text-foreground"
                aria-label="Zoom out"
              >
                <Minus className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((value) => Math.min(1.8, Number((value + 0.1).toFixed(2))))}
                className="rounded border border-border bg-background/40 p-1.5 text-muted-foreground transition hover:text-foreground"
                aria-label="Zoom in"
              >
                <Plus className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTheatre("GLOBAL");
                  setZoom(1);
                  setSelectedCountry("United States");
                }}
                className="rounded border border-border bg-background/40 px-2 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
              >
                Recenter
              </button>
            </div>
          </div>

          <div className="relative h-[620px] overflow-hidden bg-[#020b09] sm:h-[700px]">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div
              className="animate-scanline pointer-events-none absolute inset-x-0 h-24"
              style={{
                background:
                  "linear-gradient(180deg, transparent, color-mix(in oklab, var(--radar) 12%, transparent), transparent)",
              }}
            />

            <div className="absolute inset-4 z-10 rounded border border-border/60 bg-black/10 backdrop-blur-sm">
              <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{ scale: mapScale, center: activeTheatre.center }}
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={WORLD_GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName = normalizeCountryName(
                        typeof geo.properties.name === "string" ? geo.properties.name : undefined,
                      );
                      const isSelected = selectedCountry === countryName;
                      const isHoverTarget = hoveredCountry === countryName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => setHoveredCountry(countryName)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => setSelectedCountry(countryName)}
                          style={{
                            default: {
                              fill: isSelected ? "#173b2f" : isHoverTarget ? "#1c4339" : "#0b1915",
                              stroke: isSelected ? "#7ce7b4" : "rgba(112, 194, 158, 0.35)",
                              strokeWidth: isSelected ? 0.9 : 0.4,
                              outline: "none",
                            },
                            hover: {
                              fill: "#214d3d",
                              stroke: "#98f0c7",
                              strokeWidth: 0.8,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#1f5646",
                              stroke: "#d3ffe8",
                              strokeWidth: 1,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {layers.heatmap &&
                  THREAT_REGIONS.map((region) => {
                    const fill =
                      region.level === "CRITICAL"
                        ? "rgba(255, 88, 88, 0.18)"
                        : region.level === "HIGH"
                          ? "rgba(255, 166, 84, 0.14)"
                          : region.level === "MODERATE"
                            ? "rgba(255, 214, 102, 0.12)"
                            : "rgba(120, 240, 182, 0.10)";
                    return (
                      <Marker key={region.id} coordinates={[region.longitude, region.latitude]}>
                        <circle r={region.radius * 2.1} fill={fill} stroke="rgba(255,255,255,0.15)" strokeWidth={0.6} />
                      </Marker>
                    );
                  })}

                {layers.predictions &&
                  AI_PREDICTIONS.map((prediction) => (
                    <Marker key={prediction.id} coordinates={[prediction.longitude, prediction.latitude]}>
                      <circle r={prediction.radius * 2.2} fill="rgba(127, 227, 255, 0.08)" stroke="rgba(127, 227, 255, 0.55)" strokeWidth={0.7} strokeDasharray="5 7" />
                    </Marker>
                  ))}

                {layers.paths &&
                  FLIGHT_PATHS.map((path) => (
                    <Line
                      key={path.id}
                      from={[path.from.longitude, path.from.latitude]}
                      to={[path.to.longitude, path.to.latitude]}
                      stroke={path.color === "red" ? "#ff6e5f" : path.color === "orange" ? "#ffb14a" : "#74f0d3"}
                      strokeWidth={path.status === "UNAUTHORIZED" ? 1.5 : 1.1}
                      strokeLinecap="round"
                      strokeDasharray={path.status === "UNAUTHORIZED" ? "2 6" : path.status === "SUSPICIOUS" ? "6 5" : undefined}
                      opacity={0.9}
                    />
                  ))}

                {layers.commandCenters &&
                  COMMAND_CENTERS.map((center) => (
                    <Marker key={center.id} coordinates={[center.longitude, center.latitude]}>
                      <g>
                        <polygon
                          points="0,-8 8,0 0,8 -8,0"
                          fill="rgba(116, 240, 211, 0.12)"
                          stroke="rgba(116, 240, 211, 0.85)"
                          strokeWidth={1.1}
                        />
                        <circle r={2.5} fill="#dffef5" />
                      </g>
                    </Marker>
                  ))}

                {layers.airports &&
                  AIRPORTS.map((airport) => (
                    <Marker key={airport.id} coordinates={[airport.longitude, airport.latitude]}>
                      <g>
                        <circle r={4.3} fill="rgba(245, 179, 84, 0.18)" stroke="rgba(245, 179, 84, 0.75)" strokeWidth={0.8} />
                        <circle r={1.8} fill="#ffcb72" />
                      </g>
                    </Marker>
                  ))}

                {layers.protected &&
                  PROTECTED_ZONES.map((zone) => (
                    <Marker key={zone.id} coordinates={[zone.longitude, zone.latitude]}>
                      <circle r={Math.max(5, zone.radiusKm / 18)} fill="rgba(75, 214, 255, 0.12)" opacity={0.6} />
                      <circle r={3.2} fill="rgba(87, 216, 255, 0.8)" stroke="rgba(255,255,255,0.35)" strokeWidth={0.5} />
                    </Marker>
                  ))}

                {layers.restricted &&
                  RESTRICTED_ZONES.map((zone, index) => (
                    <Marker key={`restricted-${zone.id}`} coordinates={[zone.longitude + index * 0.05, zone.latitude + index * 0.04]}>
                      <circle r={zone.radiusKm / 8} fill="rgba(255, 98, 83, 0.08)" stroke={zone.threatLevel === "RESTRICTED" ? "rgba(255, 98, 83, 0.6)" : "rgba(255, 177, 74, 0.5)"} strokeWidth={0.9} strokeDasharray="4 7" />
                    </Marker>
                  ))}

                {layers.radar &&
                  RADAR_STATIONS.map((station, index) => (
                    <Marker key={station.id} coordinates={[station.longitude, station.latitude]}>
                      <g style={{ animationDelay: `${index * 120}ms` }}>
                        <circle
                          r={Math.max(16, station.coverageRadius / 120)}
                          fill="rgba(116, 240, 211, 0.09)"
                          stroke="rgba(116, 240, 211, 0.35)"
                          strokeWidth={0.8}
                          strokeDasharray="3 5"
                        />
                        <circle
                          r={Math.max(10, station.coverageRadius / 180)}
                          fill="rgba(116, 240, 211, 0.13)"
                          stroke="rgba(116, 240, 211, 0.65)"
                          strokeWidth={0.7}
                        />
                        <circle
                          r={Math.max(7, station.signalStrength / 12)}
                          fill="rgba(116, 240, 211, 0.18)"
                          stroke="rgba(116, 240, 211, 0.9)"
                          strokeWidth={1.5}
                          className="animate-ping-ring"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                        <circle r={4.2} fill="#b9ffe9" stroke="#dffef5" strokeWidth={0.8} />
                        <circle r={1.8} fill="#ffffff" />
                      </g>
                    </Marker>
                  ))}

                {layers.detections &&
                  GLOBAL_DETECTIONS.slice(0, 80).map((detection) => {
                    const color =
                      detection.threatLevel === "CRITICAL"
                        ? "#ff5a5a"
                        : detection.threatLevel === "HIGH"
                          ? "#ffb14a"
                          : detection.threatLevel === "MODERATE"
                            ? "#5fe7ff"
                            : "#78f0b6";

                    return (
                      <Marker key={detection.id} coordinates={[detection.longitude, detection.latitude]}>
                        <g>
                          <circle r={detection.threatLevel === "CRITICAL" ? 6.4 : 4.2} fill={color} opacity={0.9} />
                          {detection.threatLevel === "CRITICAL" && (
                            <circle r={12} fill="rgba(255, 90, 90, 0.15)" stroke="rgba(255, 90, 90, 0.7)" strokeWidth={0.7} />
                          )}
                        </g>
                      </Marker>
                    );
                  })}

                {layers.cities && (
                  <>
                    {visibleMajorCities.map((city) => (
                      <Marker key={`${city.city}-${city.latitude}`} coordinates={[city.longitude, city.latitude]}>
                        <g>
                          <circle r={1.5} fill="#d3fff2" opacity={0.9} />
                          <circle r={5} fill="rgba(116, 240, 211, 0.08)" />
                          <text
                            textAnchor="middle"
                            y={-10}
                            fill="rgba(211,255,242,0.82)"
                            fontSize={Math.max(8, Math.min(11, 8 + zoom * 2))}
                            fontFamily="JetBrains Mono, monospace"
                            letterSpacing="0.08em"
                          >
                            {city.city}
                          </text>
                        </g>
                      </Marker>
                    ))}

                    {[
                      { label: "USA", coordinates: [-98, 38] },
                      { label: "CANADA", coordinates: [-95, 60] },
                      { label: "BRAZIL", coordinates: [-52, -10] },
                      { label: "UK", coordinates: [-2, 54] },
                      { label: "FRANCE", coordinates: [2, 46] },
                      { label: "GERMANY", coordinates: [10, 51] },
                      { label: "SPAIN", coordinates: [-4, 40] },
                      { label: "RUSSIA", coordinates: [85, 61] },
                      { label: "INDIA", coordinates: [78, 22] },
                      { label: "CHINA", coordinates: [104, 35] },
                      { label: "JAPAN", coordinates: [138, 36] },
                      { label: "AUSTRALIA", coordinates: [133, -25] },
                      { label: "SOUTH AFRICA", coordinates: [24, -30] },
                      { label: "EGYPT", coordinates: [30, 27] },
                    ].map(({ label, coordinates }) => (
                      <Marker key={label} coordinates={coordinates as [number, number]}>
                        <text
                          textAnchor="middle"
                          y={-8}
                          fill="rgba(211,255,242,0.75)"
                          fontSize={10}
                          fontFamily="JetBrains Mono, monospace"
                          letterSpacing="0.12em"
                          style={{ textTransform: "uppercase" }}
                        >
                          {label}
                        </text>
                      </Marker>
                    ))}
                  </>
                )}
              </ComposableMap>
            </div>

            {(hoveredCountry || selectedCountry) && (
              <div className="pointer-events-none absolute left-4 top-4 z-20 w-64 rounded border border-border bg-[#071712]/90 p-3 shadow-2xl shadow-radar/10 backdrop-blur-md">
                <div className="hud-label mb-1 text-[9px] text-radar">Country</div>
                <div className="text-sm font-semibold text-foreground">{hoveredCountry ?? selectedCountry}</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
                  <div>
                    <div className="hud-label text-[8px]">AIRSPACE STATUS</div>
                    <div className="mt-1 text-foreground">
                      {(hoveredCountry ? countryMetrics.get(hoveredCountry) : selectedCountryMetrics)?.airspaceStatus ?? "Secure"}
                    </div>
                  </div>
                  <div>
                    <div className="hud-label text-[8px]">ACTIVE DETECTIONS</div>
                    <div className="mt-1 text-foreground">
                      {(hoveredCountry ? countryMetrics.get(hoveredCountry) : selectedCountryMetrics)?.activeDetections ?? 0}
                    </div>
                  </div>
                  <div>
                    <div className="hud-label text-[8px]">RADAR COVERAGE</div>
                    <div className="mt-1 text-foreground">
                      {(hoveredCountry ? countryMetrics.get(hoveredCountry) : selectedCountryMetrics)?.radarCoverage ?? 94.1}%
                    </div>
                  </div>
                  <div>
                    <div className="hud-label text-[8px]">THREAT LEVEL</div>
                    <div className="mt-1 text-foreground">
                      {(hoveredCountry ? countryMetrics.get(hoveredCountry) : selectedCountryMetrics)?.threatLevel ?? "LOW"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GlassPanel>

        <GlassPanel hover={false} className="space-y-4">
          <div className="flex items-center gap-2">
            <Crosshair className="size-4 text-radar" />
            <p className="hud-label">Global airspace</p>
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Threat Level</span><span className="font-mono text-warn">HIGH</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Active Tracks</span><span className="font-mono text-radar"><Counter value={detectionTotal} /></span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Critical</span><span className="font-mono text-threat"><Counter value={criticalCount} /></span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Radar Coverage</span><span className="font-mono text-cyan">{coverage.toFixed(1)}%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">AI Confidence</span><span className="font-mono text-radar">97.4%</span></div>
          </div>

          <div className="rounded border border-border bg-background/25 p-3">
            <p className="hud-label mb-3 text-[10px]">Top active regions</p>
            <div className="space-y-2 text-sm">
              {ACTIVE_REGIONS.map((region, index) => (
                <div key={region.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-muted-foreground">{index + 1}.</span>
                    <span>{region.name}</span>
                  </div>
                  <span className="font-mono text-radar">{region.detections}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-border bg-background/25 p-3">
            <p className="hud-label mb-3 text-[10px]">Country intelligence</p>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Country</span>
                <span className="font-semibold text-foreground">{selectedCountry}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Threat Level</span>
                <span className="font-mono text-warn">{selectedCountryMetrics.threatLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Detections</span>
                <span className="font-mono text-radar">{selectedCountryMetrics.activeDetections}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Radar Stations</span>
                <span className="font-mono text-cyan">{selectedCountryMetrics.radarStations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Protected Zones</span>
                <span className="font-mono text-cyan">{selectedCountryMetrics.protectedZones}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Coverage</span>
                <span className="font-mono text-radar">{selectedCountryMetrics.radarCoverage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-mono text-foreground">{selectedCountryMetrics.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="rounded border border-border bg-background/25 p-3">
            <p className="hud-label mb-2 text-[10px]">Legend</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-radar" /> Radar Station</div>
              <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-cyan" /> Protected Zone</div>
              <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-threat" /> Drone Detection</div>
              <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-warn" /> Elevated</div>
              <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-threat" /> High Threat</div>
              <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-red-500" /> Critical Threat</div>
              <div className="flex items-center gap-2"><span className="h-px w-6 bg-cyan" /> Flight Path</div>
              <div className="flex items-center gap-2"><span className="h-px w-6 border border-dashed border-warn" /> Restricted Area</div>
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <GlassPanel hover={false}>
          <div className="flex items-center gap-2"><Layers3 className="size-4 text-radar" /><p className="hud-label">Active detections</p></div>
          <p className="mt-3 text-2xl font-semibold"><Counter value={detectionTotal} /></p>
          <p className="mt-1 text-xs text-muted-foreground">Cross-region surveillance mesh online</p>
        </GlassPanel>
        <GlassPanel hover={false}>
          <div className="flex items-center gap-2"><ShieldAlert className="size-4 text-cyan" /><p className="hud-label">Protected zones</p></div>
          <p className="mt-3 text-2xl font-semibold"><Counter value={protectedTotal} /></p>
          <p className="mt-1 text-xs text-muted-foreground">Airports, military, critical infrastructure</p>
        </GlassPanel>
        <GlassPanel hover={false}>
          <div className="flex items-center gap-2"><RadarIcon className="size-4 text-radar" /><p className="hud-label">Radar coverage</p></div>
          <p className="mt-3 text-2xl font-semibold">{coverage.toFixed(1)}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Planetary mesh status nominal</p>
        </GlassPanel>
      </div>
    </PageShell>
  );
}

export default AirspaceMap;