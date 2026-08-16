import { motion } from "framer-motion";
import { BellRing, CheckCircle2, Clock } from "lucide-react";
import { useMemo, useState } from "react";

import { GlassPanel, PageShell, SectionHeading, StatusDot } from "@/components/shield/primitives";
import { ALERTS, threatBg, type AlertItem } from "@/data/mock";

const SEVERITIES: AlertItem["severity"][] = ["Critical", "High", "Medium", "Low"];

export function AlertCenter() {
  const [filter, setFilter] = useState<AlertItem["severity"] | "All">("All");

  const counts = useMemo(
    () => SEVERITIES.map((s) => ({ s, n: ALERTS.filter((a) => a.severity === s).length })),
    [],
  );
  const list = useMemo(
    () => (filter === "All" ? ALERTS : ALERTS.filter((a) => a.severity === filter)).slice(0, 40),
    [filter],
  );

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 07 · Incident Response"
        title="Alert Center"
        description="Every airspace incident, ranked by severity and routed to the responsible command node."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {counts.map((c, i) => (
          <GlassPanel key={c.s} delay={i * 0.05}>
            <div className="flex items-center justify-between">
              <p className="hud-label">{c.s} Alerts</p>
              <BellRing className="size-4 text-muted-foreground" />
            </div>
            <p
              className={`font-display mt-3 text-3xl font-bold ${
                c.s === "Critical"
                  ? "text-threat"
                  : c.s === "High"
                    ? "text-warn"
                    : c.s === "Medium"
                      ? "text-cyan"
                      : "text-radar"
              }`}
            >
              {c.n}
            </p>
          </GlassPanel>
        ))}
      </div>

      <div className="mt-8 mb-5 flex flex-wrap gap-2">
        {(["All", ...SEVERITIES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
              filter === s
                ? "border-radar/50 bg-radar/15 text-radar"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <StatusDot tone="threat" /> Live incident stream
        </span>
      </div>

      <div className="relative pl-6">
        <div className="absolute top-0 bottom-0 left-2 w-px bg-border" />
        <ul className="space-y-3">
          {list.map((a, i) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.4) }}
              className="relative"
            >
              <span
                className={`absolute top-5 -left-[18px] size-2.5 rounded-full ${
                  a.severity === "Critical"
                    ? "bg-threat"
                    : a.severity === "High"
                      ? "bg-warn"
                      : a.severity === "Medium"
                        ? "bg-cyan"
                        : "bg-radar"
                }`}
              />
              <div className="glass rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] ${threatBg(a.severity)}`}
                  >
                    {a.severity}
                  </span>
                  <h2 className="text-sm font-semibold">{a.title}</h2>
                  <span className="font-mono ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="size-3" /> {a.time}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{a.detail}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {a.id} · {a.zone}
                  </span>
                  <span
                    className={`flex items-center gap-1 font-mono text-[10px] ${
                      a.acknowledged ? "text-radar" : "text-warn"
                    }`}
                  >
                    <CheckCircle2 className="size-3" />
                    {a.acknowledged ? "Acknowledged" : "Awaiting action"}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}

export default AlertCenter;
