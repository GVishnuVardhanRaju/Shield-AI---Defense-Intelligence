import { Radar } from "lucide-react";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Command Center", to: "/" },
      { label: "Live Detections", to: "/detections" },
      { label: "Airspace Map", to: "/airspace" },
      { label: "Threat Analytics", to: "/analytics" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Drone Database", to: "/drones" },
      { label: "AI Intelligence", to: "/intelligence" },
      { label: "Alert Center", to: "/alerts" },
      { label: "Reports", to: "/reports" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-background/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-5 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-md border border-radar/40 bg-radar/10">
              <Radar className="size-5 text-radar" />
            </span>
            <span className="font-display text-lg font-bold tracking-wide">
              SHIELD <span className="text-radar">AI</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            National-scale drone detection, airspace monitoring and threat intelligence for
            defense organizations, border security agencies, airports and smart city command
            centers across India.
          </p>
          <p className="hud-label mt-5">Sovereign deployment · Air-gapped capable</p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="hud-label text-radar">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-radar"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="hud-label text-radar">Documentation & Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-radar">
                About the Platform
              </Link>
            </li>
            <li>Integration Guide</li>
            <li>Sensor API Reference</li>
            <li>ops@shield.ai</li>
            <li>+91 11 4000 8800</li>
          </ul>
          <p className="hud-label mt-5">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Terms of Engagement</li>
            <li>Data Protection Policy</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 Shield AI Defense Intelligence Platform. All rights reserved.</p>
          <p>
            Built by <span className="text-radar">G Vishnu Vardhan Raju</span>
          </p>
        </div>
      </div>
    </footer>
  );
}