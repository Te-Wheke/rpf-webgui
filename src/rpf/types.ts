export const STAGE_ORDER = [
  "reality",
  "observation",
  "experience",
  "understanding",
  "language",
  "knowledge",
  "wisdom",
  "stewardship",
] as const;

export type StageId = (typeof STAGE_ORDER)[number];

export const OPERATORS = ["WHAT", "HOW", "WHEN", "WHY", "WHERE", "WHO"] as const;
export type Operator = (typeof OPERATORS)[number];

export const CLAIM_STATES = ["DEMONSTRATED", "SUPPORTED", "REASONED", "PROPOSED", "UNRESOLVED"] as const;
export type ClaimState = (typeof CLAIM_STATES)[number];

export const DOMAIN_IDS = [
  "science",
  "mathematics",
  "legal",
  "medical",
  "political",
  "cultural",
  "historical",
  "astrological",
  "chemistry",
  "cybersecurity",
  "engineering",
  "philosophy",
  "religion",
] as const;
export type DomainId = (typeof DOMAIN_IDS)[number];

export type AssertionKind = "FACT" | "INFERENCE" | "ASSUMPTION" | "PROPOSAL" | "UNKNOWN";
export type EvidenceStandard = "measurement" | "observation" | "formal" | "authority" | "tradition" | "report";
export type StageStatus = "defined" | "justified" | "unresolved";

export type OperatorNote = { text: string; status: "answered" | "unknown" };

export type Proposition = {
  id: string;
  text: string;
  role: "root" | "part";
  state: ClaimState;
  decision: string;
  operators: Record<Operator, OperatorNote>;
};

export type Evidence = {
  id: string;
  statement: string;
  kind: AssertionKind;
  standard: EvidenceStandard;
  provenance: string;
  integrity: string;
  contradicts: boolean;
  propositionId: string;
  relevant: boolean;
};

export type Experience = {
  id: string;
  timestamp: string;
  observer: string;
  vision: string;
  sound: string;
  emotion: string;
  environment: string;
  interpretation: string;
  interpretationKind: "reported" | "inference" | "";
  confidence: string;
  provenance: string;
};

export type StewardshipDraft = {
  what: string;
  why: string;
  how: string;
  who: string;
  where: string;
  when: string;
  limits: string;
  failure: string;
  monitoring: string;
  preservation: string;
  revision: string;
  transmission: string;
};

export type StageRecord = {
  id: StageId;
  label: string;
  required: string;
  status: StageStatus;
  output: string | null;
  justification: string;
  blockedBy: string | null;
};

export type Investigation = {
  id: string;
  createdAt: string;
  title: string;
  claim: string;
  domain: DomainId;
  bounds: string;
  propositions: Proposition[];
  evidence: Evidence[];
  experiences: Experience[];
  competing: string[];
  refusals: string[];
  findings: string[];
  assumptions: string[];
  contradictions: string[];
  unknowns: string[];
  stages: StageRecord[];
  claimState: ClaimState;
  decision: string;
  forward: string[];
  reverse: {
    earliestUnsupported: StageId | null;
    nextAuditTarget: string;
    trace: { id: StageId; label: string; status: StageStatus }[];
  };
  stewardship: StewardshipDraft;
  stewardshipResult: { justified: boolean; missing: string[] };
};

export const STAGE_META: { id: StageId; label: string; required: string }[] = [
  { id: "reality", label: "Reality", required: "Defined target phenomenon or system" },
  { id: "observation", label: "Observation", required: "Recorded measurements or observations" },
  { id: "experience", label: "Experience", required: "Contextualised observations and interactions" },
  { id: "understanding", label: "Understanding", required: "Interpretation, kept distinct from observation" },
  { id: "language", label: "Language", required: "Explicit representation of the interpretation" },
  { id: "knowledge", label: "Knowledge", required: "Justified and bounded claim" },
  { id: "wisdom", label: "Wisdom", required: "Limits and at least one competing account" },
  { id: "stewardship", label: "Stewardship", required: "Justified decision, investigation, or non-action" },
];

export const EMPTY_STEWARDSHIP = (): StewardshipDraft => ({
  what: "",
  why: "",
  how: "",
  who: "",
  where: "",
  when: "",
  limits: "",
  failure: "",
  monitoring: "",
  preservation: "",
  revision: "",
  transmission: "",
});
