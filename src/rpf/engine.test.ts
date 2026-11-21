import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyEvidence,
  createInvestigation,
  decomposeClaim,
  refuseSynthetic,
  setOperator,
  setStewardship,
} from "./engine.ts";
import { buildSeeds } from "./seeds.ts";
import { sha256 } from "./sha256.ts";
import type { StewardshipDraft } from "./types.ts";

describe("sha256", () => {
  it("matches the abc vector", () => {
    assert.equal(sha256("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
});

describe("decompose", () => {
  it("splits the CSI compound claim into independent propositions", () => {
    assert.deepEqual(decomposeClaim("The Raspberry Pi detected a person moving behind a wall using Wi-Fi CSI."), [
      "The Raspberry Pi produced CSI measurements.",
      "Those measurements contained measurable changes.",
      "The changes were associated with physical movement.",
      "The movement was caused by a person.",
      "The person was located behind a wall.",
    ]);
  });

  it("does not split a single arithmetic proposition", () => {
    assert.deepEqual(decomposeClaim("In integer arithmetic, 2 + 2 = 4."), []);
  });
});

describe("evaluation", () => {
  it("leaves a fresh CSI claim proposed and does not invent operator answers", () => {
    const inv = createInvestigation({
      claim: "The Raspberry Pi detected a person moving behind a wall using Wi-Fi CSI.",
      domain: "cybersecurity",
    });
    assert.equal(inv.claimState, "PROPOSED");
    assert.equal(inv.stages.find((s) => s.id === "reality")?.status, "defined");
    assert.equal(inv.stages.find((s) => s.id === "observation")?.status, "unresolved");
    assert.equal(inv.reverse.earliestUnsupported, "observation");
    assert.ok(inv.propositions.every((p) => Object.values(p.operators).every((o) => o.status === "unknown" && o.text === "Unknown.")));
  });

  it("does not treat a monitor-mode report as CSI", () => {
    const seeds = buildSeeds();
    const csi = seeds[0];
    assert.equal(csi.claimState, "PROPOSED");
    assert.equal(csi.stages.find((s) => s.id === "observation")?.status, "unresolved");
    assert.equal(csi.evidence[0].relevant, false);
    assert.ok(csi.findings.some((f) => /monitor mode does not establish csi/i.test(f)));
    assert.notEqual(csi.claimState, "SUPPORTED");
    assert.notEqual(csi.claimState, "DEMONSTRATED");
  });

  it("keeps a filled stewardship form unjustified when the chain is open", () => {
    const filled: StewardshipDraft = {
      what: "Stop",
      why: "No",
      how: "Do not act",
      who: "Operator",
      where: "Bench",
      when: "Now",
      limits: "None of this is shown",
      failure: "If a capture appears",
      monitoring: "Recheck",
      preservation: "Keep the refusal",
      revision: "On a real capture",
      transmission: "Do not publish occupancy",
    };
    const next = setStewardship(buildSeeds()[0], filled);
    assert.equal(next.stewardshipResult.justified, false);
    assert.equal(next.stages.find((s) => s.id === "stewardship")?.status, "unresolved");
  });

  it("records a contradicting measurement without upgrading the claim", () => {
    let inv = createInvestigation({ claim: "The capture file contains CSI samples.", domain: "cybersecurity" });
    inv = applyEvidence(inv, {
      statement: "The capture file contains no CSI samples.",
      kind: "FACT",
      standard: "measurement",
      provenance: "Local inspection of the capture file.",
      contradicts: true,
      propositionId: inv.propositions[0].id,
    });
    assert.equal(inv.claimState, "UNRESOLVED");
    assert.equal(inv.stages.find((s) => s.id === "observation")?.status, "justified");
    assert.equal(inv.stages.find((s) => s.id === "knowledge")?.status, "unresolved");
    assert.equal(inv.reverse.earliestUnsupported, "experience");
  });

  it("can demonstrate bounded arithmetic and still withhold stewardship", () => {
    const math = buildSeeds()[1];
    assert.equal(math.claimState, "DEMONSTRATED");
    assert.equal(math.stages.find((s) => s.id === "knowledge")?.status, "justified");
    assert.equal(math.stages.find((s) => s.id === "wisdom")?.status, "justified");
    assert.equal(math.stages.find((s) => s.id === "stewardship")?.status, "unresolved");
    assert.equal(math.reverse.earliestUnsupported, "stewardship");
    assert.match(math.decision, /does not itself justify stewardship/i);
  });

  it("does not let operator notes upgrade a claim", () => {
    let inv = createInvestigation({ claim: "The bench supply is stable.", domain: "engineering" });
    inv = setOperator(inv, inv.propositions[0].id, "WHAT", "A bench power supply.");
    inv = setOperator(inv, inv.propositions[0].id, "HOW", "Measured at the posts.");
    assert.equal(inv.claimState, "PROPOSED");
  });

  it("keeps a prediction unresolved when only tradition evidence is offered", () => {
    const stars = buildSeeds()[2];
    const predictive = stars.propositions.find((p) => p.text.startsWith("Mars in"))!;
    const reading = stars.propositions.find((p) => p.text.startsWith("Within the stated"))!;
    assert.equal(predictive.state, "UNRESOLVED");
    assert.equal(reading.state, "SUPPORTED");
    assert.equal(stars.claimState, "UNRESOLVED");
    assert.equal(stars.stages.find((s) => s.id === "observation")?.status, "unresolved");
    assert.ok(reading.decision.toLowerCase().includes("empirical"));
  });

  it("refuses a synthetic trace as evidence", () => {
    const next = refuseSynthetic(buildSeeds()[0]);
    assert.equal(next.evidence.length, buildSeeds()[0].evidence.length);
    assert.ok(next.refusals.some((r) => /not admitted as evidence/i.test(r)));
    assert.equal(next.claimState, "PROPOSED");
  });
});
