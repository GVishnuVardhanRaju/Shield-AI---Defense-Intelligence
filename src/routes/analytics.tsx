import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { GlassPanel, PageShell, SectionHeading } from "@/components/shield/primitives";
import {
  ALTITUDE_BANDS,
  DAILY_DETECTIONS,
  DRONE_TYPE_SPLIT,
  HEATMAP,
  MONTHLY_TRENDS,
  SUCCESS_RATE,
  THREAT_CATEGORIES,
} from "@/data/mock";

const AXIS = { stroke: "var(--muted-foreground)", fontSize: 10 };
const TIP = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  },
};
const PIE_COLORS = ["var(--radar)", "var(--cyan)", "var(--warn)", "var(--threat)", "var(--olive)"];

export function Analytics() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Module 04 · Intelligence Analytics"
        title="Threat Analytics"
        description="Longitudinal analysis of detection volume, threat composition and counter-UAS effectiveness across the national grid."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassPanel>
          <p className="hud-label mb-4">Daily Detections · 24h</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_DETECTIONS}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--radar)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--radar)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" {...AXIS} />
                <YAxis {...AXIS} />
                <Tooltip {...TIP} />
                <Area dataKey="detections" stroke="var(--radar)" fill="url(#g1)" strokeWidth={2} />
                <Area dataKey="critical" stroke="var(--threat)" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="hud-label mb-4">Monthly Threat Trends · 12 months</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TRENDS}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" {...AXIS} />
                <YAxis {...AXIS} />
                <Tooltip {...TIP} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="detections" stroke="var(--cyan)" strokeWidth={2} dot={false} />
                <Line dataKey="threats" stroke="var(--warn)" strokeWidth={2} dot={false} />
                <Line dataKey="intercepts" stroke="var(--radar)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="hud-label mb-4">Threat Categories</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={THREAT_CATEGORIES}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {THREAT_CATEGORIES.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...TIP} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="hud-label mb-4">Drone Types Observed</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DRONE_TYPE_SPLIT}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" {...AXIS} />
                <YAxis {...AXIS} />
                <Tooltip {...TIP} cursor={{ fill: "var(--secondary)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {DRONE_TYPE_SPLIT.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="hud-label mb-4">Flight Altitude Distribution</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ALTITUDE_BANDS} layout="vertical">
                <CartesianGrid stroke="var(--border)" horizontal={false} />
                <XAxis type="number" {...AXIS} />
                <YAxis type="category" dataKey="band" width={70} {...AXIS} />
                <Tooltip {...TIP} cursor={{ fill: "var(--secondary)" }} />
                <Bar dataKey="flights" fill="var(--cyan)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="hud-label mb-4">Detection Success Rate</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUCCESS_RATE}>
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" {...AXIS} />
                <YAxis domain={[92, 100]} {...AXIS} />
                <Tooltip {...TIP} />
                <Area dataKey="accuracy" stroke="var(--cyan)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-4" hover={false}>
        <p className="hud-label mb-4">Activity Heatmap · Weekday × Time Slot</p>
        <div className="overflow-x-auto">
          <div className="min-w-[640px] space-y-1">
            {HEATMAP.map((row, r) => (
              <div key={r} className="flex items-center gap-1">
                <span className="font-mono w-10 text-[10px] text-muted-foreground">
                  {row[0]?.day}
                </span>
                {row.map((cell, c) => (
                  <div
                    key={c}
                    title={`${cell.day} ${cell.slot} · ${cell.value} detections`}
                    className="h-7 flex-1 rounded-sm"
                    style={{
                      background: `color-mix(in oklab, var(--radar) ${cell.value}%, transparent)`,
                    }}
                  />
                ))}
              </div>
            ))}
            <div className="flex gap-1 pl-11">
              {HEATMAP[0]?.map((c, i) => (
                <span key={i} className="font-mono flex-1 text-center text-[9px] text-muted-foreground">
                  {c.slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </PageShell>
  );
}

export default Analytics;
