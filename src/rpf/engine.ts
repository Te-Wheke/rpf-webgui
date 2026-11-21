import { domainSpec } from "./domains.ts";
import { evidenceHash } from "./sha256.ts";
import {
  EMPTY_STEWARDSHIP,
  OPERATORS,
  STAGE_META,
  type AssertionKind,
  type ClaimState,
  type DomainId,
  type Evidence,
  type EvidenceStandard,
  type Experience,
  type Investigation,
  type Operator,
  type OperatorNote,
  type Proposition,
  type StageId,
  type StageRecord,
  type StageStatus,
  type StewardshipDraft,
} from "./types.ts";

const CSI_PARTS = [
  "The Raspberry Pi produced CSI measurements.",
  "Those measurements contained measurable changes.",
  "The changes were associated with physical movement.",
  "The movement was caused by a person.",
  "The person was located behind a wall.",
];

const NEXT_AUDIT: Record<StageId, string> = {
  reality: "Name the target. The name is not the thing.",
  observation:
    "Record a measurement, or a domain-appropriate observation, with provenance. A report of a different capability does not fill this gap.",
  experience: "Attach observer, time, and context. Do not treat an inference as experience.",
  understanding: "State the interpretation and mark it as inference, separate from the record.",
  language: "Keep the proposition explicit. Wording is not yet knowledge.",
  knowledge: "Bound the claim. Write what it does not establish.",
  wisdom: "Record a competing explanation and the way the claim can fail.",
  stewardship:
    "Stewardship needs what, why, how, who, where, when, limits, failure conditions, monitoring, preservation, revision, and transmission. Blank fields are not permission.",
};

export type EvidenceDraft = {
  statement: string;
  kind: AssertionKind;
  standard: EvidenceStandard;
  provenance: string;
  integrity?: string;
  contradicts?: boolean;
  propositionId: string;
};

export type CreateInput = {
  id?: string;
  createdAt?: string;
  title?: string;
  claim: string;
  domain: DomainId;
  parts?: string[];
};

function hashId(prefix: string, seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${prefix}-${(h >>> 0).toString(16)}`;
}

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function truncate(s: string, n: number) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, n - 1)}…`;
}

function unique(list: string[]) {
  return [...new Set(list.filter(Boolean))];
}

export function decomposeClaim(raw: string): string[] {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) return [];
  const key = norm(text);
  if (key.includes("raspberry pi") && key.includes("behind a wall") && key.includes("csi")) return [...CSI_PARTS];

  const sentences = text
    .split(/;+|(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const sentence of sentences) {
    const clause = sentence.replace(/[.?!]+$/, "").trim();
    for (const bit of splitAnd(clause)) out.push(...peel(bit));
  }
  const parts = unique(out.map((s) => (/[.?!]$/.test(s) ? s : `${s}.`)));
  if (parts.length === 1 && norm(parts[0]) === key) return [];
  return parts.slice(0, 12);
}

function splitAnd(s: string) {
  const bits = s.split(/\s+\b(?:and|but)\b\s+/i).map((b) => b.trim()).filter(Boolean);
  if (bits.length < 2) return [s];
  if (bits.every((b) => b.split(/\s+/).length >= 3)) return bits;
  return [s];
}

function peel(s: string) {
  const extras: string[] = [];
  let core = s.trim();
  const using = core.match(/\b(?:using|via|through)\s+(.+)$/i);
  if (using && using.index !== undefined) {
    extras.push(`The method used is ${using[1].replace(/[.]+$/, "")}.`);
    core = core.slice(0, using.index).trim();
  }
  const because = core.match(/\bbecause\s+(.+)$/i);
  if (because && because.index !== undefined) {
    extras.push(because[1].replace(/[.]+$/, ""));
    core = core.slice(0, because.index).trim();
  }
  if (core && !/[.?!]$/.test(core)) core = `${core}.`;
  return [core, ...extras.map((e) => (/[.?!]$/.test(e) ? e : `${e}.`))].filter((x) => x.length > 2);
}

