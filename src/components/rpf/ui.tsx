import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ClaimState, StageStatus } from "@/rpf/types";

const STATE_LABEL: Record<ClaimState, string> = {
  DEMONSTRATED: "Demonstrated",
  SUPPORTED: "Supported",
  REASONED: "Reasoned",
  PROPOSED: "Proposed",
  UNRESOLVED: "Unresolved",
};

const STATE_CLASS: Record<ClaimState, string> = {
  DEMONSTRATED: "border-green/40 bg-green/10 text-green",
  SUPPORTED: "border-cyan/40 bg-cyan/10 text-cyan",
  REASONED: "border-violet/40 bg-violet/10 text-violet",
  PROPOSED: "border-gold/40 bg-gold/10 text-gold",
  UNRESOLVED: "border-amber/40 bg-amber/10 text-amber",
};

export function stateLabel(state: ClaimState) {
  return STATE_LABEL[state];
}

export function StateBadge({ state }: { state: ClaimState }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-md border px-2 font-mono text-xs ${STATE_CLASS[state]}`}>
      {STATE_LABEL[state]}
    </span>
  );
}

export function stageLabel(status: StageStatus) {
  if (status === "defined") return "Defined";
  if (status === "justified") return "Recorded";
  return "Unresolved";
}

export function stageClass(status: StageStatus) {
  if (status === "defined") return "border-gold/50 text-gold";
  if (status === "justified") return "border-green/50 text-green";
  return "border-amber/50 text-amber";
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-panel border border-line bg-surface">
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gold">{title}</h2>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs text-muted">
      <span className="font-mono uppercase tracking-widest">{label}</span>
      {children}
    </label>
  );
}

export const control =
  "min-h-11 w-full rounded-md border border-line bg-bg-raise px-3 text-sm text-fg outline-none focus:border-gold";

export function GoldButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-4 text-sm font-medium text-on-gold disabled:opacity-40 ${className}`}
    />
  );
}

export function GhostButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-surface px-4 text-sm text-fg disabled:opacity-40 ${className}`}
    />
  );
}

export function EmptyDesk({ children }: { children: ReactNode }) {
  return <p className="text-sm text-pretty text-muted">{children}</p>;
}
