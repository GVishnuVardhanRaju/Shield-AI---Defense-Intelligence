import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Gauge,
  Radar as RadarIcon,
  Radio,
  ShieldCheck,
  Signal,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Counter, GlassPanel, Meter, RadarScope, StatusDot } from "@/components/shield/primitives";
import { ALERTS, DAILY_DETECTIONS, DETECTIONS, TICKER, ZONES, threatBg } from "@/data/mock";

const STATS = [
  { label: "Active Sensors", value: 1284, icon: Signal },
  { label: "Detection Accuracy", value: 98.7, suffix: "%", decimals: 1, icon: Target },
  { label: "Drones Tracked Today", value: 247, icon: RadarIcon },
  { label: "Protected Zones", value: 42, icon: ShieldCheck },
  { label: "Command Centers", value: 15, icon: Cpu },
  { label: "Monitoring", value: 24, suffix: "/7", icon: Activity },
];

const WIDGETS = [
  { label: "Airspace Threat Level", value: "HIGH", tone: "warn", meter: 72, note: "Northern sector elevated" },
  { label: "Active Detections", value: "38", tone: "cyan", meter: 61, note: "12 unresolved operators" },
  { label: "Critical Alerts", value: "6", tone: "threat", meter: 24, note: "2 awaiting acknowledgement" },
  { label: "Protected Zones", value: "42", tone: "radar", meter: 88, note: "40 secure · 2 elevated" },
  { label: "Drone Activity Index", value: "7.4", tone: "warn", meter: 74, note: "+18% vs yesterday" },
  { label: "System Health", value: "99.2%", tone: "radar", meter: 99, note: "All mesh nodes online" },
] as const;

const DASH_WIDGETS = [
  { label: "Airspace Threat Index", value: 74, unit: "/100", tone: "warn" },
  { label: "Radar Coverage", value: 91, unit: "%", tone: "radar" },
  { label: "Drone Activity Tracker", value: 247, unit: " tracks", tone: "cyan" },
  { label: "Active Surveillance Feed", value: 38, unit: " live", tone: "cyan" },
  { label: "Alert Summary", value: 500, unit: " logged", tone: "threat" },
  { label: "Restricted Zone Status", value: 96, unit: "% secure", tone: "radar" },
  { label: "Intelligence Score", value: 88, unit: "/100", tone: "radar" },
  { label: "Detection Accuracy Meter", value: 98.7, unit: "%", tone: "radar" },
] as const;

const toneText = {
  radar: "text-radar",
  warn: "text-warn",
  threat: "text-threat",
  cyan: "text-cyan",
} as const;

