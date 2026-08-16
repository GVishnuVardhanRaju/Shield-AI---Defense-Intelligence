import { COUNTRY_SHAPES } from "@/data/country-shapes";

export function GeoLayer({ country }: { country: string }) {
  const d = COUNTRY_SHAPES[country];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-[1] size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="geo-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--radar)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.1" />
        </linearGradient>
        <filter id="geo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={d}
        fill="url(#geo-fill)"
        stroke="var(--radar)"
        strokeWidth={0.45}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        filter="url(#geo-glow)"
      />
    </svg>
  );
}