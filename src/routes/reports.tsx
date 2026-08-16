import { Download, FileText, Lock } from "lucide-react";
import { useState } from "react";

import { GlassPanel, PageShell, SectionHeading } from "@/components/shield/primitives";
import { REPORTS } from "@/data/mock";

const CATEGORIES = [
  "All",
  "Daily Reports",
  "Weekly Reports",
  "Monthly Reports",
  "Threat Summaries",
  "Airspace Activity Reports",
];

export function ReportsCenter() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? REPORTS : REPORTS.filter((r) => r.category === cat);

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 08 · Documentation"
        title="Reports Center"
        description="Auto-generated, classification-tagged intelligence products for command review and inter-agency distribution."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
              cat === c
                ? "border-radar/50 bg-radar/15 text-radar"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((r, i) => (
          <GlassPanel key={r.id} delay={i * 0.04}>
            <div className="flex items-start justify-between">
              <FileText className="size-5 text-radar" />
              <span className="flex items-center gap-1 rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                <Lock className="size-3" />
                {r.classification}
              </span>
            </div>
            <h2 className="mt-4 text-base font-semibold">{r.title}</h2>
            <p className="hud-label mt-1">{r.category}</p>
            <p className="font-mono mt-3 text-[11px] text-muted-foreground">
              {r.id} · {r.date} · {r.pages} pages · {r.size}
            </p>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-radar/40 bg-radar/10 py-2 text-xs font-medium text-radar transition-colors hover:bg-radar/20">
              <Download className="size-3.5" /> Download PDF
            </button>
          </GlassPanel>
        ))}
      </div>
    </PageShell>
  );
}