import { motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { GlassPanel, SectionHeading, StatusDot, PageShell } from "@/components/shield/primitives";
import { DETECTIONS, THREAT_LEVELS, threatBg, type ThreatLevel } from "@/data/mock";

const STATUSES = ["Tracking", "Identified", "Investigating", "Alert"] as const;

export function LiveDetections() {
  const [query, setQuery] = useState("");
  const [threat, setThreat] = useState<ThreatLevel | "All">("All");
  const [status, setStatus] = useState<string>("All");
  const [sort, setSort] = useState("recent");

  const rows = useMemo(() => {
    let list = DETECTIONS.filter((d) => {
      const q = query.trim().toLowerCase();
      const match =
        !q ||
        d.model.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q);
      return (
        match && (threat === "All" || d.threat === threat) && (status === "All" || d.status === status)
      );
    });
    list = [...list].sort((a, b) => {
      if (sort === "altitude") return b.altitude - a.altitude;
      if (sort === "speed") return b.speed - a.speed;
      if (sort === "threat")
        return THREAT_LEVELS.indexOf(b.threat) - THREAT_LEVELS.indexOf(a.threat);
      return a.timestamp - b.timestamp;
    });
    return list;
  }, [query, threat, status, sort]);

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 02 · Real-Time Operations"
        title="Live Detection Feed"
        description="Every track fused from RF, radar and EO/IR sensors across the national mesh. Filter, sort and triage in real time."
      />

      <GlassPanel hover={false} className="mb-6">
        <div className="grid gap-3 md:grid-cols-[1.4fr_repeat(3,0.8fr)]">
          <label className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search track ID, model or sector…"
              className="w-full rounded-md border border-border bg-secondary/40 py-2.5 pr-3 pl-9 text-sm outline-none focus:border-radar/60"
            />
          </label>
          <select
            value={threat}
            onChange={(e) => setThreat(e.target.value as ThreatLevel | "All")}
            className="rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-sm outline-none focus:border-radar/60"
          >
            <option value="All">All threat levels</option>
            {THREAT_LEVELS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-sm outline-none focus:border-radar/60"
          >
            <option value="All">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-sm outline-none focus:border-radar/60"
          >
            <option value="recent">Sort: Most recent</option>
            <option value="threat">Sort: Threat level</option>
            <option value="altitude">Sort: Altitude</option>
            <option value="speed">Sort: Speed</option>
          </select>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <StatusDot /> {rows.length} tracks in view
          </span>
          <span className="flex items-center gap-1.5">
            <Filter className="size-3.5" /> Sensor fusion active
          </span>
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="size-3.5" /> Auto-refresh 2s
          </span>
        </div>
      </GlassPanel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.slice(0, 60).map((d, i) => (
          <motion.article
            key={d.id}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.4) }}
            whileHover={{ y: -4 }}
            className="glass rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">{d.model}</h3>
                <p className="font-mono text-[11px] text-muted-foreground">{d.id}</p>
              </div>
              <span className={`rounded border px-2 py-0.5 font-mono text-[10px] ${threatBg(d.threat)}`}>
                {d.threat}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
              <div>
                <dt className="hud-label">Altitude</dt>
                <dd className="font-mono">{d.altitude.toLocaleString("en-IN")} m</dd>
              </div>
              <div>
                <dt className="hud-label">Speed</dt>
                <dd className="font-mono">{d.speed} km/h</dd>
              </div>
              <div>
                <dt className="hud-label">Detected</dt>
                <dd className="font-mono">{d.time}</dd>
              </div>
              <div>
                <dt className="hud-label">Signal</dt>
                <dd className="font-mono">{d.signal}%</dd>
              </div>
            </dl>

            <p className="mt-3 text-xs text-muted-foreground">{d.location}</p>

            <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
              <span className="font-mono text-[10px] text-muted-foreground">
                Operator: {d.operatorTrace}
              </span>
              <span
                className={`rounded px-2 py-0.5 font-mono text-[10px] ${
                  d.status === "Alert"
                    ? "bg-threat/15 text-threat"
                    : d.status === "Investigating"
                      ? "bg-warn/15 text-warn"
                      : d.status === "Identified"
                        ? "bg-radar/15 text-radar"
                        : "bg-cyan/15 text-cyan"
                }`}
              >
                {d.status}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {rows.length === 0 ? (
        <GlassPanel hover={false} className="text-center text-sm text-muted-foreground">
          No tracks match the current filter set.
        </GlassPanel>
      ) : null}
    </PageShell>
  );
}