import { motion } from "framer-motion";
import { Brain, Cpu, Radar as RadarIcon, Sparkles, TrendingUp } from "lucide-react";

import { Counter, GlassPanel, Meter, PageShell, RadarScope, SectionHeading } from "@/components/shield/primitives";
import { AI_INSIGHTS } from "@/data/mock";

const MODELS = [
  { name: "SkyNet-Forecast v4", role: "Temporal threat prediction", score: 92 },
  { name: "SigniFy-RF", role: "RF signature classification", score: 96 },
  { name: "PatternGrid", role: "Behavioural trajectory clustering", score: 89 },
  { name: "RiskCore", role: "Zone-level risk scoring", score: 85 },
];

export function AIIntelligence() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 06 · Autonomous Analysis"
        title="AI Intelligence Center"
        description="Continuously reasoning over 1,284 sensors to surface intent, not just tracks."
      />

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <GlassPanel hover={false} className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -bottom-24 opacity-40">
            <RadarScope size={360} />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2">
              <Brain className="size-4 text-radar" />
              <p className="hud-label">Intelligence Score</p>
            </div>
            <p className="font-display mt-3 text-6xl font-bold text-radar">
              <Counter value={88} />
              <span className="text-2xl text-muted-foreground">/100</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Composite of model confidence, sensor coverage, data freshness and correlation
              depth across the national airspace mesh.
            </p>
            <div className="mt-6 grid max-w-lg gap-4 sm:grid-cols-3">
              {[
                ["Inference / min", 41280],
                ["Tracks correlated", 9714],
                ["Models online", 12],
              ].map(([l, v]) => (
                <div key={String(l)}>
                  <p className="font-display text-xl font-bold">
                    <Counter value={Number(v)} />
                  </p>
                  <p className="hud-label">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="size-4 text-cyan" />
            <p className="hud-label">Model Fleet</p>
          </div>
          <ul className="space-y-4">
            {MODELS.map((m) => (
              <li key={m.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="font-mono text-xs text-radar">{m.score}%</span>
                </div>
                <p className="mb-1.5 text-xs text-muted-foreground">{m.role}</p>
                <Meter value={m.score} tone={m.score > 90 ? "radar" : "cyan"} />
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {AI_INSIGHTS.map((ins, i) => (
          <motion.article
            key={ins.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -5 }}
            className="glass group relative overflow-hidden rounded-lg p-5"
          >
            <motion.div
              aria-hidden
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
              className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full"
              style={{ background: "var(--gradient-radar)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-radar" />
                  <h2 className="text-base font-semibold">{ins.title}</h2>
                </div>
                <span className="font-mono text-[10px] text-cyan">{ins.confidence}%</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{ins.text}</p>
              <div className="mt-4">
                <Meter value={ins.confidence} tone={ins.confidence > 90 ? "radar" : "cyan"} />
                <p className="hud-label mt-2 flex items-center gap-1.5">
                  <TrendingUp className="size-3" /> Model confidence
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <GlassPanel hover={false} className="mt-4">
        <div className="mb-3 flex items-center gap-2">
          <RadarIcon className="size-4 text-radar" />
          <p className="hud-label">Reasoning Stream</p>
        </div>
        <ul className="font-mono space-y-1.5 text-[11px] text-muted-foreground">
          {[
            "[T-00:02] Correlating 41 RF emitters against national UTM registry…",
            "[T-00:07] Cluster C-19 flagged: 3 tracks, identical launch geometry.",
            "[T-00:14] Zone Delta risk recomputed → 0.74 (was 0.61).",
            "[T-00:22] Counter-UAS readiness verified at 4/6 metro nodes.",
            "[T-00:31] Forecast horizon extended to 48h with 92% confidence.",
          ].map((line) => (
            <li key={line}>
              <span className="mr-2 text-radar">›</span>
              {line}
            </li>
          ))}
        </ul>
      </GlassPanel>
    </PageShell>
  );
}

export default AIIntelligence;