function blankOperators(): Record<Operator, OperatorNote> {
  return {
    WHAT: { text: "Unknown.", status: "unknown" },
    HOW: { text: "Unknown.", status: "unknown" },
    WHEN: { text: "Unknown.", status: "unknown" },
    WHY: { text: "Unknown.", status: "unknown" },
    WHERE: { text: "Unknown.", status: "unknown" },
    WHO: { text: "Unknown.", status: "unknown" },
  };
}

function asNote(text: string): OperatorNote {
  const t = text.trim();
  if (!t || /^unknown\b/i.test(t)) return { text: t || "Unknown.", status: "unknown" };
  return { text: t, status: "answered" };
}

function isPredictive(text: string) {
  return /\b(predicts?|forecasts?|guarantees)\b/i.test(text);
}

function isMonitorOnly(statement: string) {
  return /monitor mode/i.test(statement) && !/\bcsi\b/i.test(statement);
}

function isMonitorProposition(text: string) {
  return /monitor mode/i.test(text) && !/\bcsi\b/i.test(text);
}

function bearsOn(domain: DomainId, evidence: Pick<Evidence, "statement" | "standard">, text: string) {
  if (domain === "cybersecurity" && isMonitorOnly(evidence.statement) && !isMonitorProposition(text)) return false;
  if (domain === "astrological" && (evidence.standard === "tradition" || evidence.standard === "authority") && isPredictive(text)) {
    return false;
  }
  return true;
}

function standardOk(domain: DomainId, text: string, standard: EvidenceStandard) {
  if (domain === "mathematics") return standard === "formal";
  if (domain === "legal" || domain === "cultural") return standard === "authority";
  if (domain === "historical") return standard === "authority" || standard === "observation";
  if (domain === "philosophy") return standard === "formal";
  if (domain === "religion") return standard === "authority" || standard === "tradition";
  if (domain === "astrological") {
    if (isPredictive(text)) return standard === "measurement" || standard === "observation";
    return standard === "tradition" || standard === "authority";
  }
  if (domain === "political") return standard === "observation" || standard === "authority";
  return standard === "measurement" || standard === "observation";
}

function weaker(current: ClaimState, cap: ClaimState): ClaimState {
  if (current === "UNRESOLVED" || cap === "UNRESOLVED") return "UNRESOLVED";
  const order: ClaimState[] = ["PROPOSED", "REASONED", "SUPPORTED", "DEMONSTRATED"];
  return order[Math.min(order.indexOf(current), order.indexOf(cap))];
}

function aggregate(states: ClaimState[]): ClaimState {
  if (states.length === 0) return "PROPOSED";
  if (states.includes("UNRESOLVED")) return "UNRESOLVED";
  if (states.includes("PROPOSED")) return "PROPOSED";
  if (states.includes("REASONED")) return "REASONED";
  if (states.includes("SUPPORTED")) return "SUPPORTED";
  return "DEMONSTRATED";
}

