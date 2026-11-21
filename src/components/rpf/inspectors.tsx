import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { domainSpec } from "@/rpf/domains";
import { OPERATORS, STAGE_ORDER, type Experience, type Investigation, type Operator, type StageId } from "@/rpf/types";
import { useRpf } from "@/rpf/store";
import { Field, GhostButton, GoldButton, Panel, StateBadge, control, stageClass, stageLabel } from "./ui";

const TRACE = Array.from({ length: 48 }, (_, i) => ({
  bin: i,
  amp: Number((Math.sin(i / 3.1) * 0.62 + Math.sin(i / 1.17) * 0.22).toFixed(3)),
}));

const PIPELINE: [string, string][] = [
  ["Wi-Fi monitor mode", "A report can exist. This desk has not re-verified firmware or capture behaviour."],
  ["CSI acquisition", "No capture file is attached. Monitor mode is not acquisition."],
  ["CSI decoding", "No samples, so there is nothing to decode."],
  ["Signal processing", "No numerical CSI."],
  ["RuView or any render", "A human-shaped picture would not be a detection."],
  ["RPF observation", "Blocked until a real measurement has provenance and a hash."],
];

export function GraphView({ inv }: { inv: Investigation }) {
  const [id, setId] = useState<StageId>("reality");
  const [reverse, setReverse] = useState(false);
  const stage = inv.stages.find((s) => s.id === id) ?? inv.stages[0];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <GhostButton type="button" onClick={() => setReverse(false)} className={!reverse ? "border-gold text-gold" : ""}>
          Forward
        </GhostButton>
        <GhostButton type="button" onClick={() => setReverse(true)} className={reverse ? "border-gold text-gold" : ""}>
          Reverse
        </GhostButton>
      </div>
      <p className="text-sm text-muted">
        {reverse
          ? "Same chain, read from stewardship back toward reality. The first unresolved stage, starting at reality, is the audit target."
          : "Same chain, read from reality toward stewardship. A later stage cannot fill an earlier gap."}
      </p>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {inv.stages.map((s, index) => {
          const walk = reverse ? inv.stages.length - index : index + 1;
          const target = s.id === inv.reverse.earliestUnsupported;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setId(s.id)}
                className={`flex h-full w-full flex-col gap-2 rounded-md border bg-surface p-3 text-left ${
                  s.id === stage.id ? "border-gold" : stageClass(s.status)
                } ${target ? "ring-2 ring-amber" : ""}`}
              >
                <span className="font-mono text-xs text-muted">{String(walk).padStart(2, "0")}</span>
                <span className="text-sm text-fg">{s.label}</span>
                <span className={`font-mono text-xs ${stageClass(s.status)} border-0`}>{stageLabel(s.status)}</span>
                {target ? <span className="font-mono text-xs text-amber">Audit target</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
      <Panel title={stage.label}>
        <p className="font-mono text-xs text-muted">{stage.required}</p>
        <p className="mt-3 text-sm">{stage.justification}</p>
        <p className="mt-3 text-sm text-muted">{stage.output ?? "No output. The gap is left empty."}</p>
        {stage.blockedBy ? <p className="mt-3 text-sm text-amber">Blocked: {stage.blockedBy}</p> : null}
      </Panel>
    </div>
  );
}

export function OperatorsView({ inv }: { inv: Investigation }) {
  const focusId = useRpf((s) => s.focusId);
  const focus = useRpf((s) => s.focus);
  const save = useRpf((s) => s.setOperator);
  const active =
    inv.propositions.find((p) => p.id === focusId) ?? inv.propositions.find((p) => p.role === "part") ?? inv.propositions[0];
  const required = new Set(domainSpec(inv.domain).operators);
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Proposition">
        <Field label="Which proposition">
          <select value={active.id} onChange={(e) => focus(e.target.value)} className={control}>
            {inv.propositions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.role === "root" ? "Claim" : "Part"} — {p.text}
              </option>
            ))}
          </select>
        </Field>
        <p className="mt-3 text-sm text-muted">
          An unanswered operator stays Unknown. A note is not evidence and cannot raise the claim state on its own.
          {` ${domainSpec(inv.domain).label} requires ${domainSpec(inv.domain).operators.join(", ")}.`}
        </p>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        {OPERATORS.map((op) => (
          <OperatorField
            key={`${active.id}-${op}`}
            op={op}
            value={active.operators[op].text}
            required={required.has(op)}
            onCommit={(text) => save(active.id, op, text)}
          />
        ))}
      </div>
    </div>
  );
}

