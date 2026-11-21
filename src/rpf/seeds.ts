import { addCompeting, addExperience, applyEvidence, createInvestigation, setBounds, setOperator } from "./engine.ts";
import type { Investigation } from "./types.ts";

const WHEN = "2026-11-21T11:00:00.000Z";

export function buildSeeds(): Investigation[] {
  const csiRoot = "The Raspberry Pi detected a person moving behind a wall using Wi-Fi CSI.";
  let csi = createInvestigation({
    id: "csi-occupancy",
    createdAt: WHEN,
    title: "CSI occupancy",
    claim: csiRoot,
    domain: "cybersecurity",
  });
  csi = applyEvidence(csi, {
    statement: "Monitor mode was reported active on the Raspberry Pi wireless interface.",
    kind: "FACT",
    standard: "report",
    provenance: "Operator report of Nexmon monitor mode. Not a CSI capture file.",
    contradicts: false,
    propositionId: csi.propositions[0].id,
  });

  let arithmetic = createInvestigation({
    id: "arith-2-2",
    createdAt: WHEN,
    title: "Integer arithmetic",
    claim: "In integer arithmetic, 2 + 2 = 4.",
    domain: "mathematics",
  });
  const root = arithmetic.propositions[0].id;
  arithmetic = applyEvidence(arithmetic, {
    statement: "Addition is defined by recursion on the successor: S(S(0)) + S(S(0)) = S(S(S(S(0)))).",
    kind: "FACT",
    standard: "formal",
    provenance: "Peano arithmetic, addition by recursion.",
    contradicts: false,
    propositionId: root,
  });
  arithmetic = applyEvidence(arithmetic, {
    statement: "The symbol '+' in the claim is this successor addition, not a count of physical objects.",
    kind: "INFERENCE",
    standard: "formal",
    provenance: "Reading of the claim against the cited definition.",
    contradicts: false,
    propositionId: root,
  });
  arithmetic = setOperator(arithmetic, root, "WHAT", "The sum of two and two in the integers.");
  arithmetic = setOperator(arithmetic, root, "HOW", "Addition by recursion on the successor.");
  arithmetic = setBounds(
    arithmetic,
    "Holds for integer arithmetic as defined. It says nothing about clocks, measurements, or other number systems.",
  );
  arithmetic = addExperience(arithmetic, {
    timestamp: WHEN,
    observer: "Formal check",
    vision: "",
    sound: "",
    emotion: "",
    environment: "Integer arithmetic under the successor definition.",
    interpretation: "The derivation matches the claim inside that definition.",
    interpretationKind: "inference",
    confidence: "High inside the stated system. None outside it.",
    provenance: "Single recorded replay of the derivation.",
  });
  arithmetic = addCompeting(
    arithmetic,
    "A different definition of '+' — concatenation, modular wrap, or a broken encoding — would not yield 4.",
  );

  let stars = createInvestigation({
    id: "astro-mars",
    createdAt: WHEN,
    title: "Tradition and prediction",
    claim: "Mars in the seventh house predicts conflict this week.",
    domain: "astrological",
    parts: [
      "Mars in the seventh house predicts conflict this week.",
      "Within the stated tradition, Mars in the seventh house is read as conflict.",
    ],
  });
  const predictive = stars.propositions.find((p) => p.role === "part" && p.text.startsWith("Mars in"))!;
  const reading = stars.propositions.find((p) => p.text.startsWith("Within the stated"))!;
  const tradition = {
    statement: "In the cited tradition, Mars in the seventh house is read as conflict.",
    kind: "FACT" as const,
    standard: "tradition" as const,
    provenance: "Named interpretive tradition, internal rule only.",
    contradicts: false,
  };
  stars = applyEvidence(stars, { ...tradition, propositionId: reading.id });
  stars = applyEvidence(stars, { ...tradition, propositionId: predictive.id });

  return [csi, arithmetic, stars];
}
