import { useEffect, useLayoutEffect, useState } from "react";
import type { DeskView } from "@/rpf/store";
import { useActive, useRpf } from "@/rpf/store";
import { CsiView, ContractView, EvidenceView, ExperienceView, GraphView, OperatorsView, ReverseView, StewardshipView } from "./inspectors";
import { HomeView } from "./home";
import { SentinelOrb } from "./orb";
import { StatusView } from "./status-view";
import { stateLabel } from "./ui";

const VIEWS: [DeskView, string][] = [
  ["home", "Home"],
  ["status", "Status"],
  ["graph", "Graph"],
  ["operators", "Operators"],
  ["evidence", "Evidence"],
  ["reverse", "Reverse"],
  ["experience", "Experience"],
  ["csi", "CSI lab"],
  ["stewardship", "Stewardship"],
  ["contract", "Contract"],
];

function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduce;
}

export function RpfApp() {
  const hydrate = useRpf((s) => s.hydrate);
  const view = useRpf((s) => s.view);
  const setView = useRpf((s) => s.setView);
  const inv = useActive();
  const reduceMotion = useReduceMotion();

  useLayoutEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-dvh">
      <div className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <header className="flex items-center gap-3 px-4 py-3">
        <span className="size-2.5 shrink-0 rounded-full bg-gold" aria-hidden />
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-wide">RPF</p>
          <p className="hidden truncate text-xs text-muted sm:block">Reality Propagation Framework</p>
        </div>
        <p className="ml-auto font-mono text-xs text-cyan">Offline · local</p>
        <div className="flex items-center gap-2">
          {inv ? <span className="hidden font-mono text-xs text-muted sm:inline">{stateLabel(inv.claimState)}</span> : null}
          <SentinelOrb state={inv?.claimState ?? "idle"} reduceMotion={reduceMotion} className="size-9" />
        </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto px-3 py-2" aria-label="Desk">
        {VIEWS.map(([id, label]) => {
          const on = view === id;
          return (
            <button
              key={id}
              type="button"
              aria-current={on ? "page" : undefined}
              onClick={() => setView(id)}
              className={`min-h-11 shrink-0 rounded-md px-3 text-xs font-medium ${on ? "bg-gold text-on-gold" : "text-muted"}`}
            >
              {label}
            </button>
          );
        })}
        </nav>
      </div>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 pb-16">
        {view === "home" ? <HomeView reduceMotion={reduceMotion} /> : null}
        {view === "contract" ? <ContractView /> : null}
        {view === "csi" ? <CsiView inv={inv} /> : null}
        {view !== "home" && view !== "contract" && view !== "csi" && !inv ? (
          <p className="text-sm text-muted">Open an investigation from Home.</p>
        ) : null}
        {inv && view === "status" ? <StatusView inv={inv} /> : null}
        {inv && view === "graph" ? <GraphView inv={inv} /> : null}
        {inv && view === "operators" ? <OperatorsView inv={inv} /> : null}
        {inv && view === "evidence" ? <EvidenceView key={inv.id} inv={inv} /> : null}
        {inv && view === "reverse" ? <ReverseView inv={inv} /> : null}
        {inv && view === "experience" ? <ExperienceView key={inv.id} inv={inv} /> : null}
        {inv && view === "stewardship" ? <StewardshipView inv={inv} /> : null}
        <footer className="border-t border-line pt-4 text-xs text-muted">
          SCA keeps execution. Sentinel's phase light follows the open claim. It does not decide, and it does not hear a microphone.
        </footer>
      </main>
    </div>
  );
}