function OperatorField({
  op,
  value,
  required,
  onCommit,
}: {
  op: Operator;
  value: string;
  required: boolean;
  onCommit: (text: string) => void;
}) {
  const [text, setText] = useState(value);
  return (
    <Panel title={op}>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onCommit(text);
        }}
      >
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className={`${control} min-h-24 py-3`} />
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-muted">{required ? "Required by domain" : "Optional"}</span>
          <GoldButton type="submit">Record</GoldButton>
        </div>
      </form>
    </Panel>
  );
}

export function EvidenceView({ inv }: { inv: Investigation }) {
  const addEvidence = useRpf((s) => s.addEvidence);
  const [statement, setStatement] = useState("");
  const [provenance, setProvenance] = useState("");
  const [kind, setKind] = useState<Investigation["evidence"][number]["kind"]>("FACT");
  const [standard, setStandard] = useState<Investigation["evidence"][number]["standard"]>("measurement");
  const [propositionId, setPropositionId] = useState(inv.propositions.find((p) => p.role === "part")?.id ?? inv.propositions[0].id);
  const [contradicts, setContradicts] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Panel title="Append evidence">
        <p className="mb-3 text-sm text-muted">
          Original evidence is not edited. Add a further record if an earlier one was wrong. A SHA-256 hash is taken over
          the statement and provenance.
        </p>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            addEvidence({ statement, provenance, kind, standard, propositionId, contradicts });
            setStatement("");
            setProvenance("");
            setContradicts(false);
          }}
        >
          <Field label="Statement">
            <textarea value={statement} onChange={(e) => setStatement(e.target.value)} rows={3} className={`${control} min-h-24 py-3`} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Kind">
              <select value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} className={control}>
                {["FACT", "INFERENCE", "ASSUMPTION", "PROPOSAL", "UNKNOWN"].map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </Field>
            <Field label="Standard">
              <select value={standard} onChange={(e) => setStandard(e.target.value as typeof standard)} className={control}>
                {["measurement", "observation", "formal", "authority", "tradition", "report"].map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Provenance">
            <input value={provenance} onChange={(e) => setProvenance(e.target.value)} className={control} />
          </Field>
          <Field label="Linked proposition">
            <select value={propositionId} onChange={(e) => setPropositionId(e.target.value)} className={control}>
              {inv.propositions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.text}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={contradicts} onChange={(e) => setContradicts(e.target.checked)} />
            This record conflicts with the proposition
          </label>
          <GoldButton type="submit" disabled={!statement.trim() || !provenance.trim()}>
            Append
          </GoldButton>
        </form>
      </Panel>
      <div className="flex flex-col gap-3">
        {inv.evidence.length === 0 ? <p className="text-sm text-muted">No evidence on file.</p> : null}
        {inv.evidence.map((e) => (
          <article key={e.id} className="rounded-panel border border-line bg-surface p-4">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="font-mono text-xs text-gold">{e.kind}</span>
              <span className="font-mono text-xs text-cyan">{e.standard}</span>
              {e.contradicts ? <span className="font-mono text-xs text-red">Contradiction</span> : null}
              <span className="font-mono text-xs text-muted">{e.relevant ? "Bears on the link" : "Does not bear"}</span>
            </div>
            <p className="text-sm">{e.statement}</p>
            <p className="mt-2 text-sm text-muted">{e.provenance}</p>
            <p className="mt-2 break-all font-mono text-xs text-muted" title={e.integrity}>
              SHA-256 {e.integrity}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ReverseView({ inv }: { inv: Investigation }) {
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Next audit">
        <p className="font-mono text-xs uppercase tracking-widest text-amber">
          {inv.reverse.earliestUnsupported ?? "No gap"}
        </p>
        <p className="mt-3 text-sm">{inv.reverse.nextAuditTarget}</p>
      </Panel>
      <ol className="flex flex-col gap-2">
        {inv.reverse.trace.map((step, index) => (
          <li key={step.id} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-md border border-line bg-surface px-3 py-3">
            <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm">{step.label}</span>
            <span className={`font-mono text-xs ${stageClass(step.status)} border-0`}>{stageLabel(step.status)}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted">Trace order is stewardship back to reality. The audit target is the earliest gap, not the nearest one to the conclusion.</p>
    </div>
  );
}

export function ExperienceView({ inv }: { inv: Investigation }) {
  const add = useRpf((s) => s.addExperience);
  const [form, setForm] = useState<Omit<Experience, "id">>({
    timestamp: "",
    observer: "",
    vision: "",
    sound: "",
    emotion: "",
    environment: "",
    interpretation: "",
    interpretationKind: "",
    confidence: "",
    provenance: "",
  });
  const set = (key: keyof Omit<Experience, "id">, value: string) => setForm((f) => ({ ...f, [key]: value }));
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Modalities">
        <p className="text-sm text-muted">
          Vision, sound, and emotion are associated records. They are not interchangeable evidence. A transcription is not
          the recording. An inference that someone sounded frightened is not a measurement of emotion.
        </p>
      </Panel>
      <Panel title="Append an experience">
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            add(form);
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Timestamp">
              <input value={form.timestamp} onChange={(e) => set("timestamp", e.target.value)} className={control} placeholder="2026-11-21T11:00:00Z" />
            </Field>
            <Field label="Observer">
              <input value={form.observer} onChange={(e) => set("observer", e.target.value)} className={control} />
            </Field>
          </div>
          <Field label="Environment">
            <input value={form.environment} onChange={(e) => set("environment", e.target.value)} className={control} />
          </Field>
          <Field label="Vision">
            <input value={form.vision} onChange={(e) => set("vision", e.target.value)} className={control} />
          </Field>
          <Field label="Sound">
            <input value={form.sound} onChange={(e) => set("sound", e.target.value)} className={control} />
          </Field>
          <Field label="Emotion — report or inference, not a measurement">
            <input value={form.emotion} onChange={(e) => set("emotion", e.target.value)} className={control} />
          </Field>
          <Field label="Interpretation">
            <input value={form.interpretation} onChange={(e) => set("interpretation", e.target.value)} className={control} />
          </Field>
          <Field label="Interpretation kind">
            <select
              value={form.interpretationKind}
              onChange={(e) => set("interpretationKind", e.target.value)}
              className={control}
            >
              <option value="">None</option>
              <option value="reported">Reported</option>
              <option value="inference">Inference</option>
            </select>
          </Field>
          <Field label="Confidence in the interpretation">
            <input value={form.confidence} onChange={(e) => set("confidence", e.target.value)} className={control} />
          </Field>
          <Field label="Provenance">
            <input value={form.provenance} onChange={(e) => set("provenance", e.target.value)} className={control} />
          </Field>
          <GoldButton type="submit" disabled={!form.timestamp.trim() || !form.observer.trim() || !form.provenance.trim()}>
            Append
          </GoldButton>
        </form>
      </Panel>
      {inv.experiences.map((row) => (
        <article key={row.id} className="rounded-panel border border-line bg-surface p-4 text-sm">
          <p className="font-mono text-xs text-gold">
            {row.observer} · {row.timestamp}
          </p>
          <p className="mt-2">{row.environment || "No environment recorded."}</p>
          <p className="mt-2 text-muted">Vision: {row.vision || "—"}</p>
          <p className="text-muted">Sound: {row.sound || "—"}</p>
          <p className="text-muted">Emotion: {row.emotion || "—"}</p>
          <p className="mt-2">
            Interpretation ({row.interpretationKind || "unlabelled"}): {row.interpretation || "—"}
          </p>
          <p className="mt-2 text-muted">{row.provenance}</p>
        </article>
      ))}
    </div>
  );
}

export function CsiView({ inv }: { inv: Investigation | null }) {
  const refuse = useRpf((s) => s.refuseSynthetic);
  const setView = useRpf((s) => s.setView);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Acquisition pipeline">
        <p className="mb-3 text-sm text-muted">
          This laboratory does not talk to a Raspberry Pi. Nothing below is a capture. RuView, if it rendered a body,
          would still not be knowledge.
        </p>
        <ul className="flex flex-col gap-2">
          {PIPELINE.map(([name, detail], index) => (
            <li key={name} className="grid gap-1 rounded-md border border-line bg-bg-raise p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-3">
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-sm">{name}</span>
                <span className="block text-sm text-muted">{detail}</span>
              </span>
              <span className="font-mono text-xs text-amber">Unresolved</span>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Synthetic trace">
        <p className="mb-3 text-sm text-muted">
          Generated in the page for layout. Not a measurement, not occupancy, not an identity.
        </p>
        <div className="h-40 w-full">
          {ready ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRACE}>
                <XAxis dataKey="bin" hide />
                <YAxis hide domain={[-1, 1]} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-line)",
                    color: "var(--color-fg)",
                  }}
                />
                <Area dataKey="amp" stroke="var(--color-cyan)" fill="var(--color-cyan)" fillOpacity={0.15} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted">Trace withheld until the page is ready.</p>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <GhostButton
            type="button"
            disabled={!inv}
            onClick={() => {
              refuse();
              setView("status");
            }}
          >
            Try to attach this trace
          </GhostButton>
        </div>
      </Panel>
      {inv ? <StateBadge state={inv.claimState} /> : null}
    </div>
  );
}

const STEWARD_FIELDS: [keyof Investigation["stewardship"], string][] = [
  ["what", "What"],
  ["why", "Why"],
  ["how", "How"],
  ["who", "Who"],
  ["where", "Where"],
  ["when", "When"],
  ["limits", "Limits"],
  ["failure", "Failure conditions"],
  ["monitoring", "Monitoring"],
  ["preservation", "Preservation"],
  ["revision", "Revision"],
  ["transmission", "Transmission"],
];

export function StewardshipView({ inv }: { inv: Investigation }) {
  const setStewardship = useRpf((s) => s.setStewardship);
  const result = inv.stewardshipResult;
  return (
    <div className="flex flex-col gap-4">
      <Panel title={result.justified ? "Justified" : "Not justified"}>
        <p className="text-sm">
          {result.justified
            ? "The test passed inside the recorded limits. It is not a general permission."
            : "Filling the form is not enough. Knowledge has to be justified, and contradictions have to be closed."}
        </p>
        {result.missing.length ? (
          <ul className="mt-3 flex flex-col gap-1">
            {result.missing.map((item) => (
              <li key={item} className="text-sm text-amber">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        {STEWARD_FIELDS.map(([key, label]) => (
          <Field key={key} label={label}>
            <input
              value={inv.stewardship[key]}
              onChange={(e) => setStewardship({ [key]: e.target.value })}
              className={control}
            />
          </Field>
        ))}
      </div>
    </div>
  );
}

export function ContractView() {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <Panel title="Boundary">
        <p className="text-sm">
          RPF decides whether a conclusion is justified. SCA remains the only orchestration authority. This desk does not
          call agents, open tools, or drive a radio. T-Lab findings, PentestGPT findings, and Pi observations would enter
          as attributed evidence, not as facts about the world.
        </p>
      </Panel>
      <Panel title="Chain">
        <ol className="flex flex-col gap-1">
          {STAGE_ORDER.map((id, i) => (
            <li key={id} className="font-mono text-sm text-fg">
              {String(i + 1).padStart(2, "0")} {id}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted">
          Language sits before knowledge: a proposition has to be explicit before it can be admitted as a bounded claim.
          That is a rule of this framework, not a theory of all cognition. A stage may stay empty. It is never filled in
          just to finish the chain.
        </p>
      </Panel>
      <Panel title="Claim states">
        <ul className="flex flex-col gap-2 text-sm">
          <li>Demonstrated — domain standard met, required keys answered, knowledge bounded.</li>
          <li>Supported — evidence supports the proposition inside stated limits.</li>
          <li>Reasoned — inference or assumption only. Not observation.</li>
          <li>Proposed — identified, not established.</li>
          <li>Unresolved — material uncertainty or an open contradiction. A legitimate state.</li>
        </ul>
        <p className="mt-3 text-sm text-muted">Colour is never the only signal. Every state is written out.</p>
      </Panel>
      <Panel title="Policies">
        <ul className="flex flex-col gap-2 text-sm">
          <li>Offline by default. This page does not fetch a model.</li>
          <li>Evidence is append-only and hashed.</li>
          <li>A model's confidence is not evidential certainty.</li>
          <li>Raw measurement, decoded measurement, and inferred occupancy stay different claims.</li>
          <li>Stewardship is refused when the test is short, even if every box is filled.</li>
        </ul>
      </Panel>
    </div>
  );
}