function judge(domain: DomainId, prop: Proposition, evidence: Evidence[]): { state: ClaimState; decision: string } {
  const linked = evidence.filter((e) => e.propositionId === prop.id);
  if (domain === "astrological" && isPredictive(prop.text)) {
    const empirical = linked.filter(
      (e) => !e.contradicts && e.kind === "FACT" && (e.standard === "measurement" || e.standard === "observation"),
    );
    if (empirical.length === 0) {
      if (linked.length) {
        return {
          state: "UNRESOLVED",
          decision:
            "Tradition-internal evidence does not establish a prediction. The predicted event is unresolved.",
        };
      }
      return { state: "PROPOSED", decision: "Proposition identified. No evidence linked. Not evaluated." };
    }
  }

  const bearing = linked.filter((e) => bearsOn(domain, e, prop.text));
  const contradictions = bearing.filter((e) => e.contradicts && (e.kind === "FACT" || e.kind === "INFERENCE"));
  if (contradictions.length) {
    return {
      state: "UNRESOLVED",
      decision: "Evidence conflicts with this proposition. The conflict stays open and is not averaged away.",
    };
  }

  const facts = bearing.filter((e) => e.kind === "FACT" && !e.contradicts && standardOk(domain, prop.text, e.standard));
  const reasoned = bearing.filter((e) => e.kind === "INFERENCE" || e.kind === "ASSUMPTION");
  if (!facts.length) {
    if (reasoned.length) {
      return {
        state: "REASONED",
        decision: "Reasoning is recorded. Inference and assumption are not observation, so the proposition is not supported.",
      };
    }
    if (linked.length) {
      return {
        state: "PROPOSED",
        decision: "Material was linked. It does not bear on this proposition as evidence. State remains proposed.",
      };
    }
    return { state: "PROPOSED", decision: "Proposition identified. No evidence linked. Not evaluated." };
  }

  const required = domainSpec(domain).operators;
  const missing = required.filter((op) => prop.operators[op].status === "unknown");
  let cap: ClaimState = "DEMONSTRATED";
  const limits: string[] = [];
  if (missing.length) {
    cap = "SUPPORTED";
    limits.push(`unanswered ${missing.join(", ")}`);
  }
  if (domain === "medical") {
    cap = weaker(cap, "SUPPORTED");
    limits.push("clinical claims are not demonstrated here, and this is not a diagnosis");
  }
  if (domain === "cultural") {
    cap = weaker(cap, "SUPPORTED");
    limits.push("tikanga is not certified by this console");
    if (prop.operators.WHO.status === "unknown") {
      cap = "REASONED";
      limits.push("no authority is identified");
    }
  }
  if (domain === "astrological") {
    cap = weaker(cap, "SUPPORTED");
    limits.push("tradition consistency is not empirical accuracy");
  }
  if (domain === "philosophy") {
    cap = weaker(cap, "SUPPORTED");
    limits.push("an argument is not a demonstrated fact about the world");
  }
  if (domain === "religion") {
    cap = weaker(cap, "SUPPORTED");
    limits.push("authority is not proof of the claim");
  }
  if (domain === "legal" && prop.operators.WHERE.status === "unknown") {
    cap = "REASONED";
    limits.push("jurisdiction is unknown");
  }
  if (domain === "historical" || domain === "political") {
    const sources = new Set(facts.map((f) => f.provenance.trim().toLowerCase()).filter(Boolean));
    if (sources.size < 2) {
      cap = weaker(cap, "SUPPORTED");
      limits.push(domain === "historical" ? "corroboration is unmet" : "source independence is unmet");
    }
  }

  if (cap === "DEMONSTRATED") {
    return {
      state: "DEMONSTRATED",
      decision:
        "The linked evidence meets this domain's standard, and the required operators are answered. The claim is only as wide as its bound.",
    };
  }
  if (cap === "REASONED") {
    return {
      state: "REASONED",
      decision: `Facts are on file, but they do not carry the proposition: ${limits.join("; ")}.`,
    };
  }
  return {
    state: "SUPPORTED",
    decision: `Evidence supports the proposition only within limits: ${limits.join("; ")}.`,
  };
}

function stage(
  id: StageId,
  status: StageStatus,
  output: string | null,
  justification: string,
  blockedBy: string | null,
): StageRecord {
  const meta = STAGE_META.find((s) => s.id === id)!;
  return { id, label: meta.label, required: meta.required, status, output, justification, blockedBy };
}

function recordedObservation(domain: DomainId, evidence: Evidence, props: Proposition[]) {
  if (evidence.kind !== "FACT") return false;
  const prop = props.find((p) => p.id === evidence.propositionId);
  if (!prop) return false;
  if (domain === "astrological" && props.some((p) => p.role === "part" && isPredictive(p.text) || (p.role === "root" && isPredictive(p.text) && props.length === 1))) {
    return evidence.standard === "measurement" || evidence.standard === "observation";
  }
  if (domain === "astrological" && props.some((p) => isPredictive(p.text))) {
    return evidence.standard === "measurement" || evidence.standard === "observation";
  }
  return standardOk(domain, prop.text, evidence.standard);
}

