import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Plus, Radio, FileDown, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="glass flex flex-col gap-1 rounded-lg p-2"
          >
            <Link
              to="/alerts"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-xs hover:bg-radar/10"
            >
              <ShieldAlert className="size-4 text-threat" /> Raise Alert
            </Link>
            <Link
              to="/detections"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-xs hover:bg-radar/10"
            >
              <Radio className="size-4 text-cyan" /> Live Feed
            </Link>
            <Link
              to="/reports"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-xs hover:bg-radar/10"
            >
              <FileDown className="size-4 text-radar" /> Export Report
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {show ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass grid size-10 place-items-center rounded-full"
          >
            <ArrowUp className="size-4 text-radar" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        aria-label="Quick actions"
        onClick={() => setOpen((v) => !v)}
        className="grid size-12 place-items-center rounded-full border border-radar/50 bg-radar/20 text-radar shadow-[var(--shadow-hud)] backdrop-blur-md"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }}>
          <Plus className="size-5" />
        </motion.span>
      </motion.button>
    </div>
  );
}