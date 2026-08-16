import { Building2, Globe2, Layers, Lock, Radar as RadarIcon, Users } from "lucide-react";

import { Counter, GlassPanel, PageShell, SectionHeading } from "@/components/shield/primitives";

const SECTORS = [
  { icon: Building2, title: "Defense Organizations", text: "Theatre-level airspace picture with counter-UAS coordination." },
  { icon: Globe2, title: "Border Security", text: "Persistent surveillance over high-risk frontier corridors." },
  { icon: RadarIcon, title: "Airports", text: "Approach-corridor protection integrated with ATC workflows." },
  { icon: Layers, title: "Critical Infrastructure", text: "Refineries, grids, ports and nuclear sites under continuous watch." },
  { icon: Users, title: "Smart City Command", text: "Urban airspace governance for events and public safety." },
  { icon: Lock, title: "Sovereign Deployment", text: "On-premise, air-gapped capable, full data residency in India." },
];

const STACK = [
  ["Sensing", "RF spectrum, pulse-Doppler radar, EO/IR and acoustic arrays"],
  ["Fusion", "Multi-hypothesis tracking with sub-second correlation"],
  ["Intelligence", "Predictive threat models, behavioural clustering, risk scoring"],
  ["Response", "Alert routing, counter-UAS tasking, audit-grade reporting"],
];

export function About() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 09 · Platform"
        title="About Shield AI"
        description="A sovereign drone defense intelligence platform engineered for national-scale airspace protection."
      />

      <GlassPanel hover={false} className="mb-4">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Unmanned systems have collapsed the cost of aerial intrusion. Shield AI restores the
          advantage to defenders by fusing every available sensor into a single, continuously
          reasoned picture of the sky — from a 249g consumer quadcopter over a metro stadium to a
          long-endurance fixed-wing platform loitering along a border sector.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-4">
          {[
            ["Sensors deployed", 1284],
            ["Protected zones", 42],
            ["Command centers", 15],
            ["Detection accuracy", 98.7],
          ].map(([l, v], i) => (
            <div key={String(l)}>
              <p className="font-display text-3xl font-bold text-radar">
                <Counter value={Number(v)} decimals={i === 3 ? 1 : 0} suffix={i === 3 ? "%" : ""} />
              </p>
              <p className="hud-label mt-1">{l}</p>
            </div>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SECTORS.map((s, i) => (
          <GlassPanel key={s.title} delay={i * 0.05}>
            <s.icon className="size-5 text-radar" />
            <h2 className="mt-4 text-base font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel hover={false} className="mt-4">
        <p className="hud-label mb-4">Platform Architecture</p>
        <ol className="grid gap-4 md:grid-cols-4">
          {STACK.map(([k, v], i) => (
            <li key={k} className="rounded-md border border-border/70 p-4">
              <span className="font-mono text-[10px] text-radar">0{i + 1}</span>
              <p className="mt-1 font-semibold">{k}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{v}</p>
            </li>
          ))}
        </ol>
      </GlassPanel>

      <GlassPanel hover={false} className="mt-4 text-center">
        <p className="hud-label">Engineering</p>
        <p className="mt-2 text-lg font-semibold">
          Built by <span className="text-radar">G Vishnu Vardhan Raju</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Shield AI Defense Intelligence Platform · Designed and developed in India
        </p>
      </GlassPanel>
    </PageShell>
  );
}

export default About;