function testStewardship(inv: Pick<Investigation, "stewardship" | "claimState" | "contradictions" | "stages">) {
  const missing: string[] = [];
  const fields: [keyof StewardshipDraft, string][] = [
    ["what", "WHAT should be applied"],
    ["why", "WHY it should be applied"],
    ["how", "HOW it should be applied"],
    ["who", "WHO holds responsibility"],
    ["where", "WHERE it applies"],
    ["when", "WHEN it applies"],
    ["limits", "LIMITS"],
    ["failure", "FAILURE CONDITIONS"],
    ["monitoring", "MONITORING"],
    ["preservation", "PRESERVATION"],
    ["revision", "REVISION"],
    ["transmission", "TRANSMISSION"],
  ];
  for (const [key, label] of fields) {
    if (!inv.stewardship[key].trim()) missing.push(label);
  }
  const knowledge = inv.stages.find((s) => s.id === "knowledge");
  if (!knowledge || knowledge.status !== "justified") missing.push("Knowledge stage is not justified");
  if (inv.contradictions.length) missing.push("Contradictions are unresolved");
  if (inv.claimState === "PROPOSED" || inv.claimState === "UNRESOLVED") {
    missing.push("Claim state does not support a decision");
  }
  if (inv.claimState === "REASONED") missing.push("Reasoning alone does not justify stewardship");
  return { justified: missing.length === 0, missing };
}

function composeDecision(
  claimState: ClaimState,
  judged: Proposition[],
  knowledgeJustified: boolean,
  stewardshipJustified: boolean,
) {
  let text: string;
  if (judged.length > 1) {
    const bits = judged.map((p) => `${p.state} — ${truncate(p.text, 78)}`);
    text = `Compound claim is ${claimState}. ${bits.join(" · ")}.`;
    if (claimState === "UNRESOLVED") text += " Unresolved constituents block the compound claim.";
    if (judged.every((p) => p.state === "PROPOSED")) {
      text = "Compound claim, still proposed. No constituent is established. Identification is not evaluation.";
    }
  } else {
    text = judged[0]?.decision ?? "No proposition.";
  }
  if ((claimState === "SUPPORTED" || claimState === "DEMONSTRATED") && !knowledgeJustified && claimState !== "DEMONSTRATED") {
    text += " The knowledge stage is unresolved, so this is not demonstrated.";
  }
  if (claimState === "DEMONSTRATED") {
    text += stewardshipJustified
      ? " Stewardship is justified only inside the recorded limits."
      : " Demonstration does not itself justify stewardship.";
  }
  return text;
}

