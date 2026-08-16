import { Navigate, Route, Routes } from "react-router-dom";

import { About } from "./routes/about";
import { AIIntelligence } from "./routes/ai-intelligence";
import { AirspaceMap } from "./routes/airspace-map";
import { AlertCenter } from "./routes/alerts";
import { Analytics } from "./routes/analytics";
import { CommandCenter } from "./routes/index";
import { LiveDetections } from "./routes/detections";
import { DroneDatabase } from "./routes/drone-database";
import { ReportsCenter } from "./routes/reports";
import { SiteFooter } from "./components/shield/site-footer";
import { SiteHeader } from "./components/shield/site-header";
import { CommandPalette } from "./components/shield/command-palette";
import { FloatingActions } from "./components/shield/back-to-top";
import { useEffect, useState } from "react";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader onOpenPalette={() => setPaletteOpen(true)} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/detections" element={<LiveDetections />} />
            <Route path="/airspace" element={<AirspaceMap />} />
            <Route path="/airspace-map" element={<Navigate to="/airspace" replace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/drones" element={<DroneDatabase />} />
            <Route path="/drone-database" element={<Navigate to="/drones" replace />} />
            <Route path="/intelligence" element={<AIIntelligence />} />
            <Route path="/ai-intelligence" element={<Navigate to="/intelligence" replace />} />
            <Route path="/alerts" element={<AlertCenter />} />
            <Route path="/reports" element={<ReportsCenter />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <SiteFooter />
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <FloatingActions />
    </>
  );
}