export function CommandCenter() {
  const feed = DETECTIONS.slice(0, 5);
  const criticalAlerts = ALERTS.filter((a) => a.severity === "Critical").slice(0, 4);
  const breachZones = ZONES.filter((z) => z.status !== "Secure").slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <RadarScope size={900} />
          </div>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-radar/40 bg-radar/10 px-3 py-1.5"
            >
              <StatusDot />
              <span className="font-mono text-[10px] tracking-[0.2em] text-radar">
                NATIONAL AIRSPACE MESH · INDIA · OPERATIONAL
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl"
            >
              Protecting Airspace Through{" "}
              <span className="glow-radar text-radar">Intelligent Surveillance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              Real-time drone monitoring, threat analysis, airspace intelligence, and
              AI-powered situational awareness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/detections"
                className="rounded-md bg-radar px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Enter Live Operations
              </Link>
              <Link
                to="/airspace"
                className="rounded-md border border-radar/40 px-5 py-3 text-sm font-semibold text-radar transition-colors hover:bg-radar/10"
              >
                Open Airspace Map
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {STATS.map((s, i) => (
                <GlassPanel key={s.label} delay={i * 0.05} className="p-4">
                  <s.icon className="size-4 text-radar" />
                  <p className="font-display mt-3 text-2xl font-bold">
                    <Counter
                      value={s.value}
                      decimals={s.decimals ?? 0}
                      suffix={s.suffix ?? ""}
                    />
                  </p>
                  <p className="hud-label mt-1">{s.label}</p>
                </GlassPanel>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative mx-auto grid place-items-center">
                <RadarScope size={420} />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="glass absolute -top-2 -left-6 w-52 rounded-lg p-3"
                >
                  <p className="hud-label">Track SKY-4821</p>
                  <p className="mt-1 text-sm font-semibold text-threat">Unknown UAV</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    ALT 1,240m · 118 km/h
                  </p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  className="glass absolute -right-4 bottom-4 w-56 rounded-lg p-3"
                >
                  <p className="hud-label">Sensor Fusion</p>
                  <p className="mt-1 text-sm font-semibold text-radar">RF + Radar + EO/IR</p>
                  <Meter value={94} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="relative overflow-hidden border-t border-border bg-background/70 py-2.5">
          <div className="animate-ticker flex w-max gap-10 whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="font-mono text-[11px] text-muted-foreground">
                <span className="mr-2 text-radar">▮</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        {/* Widgets */}
        <p className="hud-label text-radar">Command Center · Operational Snapshot</p>
        <h2 className="mt-2 mb-6 text-2xl font-bold md:text-3xl">Live situational overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WIDGETS.map((w, i) => (
            <GlassPanel key={w.label} delay={i * 0.05}>
              <div className="flex items-start justify-between">
                <p className="hud-label">{w.label}</p>
                <Gauge className={`size-4 ${toneText[w.tone]}`} />
              </div>
              <p className={`font-display mt-3 text-3xl font-bold ${toneText[w.tone]}`}>
                {w.value}
              </p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">{w.note}</p>
              <Meter value={w.meter} tone={w.tone} />
            </GlassPanel>
          ))}
        </div>

        {/* Chart + feed */}
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <GlassPanel>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="hud-label">24h Detection Volume</p>
                <p className="mt-1 text-lg font-semibold">National airspace throughput</p>
              </div>
              <Radio className="size-4 text-cyan" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DAILY_DETECTIONS}>
                  <defs>
                    <linearGradient id="cc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--radar)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--radar)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={10} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="detections"
                    stroke="var(--radar)"
                    fill="url(#cc)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel>
            <p className="hud-label mb-3">Active Surveillance Feed</p>
            <ul className="space-y-2.5">
              {feed.map((d) => (
                <li
                  key={d.id}
                  className="rounded-md border border-border/70 p-3 transition-colors hover:border-radar/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{d.model}</span>
                    <span
                      className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${threatBg(d.threat)}`}
                    >
                      {d.threat}
                    </span>
                  </div>
                  <p className="font-mono mt-1 text-[11px] text-muted-foreground">
                    {d.id} · {d.location}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    ALT {d.altitude}m · {d.speed} km/h · {d.status}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              to="/detections"
              className="mt-4 block rounded-md bg-radar/15 py-2 text-center text-xs font-medium text-radar"
            >
              View all detections
            </Link>
          </GlassPanel>
        </div>

        {/* Dashboard widgets grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASH_WIDGETS.map((w, i) => (
            <GlassPanel key={w.label} delay={i * 0.04} className="p-4">
              <p className="hud-label">{w.label}</p>
              <p className={`font-display mt-2 text-2xl font-bold ${toneText[w.tone]}`}>
                <Counter value={w.value} decimals={w.value % 1 ? 1 : 0} />
                <span className="text-sm text-muted-foreground">{w.unit}</span>
              </p>
            </GlassPanel>
          ))}
        </div>

        {/* Alerts + zones */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <GlassPanel>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="size-4 text-threat" />
              <p className="hud-label">Critical Alert Summary</p>
            </div>
            <ul className="space-y-2">
              {criticalAlerts.map((a) => (
                <li key={a.id} className="rounded-md border border-threat/30 bg-threat/8 p-3">
                  <p className="text-sm font-semibold text-threat">{a.title}</p>
                  <p className="font-mono mt-1 text-[11px] text-muted-foreground">
                    {a.id} · {a.zone} · {a.time}
                  </p>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel>
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="size-4 text-radar" />
              <p className="hud-label">Restricted Zone Status</p>
            </div>
            <ul className="space-y-2">
              {breachZones.map((z) => (
                <li
                  key={z.id}
                  className="flex items-center justify-between rounded-md border border-border/70 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{z.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {z.id} · {z.type} · {z.radiusKm} km
                    </p>
                  </div>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] ${
                      z.status === "Breach"
                        ? "border-threat/40 bg-threat/15 text-threat"
                        : "border-warn/40 bg-warn/15 text-warn"
                    }`}
                  >
                    {z.status}
                  </span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
