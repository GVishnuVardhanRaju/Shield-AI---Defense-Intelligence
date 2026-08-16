import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, Radar, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { ALERTS } from "@/data/mock";
import { cn } from "@/lib/utils";

import { NAV_LINKS } from "./nav-links";
import { StatusDot } from "./primitives";

export function SiteHeader({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState(false);
  const pathname = useLocation().pathname;

  useEffect(() => {
    setOpen(false);
    setNotif(false);
  }, [pathname]);

  const recent = ALERTS.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="relative grid size-9 place-items-center rounded-md border border-radar/40 bg-radar/10">
            <Radar className="size-5 text-radar" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-lg font-bold tracking-wide">
              SHIELD <span className="text-radar">AI</span>
            </span>
            <span className="hud-label">Defense Intelligence</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-radar/10 hover:text-radar",
                  isActive && "bg-radar/12 text-radar",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-radar/50 hover:text-radar md:flex"
          >
            <Search className="size-3.5" />
            Global search
            <kbd className="font-mono rounded border border-border px-1 py-0.5 text-[10px]">
              Ctrl K
            </kbd>
          </button>

          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => setNotif((v) => !v)}
              className="relative grid size-9 place-items-center rounded-md border border-border transition-colors hover:border-radar/50"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-threat" />
            </button>
            <AnimatePresence>
              {notif ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="glass absolute right-0 mt-2 w-80 rounded-lg p-3"
                >
                  <p className="hud-label mb-2">Notification Center</p>
                  <ul className="space-y-2">
                    {recent.map((a) => (
                      <li key={a.id} className="rounded-md border border-border/60 p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {a.id}
                          </span>
                          <span className="font-mono text-[10px]">{a.severity}</span>
                        </div>
                        <p className="mt-1 text-xs">{a.title}</p>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/alerts"
                    className="mt-3 block rounded-md bg-radar/15 py-2 text-center text-xs font-medium text-radar"
                  >
                    Open Alert Center
                  </Link>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="hidden items-center gap-2 rounded-md border border-radar/30 bg-radar/8 px-2.5 py-1.5 lg:flex">
            <StatusDot />
            <span className="font-mono text-[10px] tracking-widest text-radar">LIVE</span>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid size-9 place-items-center rounded-md border border-border xl:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="glass fixed top-0 right-0 z-50 h-dvh w-80 max-w-[85vw] overflow-y-auto rounded-none p-5 xl:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="hud-label text-radar">Navigation</span>
                <button aria-label="Close menu" onClick={() => setOpen(false)}>
                  <X className="size-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-md border border-transparent px-3 py-3 text-sm font-medium text-muted-foreground",
                          isActive && "border-radar/40 bg-radar/10 text-radar",
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}