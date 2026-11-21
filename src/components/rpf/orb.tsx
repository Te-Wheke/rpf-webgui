import { useId } from "react";
import type { ClaimState } from "@/rpf/types";

const TONE: Record<ClaimState | "idle", { core: string; ring: string }> = {
  idle: { core: "var(--color-violet)", ring: "var(--color-gold)" },
  PROPOSED: { core: "var(--color-violet)", ring: "var(--color-gold)" },
  SUPPORTED: { core: "var(--color-cyan)", ring: "var(--color-gold)" },
  REASONED: { core: "var(--color-violet)", ring: "var(--color-cyan)" },
  DEMONSTRATED: { core: "var(--color-green)", ring: "var(--color-cyan)" },
  UNRESOLVED: { core: "var(--color-amber)", ring: "var(--color-red)" },
};

export function SentinelOrb({
  state,
  reduceMotion,
  className,
}: {
  state: ClaimState | "idle";
  reduceMotion: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const tone = TONE[state];
  const spin = reduceMotion ? "" : "rpf-spin";
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={tone.ring} stopOpacity="0.45" />
          <stop offset="100%" stopColor={tone.ring} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-body`} cx="36%" cy="32%" r="68%">
          <stop offset="0%" stopColor="var(--color-fg)" />
          <stop offset="20%" stopColor={tone.ring} />
          <stop offset="72%" stopColor={tone.core} />
          <stop offset="100%" stopColor="var(--color-bg)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${uid}-glow)`} />
      <g className={spin}>
        <ellipse cx="50" cy="50" rx="40" ry="13" fill="none" stroke={tone.ring} strokeWidth="1.2" />
      </g>
      <g className={spin ? "rpf-spin rpf-spin-rev" : ""}>
        <ellipse cx="50" cy="50" rx="33" ry="16" fill="none" stroke={tone.core} strokeWidth="1.1" transform="rotate(58 50 50)" />
      </g>
      <circle cx="50" cy="50" r="22" fill={`url(#${uid}-body)`} />
      <ellipse cx="43" cy="43" rx="6" ry="3" fill="var(--color-fg)" opacity="0.35" transform="rotate(-28 43 43)" />
    </svg>
  );
}