export function evaluate(input: Investigation): Investigation {
  const inv = structuredClone(input);
  const domain = inv.domain;
  const findings: string[] = [];

  inv.propositions = inv.propositions.map((prop) => {
    const judged = judge(domain, prop, inv.evidence);
    return { ...prop, state: judged.state, decision: judged.decision };
  });

  inv.evidence = inv.evidence.map((e) => {
    const prop = inv.propositions.find((p) => p.id === e.propositionId);
    const relevant = prop ? bearsOn(domain, e, prop.text) && !(domain === "astrological" && isPredictive(prop.text) && e.standard === "tradition") : false;
    if (prop && !relevant && isMonitorOnly(e.statement)) {
      findings.push("A monitor-mode report is on file. Monitor mode does not establish CSI extraction.");
    }
    if (prop && domain === "astrological" && isPredictive(prop.text) && (e.standard === "tradition" || e.standard === "authority")) {
      findings.push("Tradition evidence was offered for a prediction. It does not establish the predicted event.");
    }
    if (!e.integrity) findings.push(`Evidence ${e.id} has no SHA-256 integrity hash.`);
    return { ...e, relevant };
  });

  if (domain === "cybersecurity" && /monitor mode/i.test(inv.claim) && /\bcsi\b/i.test(inv.claim)) {
    findings.push("Monitor mode and CSI extraction are different capabilities. One does not establish the other.");
  }

  const parts = inv.propositions.filter((p) => p.role === "part");
  const judged = parts.length ? parts : inv.propositions.filter((p) => p.role === "root");
  const raw = aggregate(judged.map((p) => p.state));

  const observed = inv.evidence.filter((e) => recordedObservation(domain, e, inv.propositions));
  const observationJustified = observed.length > 0;
  const observation = observationJustified
    ? stage(
        "observation",
        "justified",
        observed.map((e) => e.statement).join(" "),
        "A recorded item meets the domain standard for observation. The record is not the phenomenon, and a contradicting record still counts only as a record.",
        null,
      )
    : stage(
        "observation",
        "unresolved",
        null,
        "No recorded observation meets the domain standard.",
        "No recorded observation meets the domain standard.",
      );

  const experienceReady = inv.experiences.filter((e) => e.timestamp.trim() && e.observer.trim() && e.provenance.trim());
  const experience = !observationJustified
    ? stage("experience", "unresolved", null, "Experience is not reached while observation is unresolved.", "Observation is unresolved.")
    : experienceReady.length
      ? stage(
          "experience",
          "justified",
          experienceReady.map((e) => `${e.observer} @ ${e.timestamp}`).join("; "),
          "Experience contextualises the observation. Emotion, image, and sound stay modalities. They are not interchangeable with the measurement. An affective note is a report or an inference, not a measurement of emotion.",
          null,
        )
      : stage(
          "experience",
          "unresolved",
          null,
          "Observation is on record. Observer, time, and provenance are not.",
          "No experience record with observer, time, and provenance.",
        );

  const inferences = [
    ...inv.evidence.filter((e) => e.kind === "INFERENCE").map((e) => e.statement),
    ...inv.experiences
      .filter((e) => e.interpretationKind === "inference" && e.interpretation.trim())
      .map((e) => e.interpretation.trim()),
  ];
  const understanding = experience.status !== "justified"
    ? stage("understanding", "unresolved", null, "Understanding is not reached while experience is unresolved.", "Experience is unresolved.")
    : inferences.length
      ? stage(
          "understanding",
          "justified",
          inferences.join(" "),
          "This is an interpretation. It is not promoted to an observation.",
          null,
        )
      : stage(
          "understanding",
          "unresolved",
          null,
          "No interpretation has been separated from the record.",
          "No inference is marked.",
        );

  const language = understanding.status !== "justified"
    ? stage(
        "language",
        "unresolved",
        null,
        "Language represents an interpretation. There is not yet an interpretation to represent.",
        "Understanding is unresolved.",
      )
    : stage(
        "language",
        "justified",
        inv.claim,
        "The claim is an explicit representation of the interpretation. The wording is not knowledge.",
        null,
      );

  const contradicted = inv.evidence.some((e) => e.contradicts && e.relevant);
  const knowledgeBlocked =
    language.status !== "justified"
      ? "Language is unresolved."
      : raw === "PROPOSED" || raw === "UNRESOLVED" || raw === "REASONED"
        ? "The proposition is not supported."
        : !inv.bounds.trim()
          ? "No bound is recorded. Unbounded support is not knowledge."
          : contradicted
            ? "A contradiction is open."
            : null;
  const knowledge = knowledgeBlocked
    ? stage("knowledge", "unresolved", null, "Knowledge is not justified.", knowledgeBlocked)
    : stage(
        "knowledge",
        "justified",
        `${raw}. Bound: ${inv.bounds.trim()}`,
        "The claim is supported and bounded. The bound is part of the claim.",
        null,
      );

  const wisdomBlocked =
    knowledge.status !== "justified"
      ? "Knowledge is unresolved."
      : inv.competing.length === 0
        ? "No competing explanation is recorded."
        : null;
  const wisdom = wisdomBlocked
    ? stage("wisdom", "unresolved", null, "Wisdom is not justified.", wisdomBlocked)
    : stage(
        "wisdom",
        "justified",
        inv.competing.join(" "),
        "Wisdom here is the recorded limit and the competing accounts. It is not a decision to act.",
        null,
      );

  const reality = stage(
    "reality",
    "defined",
    inv.claim,
    "The target is named by the claim. Naming it does not establish that it is so.",
    null,
  );

  let claimState: ClaimState = raw;
  if (raw === "DEMONSTRATED" && knowledge.status !== "justified") claimState = "SUPPORTED";

  const partialStages = [reality, observation, experience, understanding, language, knowledge, wisdom];
  const draft: Investigation = {
    ...inv,
    claimState,
    stages: [
      ...partialStages,
      stage("stewardship", "unresolved", null, "Pending the stewardship test.", null),
    ],
    contradictions: inv.evidence.filter((e) => e.contradicts).map((e) => e.statement),
  };
  const stewardshipResult = testStewardship(draft);
  const stewardship = stewardshipResult.justified
    ? stage(
        "stewardship",
        "justified",
        inv.stewardship.what.trim(),
        "The stewardship test passed. It remains inside the recorded limits and failure conditions.",
        null,
      )
    : stage(
        "stewardship",
        "unresolved",
        null,
        "Stewardship is not justified.",
        stewardshipResult.missing[0] ?? "Stewardship test failed.",
      );

  const stages = [...partialStages, stewardship];
  const earliest = stages.find((s) => s.status === "unresolved") ?? null;
  const unknowns = [
    ...judged.flatMap((p) =>
      domainSpec(domain).operators
        .filter((op) => p.operators[op].status === "unknown")
        .map((op) => `${op} unanswered (${truncate(p.text, 52)})`),
    ),
    ...stages.filter((s) => s.status === "unresolved").map((s) => `${s.label} stage`),
  ];

  const decision = composeDecision(claimState, judged, knowledge.status === "justified", stewardshipResult.justified);
  const factCount = inv.evidence.filter((e) => e.kind === "FACT").length;
  const inferenceCount = inv.evidence.filter((e) => e.kind === "INFERENCE").length;
  const assumptionCount = inv.evidence.filter((e) => e.kind === "ASSUMPTION").length;
  const answered = judged.reduce(
    (n, p) => n + OPERATORS.filter((op) => p.operators[op].status === "answered").length,
    0,
  );
  const unknownOps = judged.length * OPERATORS.length - answered;

  return {
    ...inv,
    propositions: inv.propositions.map((p) => (p.role === "root" && parts.length ? { ...p, state: claimState, decision } : p)),
    stages,
    claimState,
    decision,
    findings: unique([...findings, ...inv.refusals]),
    assumptions: inv.evidence.filter((e) => e.kind === "ASSUMPTION").map((e) => e.statement),
    contradictions: inv.evidence.filter((e) => e.contradicts).map((e) => e.statement),
    unknowns,
    stewardshipResult,
    forward: [
      `Claim identified in ${domainSpec(domain).label}.`,
      `Keys: ${answered} answered, ${unknownOps} left unknown.`,
      `Evidence on file: ${factCount} fact, ${inferenceCount} inference, ${assumptionCount} assumption.`,
      `Observation is ${observation.status}. Understanding is ${understanding.status}.`,
      `Contradictions: ${inv.evidence.filter((e) => e.contradicts).length}.`,
      `Conclusion state: ${claimState}.`,
    ],
    reverse: {
      earliestUnsupported: earliest?.id ?? null,
      nextAuditTarget: earliest ? NEXT_AUDIT[earliest.id] : "No stage is unresolved. The bound and the failure conditions still limit use.",
      trace: [...stages].reverse().map((s) => ({ id: s.id, label: s.label, status: s.status })),
    },
  };
}

