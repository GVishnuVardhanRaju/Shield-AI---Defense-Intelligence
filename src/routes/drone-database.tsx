import { motion } from "framer-motion";
import { Check, GitCompareArrows, Plus } from "lucide-react";
import { useState } from "react";

import mavic from "@/assets/drone-mavic.jpg";
import mini from "@/assets/drone-mini.jpg";
import fpv from "@/assets/drone-fpv.jpg";
import recon from "@/assets/drone-recon.jpg";
import fixed from "@/assets/drone-fixed.jpg";
import surveil from "@/assets/drone-surveil.jpg";
import { GlassPanel, PageShell, SectionHeading } from "@/components/shield/primitives";
import { DRONE_PROFILES, threatBg } from "@/data/mock";

const IMAGES: Record<string, string> = {
  mavic,
  mini,
  fpv,
  recon,
  fixed,
  surveil,
};

export function DroneDatabase() {
  const [compare, setCompare] = useState<string[]>([]);
  const selected = DRONE_PROFILES.filter((p) => compare.includes(p.id));

  const toggle = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id].slice(-3)));

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 05 · Signature Library"
        title="Drone Database"
        description="Classification reference for every platform the mesh is trained to recognise. Select up to three airframes to run comparison mode."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DRONE_PROFILES.map((p, i) => (
          <GlassPanel key={p.id} delay={i * 0.05} className="overflow-hidden p-0">
            <div className="relative h-44 overflow-hidden border-b border-border">
              <img
                src={IMAGES[p.image]}
                alt={`${p.name} — ${p.type}`}
                loading="lazy"
                width={768}
                height={512}
                className="size-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 rounded border px-2 py-0.5 font-mono text-[10px] ${threatBg(p.threat)}`}
              >
                {p.threat}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="hud-label mt-0.5">{p.type}</p>

              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                {[
                  ["Range", p.range],
                  ["Max Speed", p.speed],
                  ["Ceiling", p.altitude],
                  ["Endurance", p.battery],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="hud-label">{k}</dt>
                    <dd className="font-mono">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="font-mono mt-3 text-[11px] text-muted-foreground">{p.signature}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.applications.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <button
                onClick={() => toggle(p.id)}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md border py-2 text-xs font-medium transition-colors ${
                  compare.includes(p.id)
                    ? "border-radar/50 bg-radar/15 text-radar"
                    : "border-border text-muted-foreground hover:border-radar/40 hover:text-radar"
                }`}
              >
                {compare.includes(p.id) ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
                {compare.includes(p.id) ? "In comparison" : "Add to compare"}
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>

      {selected.length > 1 ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <div className="glass overflow-x-auto rounded-lg p-5">
            <div className="mb-4 flex items-center gap-2">
              <GitCompareArrows className="size-4 text-radar" />
              <p className="hud-label">Comparison Mode · {selected.length} platforms</p>
            </div>
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="hud-label py-2 text-left">Attribute</th>
                  {selected.map((s) => (
                    <th key={s.id} className="py-2 text-left font-semibold">
                      {s.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {(
                  [
                    ["Type", "type"],
                    ["Range", "range"],
                    ["Speed", "speed"],
                    ["Altitude", "altitude"],
                    ["Endurance", "battery"],
                    ["Signature", "signature"],
                    ["Threat", "threat"],
                  ] as const
                ).map(([label, key]) => (
                  <tr key={key} className="border-b border-border/60">
                    <td className="py-2.5 text-muted-foreground">{label}</td>
                    {selected.map((s) => (
                      <td key={s.id} className="py-2.5">
                        {String(s[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : null}
    </PageShell>
  );
}