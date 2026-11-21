import { useState } from "react";
import { DOMAINS } from "@/rpf/domains";
import type { DomainId, Investigation } from "@/rpf/types";
import { useActive, useRpf } from "@/rpf/store";
import { SentinelOrb } from "./orb";
import { Field, GhostButton, GoldButton, Panel, StateBadge, control } from "./ui";

export function HomeView({ reduceMotion }: { reduceMotion: boolean }) {
  const investigations = useRpf((s) => s.investigations);
  const openClaim = useRpf((s) => s.openClaim);
  const select = useRpf((s) => s.select);
  const restore = useRpf((s) => s.restore);
  const [claim, setClaim] = useState("");
  const [domain, setDomain] = useState<DomainId>("cybersecurity");
  const spec = DOMAINS.find((d) => d.id === domain);
  const open = useActive();

  return (
    <div className="flex flex-col gap-4">
      <section className="grid items-center gap-4 lg:grid-cols-[1fr_180px]">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-gold">Local · offline · read only</p>
          <h1 className="text-3xl font-semibold text-fg sm:text-4xl">Reality Propagation</h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            RPF asks whether a conclusion is justified. It does not command tools, and a model, a sensor, or an authority
            does not become reality by speaking.
          </p>
        </div>
        <div className="flex items-center gap-3 lg:flex-col">
          <SentinelOrb state={open?.claimState ?? "idle"} reduceMotion={reduceMotion} className="size-28 shrink-0 sm:size-36" />
          <p className="font-mono text-xs text-muted">Phase light for the open claim. Not a sensor.</p>
        </div>
      </section>

      <Panel title="Open an investigation">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!claim.trim()) return;
            openClaim(claim, domain);
            setClaim("");
          }}
        >
          <Field label="Claim">
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              rows={3}
              placeholder="State one proposition."
              className={`${control} min-h-24 py-3`}
            />
          </Field>
          <Field label="Domain">
            <select value={domain} onChange={(e) => setDomain(e.target.value as DomainId)} className={control}>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </Field>
          <p className="text-sm text-muted">{spec?.summary}</p>
          <div className="flex flex-wrap gap-2">
            <GoldButton type="submit" disabled={!claim.trim()}>
              Investigate
            </GoldButton>
            <GhostButton type="button" onClick={restore}>
              Restore examples
            </GhostButton>
          </div>
        </form>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-3">
        {investigations.length === 0 ? (
          <p className="text-sm text-muted">No investigations on this desk.</p>
        ) : (
          investigations.map((inv) => <CaseCard key={inv.id} inv={inv} onOpen={() => select(inv.id)} />)
        )}
      </div>
    </div>
  );
}

function CaseCard({ inv, onOpen }: { inv: Investigation; onOpen: () => void }) {
  const parts = inv.propositions.filter((p) => p.role === "part").length;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex min-h-36 flex-col gap-3 rounded-panel border border-line bg-surface p-4 text-left"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{inv.domain}</span>
        <StateBadge state={inv.claimState} />
      </span>
      <span className="text-base font-medium text-fg">{inv.title}</span>
      <span className="line-clamp-4 text-sm text-muted">{inv.decision}</span>
      <span className="mt-auto font-mono text-xs text-muted">
        {parts ? `${parts} constituents` : "Single proposition"} · next: {inv.reverse.earliestUnsupported ?? "none"}
      </span>
    </button>
  );
}