export function createInvestigation(input: CreateInput): Investigation {
  const claim = input.claim.replace(/\s+/g, " ").trim();
  const createdAt = input.createdAt ?? new Date().toISOString();
  const id = input.id ?? hashId("inv", `${claim}|${input.domain}|${createdAt}`);
  const parts = input.parts ?? decomposeClaim(claim);
  const root: Proposition = {
    id: hashId("p", `${id}|root|${claim}`),
    text: claim,
    role: "root",
    state: "PROPOSED",
    decision: "",
    operators: blankOperators(),
  };
  const children: Proposition[] = parts.map((text, i) => ({
    id: hashId("p", `${id}|${i}|${text}`),
    text,
    role: "part",
    state: "PROPOSED",
    decision: "",
    operators: blankOperators(),
  }));
  const blank: Investigation = {
    id,
    createdAt,
    title: input.title?.trim() || truncate(claim, 72),
    claim,
    domain: input.domain,
    bounds: "",
    propositions: [root, ...children],
    evidence: [],
    experiences: [],
    competing: [],
    refusals: [],
    findings: [],
    assumptions: [],
    contradictions: [],
    unknowns: [],
    stages: [],
    claimState: "PROPOSED",
    decision: "",
    forward: [],
    reverse: { earliestUnsupported: "observation", nextAuditTarget: "", trace: [] },
    stewardship: EMPTY_STEWARDSHIP(),
    stewardshipResult: { justified: false, missing: [] },
  };
  return evaluate(blank);
}

