import { useEffect, useState } from "react";
import { domainSpec } from "@/rpf/domains";
import { toArtefact } from "@/rpf/engine";
import { OPERATORS, type Investigation } from "@/rpf/types";
import { useRpf } from "@/rpf/store";
import { Field, GhostButton, GoldButton, Panel, StateBadge, control } from "./ui";

export function StatusView({ inv }: { inv: Investigation }) {
  const focusId = useRpf((s) => s.focusId);
  const focus = useRpf((s) => s.focus);
  const setBounds = useRpf((s) => s.setBounds);
  const addCompeting = useRpf((s) => s.addCompeting);
  const remove = useRpf((s) => s.remove);
  const setView = useRpf((s) => s.setView);
  const [line, setLine] = useState("");
  const [canSpeak, setCanSpeak] = useState(false);
  const active =
    inv.propositions.find((p) => p.id === focusId) ??
    inv.propositions.find((p) => p.role === "part") ??
    inv.propositions[0];
  const parts = inv.propositions.filter((p) => p.role === "part");
  const shown = parts.length ? parts : inv.propositions;

  useEffect(() => {
    setCanSpeak(typeof speechSynthesis !== "undefined");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">RPF status</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">{inv.claim}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <StateBadge state={inv.claimState} />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">{domainSpec(inv.domain).label}</span>
          <span className="font-mono text-xs text-muted">{inv.id}</span>
        </div>
        <p className="max-w-3xl text-sm text-muted sm:text-base">{inv.decision}</p>
        <div className="flex flex-wrap gap-2">
          <GhostButton
            type="button"
            disabled={!canSpeak}
            onClick={() => {
              if (!canSpeak) return;
              speechSynthesis.cancel();
              const utter = new SpeechSynthesisUtterance(inv.decision);
              utter.rate = 0.96;
              speechSynthesis.speak(utter);
            }}
          >
            Read conclusion
          </GhostButton>
          <GhostButton
            type="button"
            onClick={() => {
              const blob = new Blob([JSON.stringify(toArtefact(inv), null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${inv.id}.rpf.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export artefact
          </GhostButton>
          <GhostButton type="button" onClick={() => remove(inv.id)}>
            Drop from desk
          </GhostButton>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
        <Panel title="Propositions">
          <ul className="flex flex-col gap-2">
            {shown.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => focus(p.id)}
                  className={`flex w-full flex-col gap-2 rounded-md border p-3 text-left ${
                    p.id === active.id ? "border-gold bg-bg-raise" : "border-line"
                  }`}
                >
                  <StateBadge state={p.state} />
                  <span className="text-sm text-fg">{p.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Keys" action={<GhostButton onClick={() => setView("operators")}>Edit keys</GhostButton>}>
            <p className="mb-3 text-sm text-muted">{active.decision}</p>
            <dl className="grid gap-2 sm:grid-cols-2">
              {OPERATORS.map((op) => (
                <div key={op} className="rounded-md border border-line bg-bg-raise p-3">
                  <dt className="font-mono text-xs text-gold">{op}</dt>
                  <dd className="mt-1 text-sm text-fg">{active.operators[op].text}</dd>
                  <dd className="font-mono text-xs text-muted">
                    {active.operators[op].status === "unknown" ? "Unknown" : "Answered"}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>

          <div className="grid gap-4 lg:grid-cols-2">
            <Record title="Forward" items={inv.forward} empty="No forward pass." />
            <Record
              title="Reverse"
              items={[
                inv.reverse.earliestUnsupported
                  ? `Earliest gap: ${inv.reverse.earliestUnsupported}`
                  : "No unresolved stage.",
                inv.reverse.nextAuditTarget,
              ]}
              empty="No reverse pass."
            />
            <Record title="Findings" items={inv.findings} empty="No findings." />
            <Record title="Unknowns" items={inv.unknowns} empty="No unknowns recorded." />
            <Record title="Contradictions" items={inv.contradictions} empty="No contradiction on file." tone="red" />
            <Record title="Assumptions" items={inv.assumptions} empty="No assumptions on file." />
          </div>
        </div>
      </div>

      <Panel title="Bound">
        <Field label="What this claim does not establish">
          <textarea
            value={inv.bounds}
            onChange={(e) => setBounds(e.target.value)}
            rows={3}
            className={`${control} min-h-24 py-3`}
          />
        </Field>
        <p className="mt-2 text-xs text-muted">An empty bound blocks the knowledge stage. The gap is not filled for you.</p>
      </Panel>

      <Panel title="Competing accounts">
        <ul className="mb-3 flex flex-col gap-2">
          {inv.competing.length === 0 ? <li className="text-sm text-muted">None recorded. Wisdom stays unresolved.</li> : null}
          {inv.competing.map((item) => (
            <li key={item} className="rounded-md border border-line bg-bg-raise p-3 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            addCompeting(line);
            setLine("");
          }}
        >
          <input value={line} onChange={(e) => setLine(e.target.value)} className={control} placeholder="Another way this could fail" />
          <GoldButton type="submit" disabled={!line.trim()}>
            Add
          </GoldButton>
        </form>
      </Panel>
    </div>
  );
}

function Record({ title, items, empty, tone }: { title: string; items: string[]; empty: string; tone?: "red" }) {
  return (
    <Panel title={title}>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item} className={`text-sm ${tone === "red" ? "text-red" : "text-fg"}`}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
