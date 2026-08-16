import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  delay = 0,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4 } : {}}
      className={cn("glass relative rounded-lg p-5", className)}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <p className="hud-label text-radar">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1600,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function RadarScope({ className, size = 320 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn("relative aspect-square", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full border border-radar/25" />
      <div className="absolute inset-[12%] rounded-full border border-radar/20" />
      <div className="absolute inset-[26%] rounded-full border border-radar/15" />
      <div className="absolute inset-[40%] rounded-full border border-radar/10" />
      <div className="absolute top-1/2 right-0 left-0 h-px bg-radar/15" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-radar/15" />
      <div
        className="animate-radar-sweep absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, color-mix(in oklab, var(--radar) 40%, transparent), transparent 28%)",
          maskImage: "radial-gradient(circle, black 60%, transparent 71%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-radar)" }} />
      {[
        [30, 38],
        [64, 28],
        [72, 66],
        [40, 74],
        [55, 50],
      ].map(([x, y], i) => (
        <span
          key={i}
          className="absolute size-1.5 rounded-full bg-radar"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span
            className="animate-ping-ring absolute inset-0 rounded-full bg-radar/60"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        </span>
      ))}
    </div>
  );
}

export function StatusDot({ tone = "radar" }: { tone?: "radar" | "warn" | "threat" | "cyan" }) {
  const map = {
    radar: "bg-radar",
    warn: "bg-warn",
    threat: "bg-threat",
    cyan: "bg-cyan",
  } as const;
  return (
    <span className={cn("relative inline-flex size-2 rounded-full", map[tone])}>
      <span className={cn("animate-ping-ring absolute inset-0 rounded-full", map[tone])} />
    </span>
  );
}

export function Meter({
  value,
  tone = "radar",
}: {
  value: number;
  tone?: "radar" | "warn" | "threat" | "cyan";
}) {
  const map = {
    radar: "bg-radar",
    warn: "bg-warn",
    threat: "bg-threat",
    cyan: "bg-cyan",
  } as const;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className={cn("h-full rounded-full", map[tone])}
      />
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14"
    >
      {children}
    </motion.main>
  );
}