function withEval(inv: Investigation, mutate: (draft: Investigation) => void) {
  const draft = structuredClone(inv);
  mutate(draft);
  return evaluate(draft);
}

export function applyEvidence(inv: Investigation, draft: EvidenceDraft) {
  const statement = draft.statement.trim();
  const provenance = draft.provenance.trim();
  if (!statement || !provenance) return inv;
  return withEval(inv, (next) => {
    const row: Evidence = {
      id: hashId("e", `${statement}|${provenance}|${draft.propositionId}|${draft.contradicts ? "c" : "s"}`),
      statement,
      kind: draft.kind,
      standard: draft.standard,
      provenance,
      integrity: draft.integrity?.trim() || evidenceHash(statement, provenance),
      contradicts: Boolean(draft.contradicts),
      propositionId: draft.propositionId,
      relevant: true,
    };
    next.evidence = [...next.evidence.filter((e) => e.id !== row.id), row];
  });
}

export function setOperator(inv: Investigation, propositionId: string, op: Operator, text: string) {
  return withEval(inv, (next) => {
    next.propositions = next.propositions.map((p) =>
      p.id === propositionId ? { ...p, operators: { ...p.operators, [op]: asNote(text) } } : p,
    );
  });
}

export function setBounds(inv: Investigation, bounds: string) {
  return withEval(inv, (next) => {
    next.bounds = bounds;
  });
}

export function addCompeting(inv: Investigation, text: string) {
  const line = text.trim();
  if (!line) return inv;
  return withEval(inv, (next) => {
    if (!next.competing.includes(line)) next.competing = [...next.competing, line];
  });
}

export function addExperience(inv: Investigation, draft: Omit<Experience, "id">) {
  if (!draft.timestamp.trim() || !draft.observer.trim() || !draft.provenance.trim()) return inv;
  return withEval(inv, (next) => {
    const row: Experience = { ...draft, id: hashId("x", `${draft.timestamp}|${draft.observer}|${draft.provenance}|${draft.interpretation}`) };
    next.experiences = [...next.experiences.filter((e) => e.id !== row.id), row];
  });
}

export function setStewardship(inv: Investigation, patch: Partial<StewardshipDraft>) {
  return withEval(inv, (next) => {
    next.stewardship = { ...next.stewardship, ...patch };
  });
}

export function refuseSynthetic(inv: Investigation) {
  const line =
    "Refused: the CSI laboratory trace is synthetic interface geometry. It was not admitted as evidence, measurement, or occupancy.";
  return withEval(inv, (next) => {
    if (!next.refusals.includes(line)) next.refusals = [...next.refusals, line];
  });
}

export function toArtefact(inv: Investigation) {
  return {
    schema: "rpf.investigation/1",
    id: inv.id,
    title: inv.title,
    claim: inv.claim,
    state: inv.claimState,
    domain: inv.domain,
    decision: inv.decision,
    bounds: inv.bounds,
    propositions: inv.propositions.map((p) => ({
      id: p.id,
      role: p.role,
      text: p.text,
      state: p.state,
      decision: p.decision,
      operators: p.operators,
    })),
    evidenceManifest: inv.evidence,
    dependencyGraph: inv.stages,
    competing: inv.competing,
    assumptions: inv.assumptions,
    contradictions: inv.contradictions,
    unknowns: inv.unknowns,
    findings: inv.findings,
    refusals: inv.refusals,
    experiences: inv.experiences,
    forward: inv.forward,
    reverse: inv.reverse,
    stewardship: { ...inv.stewardship, ...inv.stewardshipResult },
  };
}
