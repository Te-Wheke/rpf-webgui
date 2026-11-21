import type { DomainId, Operator } from "./types.ts";

export type DomainSpec = {
  id: DomainId;
  label: string;
  summary: string;
  operators: Operator[];
};

export const DOMAINS: DomainSpec[] = [
  {
    id: "science",
    label: "Science",
    summary: "Empirical observations, reproducibility, falsifiability.",
    operators: ["WHAT", "HOW"],
  },
  {
    id: "mathematics",
    label: "Mathematics",
    summary: "Formal definitions, axioms, proofs. A derivation is not a physical measurement.",
    operators: ["WHAT", "HOW"],
  },
  {
    id: "legal",
    label: "Legal",
    summary: "Jurisdiction, legislation, precedent, authority.",
    operators: ["WHERE", "WHO"],
  },
  {
    id: "medical",
    label: "Medical",
    summary: "Clinical evidence, uncertainty, risk. This console does not diagnose.",
    operators: ["WHAT", "HOW", "WHO"],
  },
  {
    id: "political",
    label: "Political",
    summary: "Institutions, competing claims, source independence.",
    operators: ["WHO", "WHERE"],
  },
  {
    id: "cultural",
    label: "Cultural",
    summary: "Context, tikanga, provenance, appropriate authority. Tikanga is not certified here.",
    operators: ["WHO", "WHERE"],
  },
  {
    id: "historical",
    label: "Historical",
    summary: "Primary sources, chronology, corroboration.",
    operators: ["WHEN", "WHO"],
  },
  {
    id: "astrological",
    label: "Astrological",
    summary: "Interpretive tradition and internal consistency. Prediction is a separate, empirical standard.",
    operators: ["WHAT", "WHERE"],
  },
  {
    id: "chemistry",
    label: "Chemistry",
    summary: "Chemical identity, measurements, experimental conditions.",
    operators: ["WHAT", "HOW"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    summary: "Authorised observation. A verified finding stays distinct from a hypothesis.",
    operators: ["WHAT", "HOW", "WHERE"],
  },
  {
    id: "engineering",
    label: "Engineering",
    summary: "Mechanism, conditions, and failure modes.",
    operators: ["WHAT", "HOW"],
  },
  {
    id: "philosophy",
    label: "Philosophy",
    summary: "Definitions and argument. An argument is not, by itself, a fact about the world.",
    operators: ["WHAT", "WHY"],
  },
  {
    id: "religion",
    label: "Religion",
    summary: "Tradition and authority. Authority is not treated as proof of the claim.",
    operators: ["WHAT", "WHO"],
  },
];

export function domainSpec(id: DomainId) {
  return DOMAINS.find((d) => d.id === id) ?? DOMAINS[0];
}
