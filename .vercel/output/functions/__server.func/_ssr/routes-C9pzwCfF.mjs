import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C9pzwCfF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DOMAINS = [
	{
		id: "science",
		label: "Science",
		summary: "Empirical observations, reproducibility, falsifiability.",
		operators: ["WHAT", "HOW"]
	},
	{
		id: "mathematics",
		label: "Mathematics",
		summary: "Formal definitions, axioms, proofs. A derivation is not a physical measurement.",
		operators: ["WHAT", "HOW"]
	},
	{
		id: "legal",
		label: "Legal",
		summary: "Jurisdiction, legislation, precedent, authority.",
		operators: ["WHERE", "WHO"]
	},
	{
		id: "medical",
		label: "Medical",
		summary: "Clinical evidence, uncertainty, risk. This console does not diagnose.",
		operators: [
			"WHAT",
			"HOW",
			"WHO"
		]
	},
	{
		id: "political",
		label: "Political",
		summary: "Institutions, competing claims, source independence.",
		operators: ["WHO", "WHERE"]
	},
	{
		id: "cultural",
		label: "Cultural",
		summary: "Context, tikanga, provenance, appropriate authority. Tikanga is not certified here.",
		operators: ["WHO", "WHERE"]
	},
	{
		id: "historical",
		label: "Historical",
		summary: "Primary sources, chronology, corroboration.",
		operators: ["WHEN", "WHO"]
	},
	{
		id: "astrological",
		label: "Astrological",
		summary: "Interpretive tradition and internal consistency. Prediction is a separate, empirical standard.",
		operators: ["WHAT", "WHERE"]
	},
	{
		id: "chemistry",
		label: "Chemistry",
		summary: "Chemical identity, measurements, experimental conditions.",
		operators: ["WHAT", "HOW"]
	},
	{
		id: "cybersecurity",
		label: "Cybersecurity",
		summary: "Authorised observation. A verified finding stays distinct from a hypothesis.",
		operators: [
			"WHAT",
			"HOW",
			"WHERE"
		]
	},
	{
		id: "engineering",
		label: "Engineering",
		summary: "Mechanism, conditions, and failure modes.",
		operators: ["WHAT", "HOW"]
	},
	{
		id: "philosophy",
		label: "Philosophy",
		summary: "Definitions and argument. An argument is not, by itself, a fact about the world.",
		operators: ["WHAT", "WHY"]
	},
	{
		id: "religion",
		label: "Religion",
		summary: "Tradition and authority. Authority is not treated as proof of the claim.",
		operators: ["WHAT", "WHO"]
	}
];
function domainSpec(id) {
	return DOMAINS.find((d) => d.id === id) ?? DOMAINS[0];
}
var K = new Uint32Array([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
function rotr(x, n) {
	return x >>> n | x << 32 - n;
}
/** Sync SHA-256 so evidence hashes are identical in the browser and in tests. */
function sha256(message) {
	const bytes = new TextEncoder().encode(message);
	const blocks = Math.ceil((bytes.length + 9) / 64);
	const padded = new Uint8Array(blocks * 64);
	padded.set(bytes);
	padded[bytes.length] = 128;
	const view = new DataView(padded.buffer);
	view.setUint32(padded.length - 4, bytes.length * 8);
	let h0 = 1779033703;
	let h1 = 3144134277;
	let h2 = 1013904242;
	let h3 = 2773480762;
	let h4 = 1359893119;
	let h5 = 2600822924;
	let h6 = 528734635;
	let h7 = 1541459225;
	const w = /* @__PURE__ */ new Uint32Array(64);
	for (let i = 0; i < padded.length; i += 64) {
		for (let t = 0; t < 16; t++) w[t] = view.getUint32(i + t * 4);
		for (let t = 16; t < 64; t++) {
			const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ w[t - 15] >>> 3;
			const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ w[t - 2] >>> 10;
			w[t] = w[t - 16] + s0 + w[t - 7] + s1 >>> 0;
		}
		let a = h0;
		let b = h1;
		let c = h2;
		let d = h3;
		let e = h4;
		let f = h5;
		let g = h6;
		let h = h7;
		for (let t = 0; t < 64; t++) {
			const s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
			const ch = e & f ^ ~e & g;
			const temp1 = h + s1 + ch + K[t] + w[t] >>> 0;
			const temp2 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + (a & b ^ a & c ^ b & c) >>> 0;
			h = g;
			g = f;
			f = e;
			e = d + temp1 >>> 0;
			d = c;
			c = b;
			b = a;
			a = temp1 + temp2 >>> 0;
		}
		h0 = h0 + a >>> 0;
		h1 = h1 + b >>> 0;
		h2 = h2 + c >>> 0;
		h3 = h3 + d >>> 0;
		h4 = h4 + e >>> 0;
		h5 = h5 + f >>> 0;
		h6 = h6 + g >>> 0;
		h7 = h7 + h >>> 0;
	}
	return [
		h0,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		h7
	].map((x) => x.toString(16).padStart(8, "0")).join("");
}
function evidenceHash(statement, provenance) {
	return sha256(`${statement}\n${provenance}`);
}
var STAGE_ORDER = [
	"reality",
	"observation",
	"experience",
	"understanding",
	"language",
	"knowledge",
	"wisdom",
	"stewardship"
];
var OPERATORS = [
	"WHAT",
	"HOW",
	"WHEN",
	"WHY",
	"WHERE",
	"WHO"
];
var STAGE_META = [
	{
		id: "reality",
		label: "Reality",
		required: "Defined target phenomenon or system"
	},
	{
		id: "observation",
		label: "Observation",
		required: "Recorded measurements or observations"
	},
	{
		id: "experience",
		label: "Experience",
		required: "Contextualised observations and interactions"
	},
	{
		id: "understanding",
		label: "Understanding",
		required: "Interpretation, kept distinct from observation"
	},
	{
		id: "language",
		label: "Language",
		required: "Explicit representation of the interpretation"
	},
	{
		id: "knowledge",
		label: "Knowledge",
		required: "Justified and bounded claim"
	},
	{
		id: "wisdom",
		label: "Wisdom",
		required: "Limits and at least one competing account"
	},
	{
		id: "stewardship",
		label: "Stewardship",
		required: "Justified decision, investigation, or non-action"
	}
];
var EMPTY_STEWARDSHIP = () => ({
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
	transmission: ""
});
var CSI_PARTS = [
	"The Raspberry Pi produced CSI measurements.",
	"Those measurements contained measurable changes.",
	"The changes were associated with physical movement.",
	"The movement was caused by a person.",
	"The person was located behind a wall."
];
var NEXT_AUDIT = {
	reality: "Name the target. The name is not the thing.",
	observation: "Record a measurement, or a domain-appropriate observation, with provenance. A report of a different capability does not fill this gap.",
	experience: "Attach observer, time, and context. Do not treat an inference as experience.",
	understanding: "State the interpretation and mark it as inference, separate from the record.",
	language: "Keep the proposition explicit. Wording is not yet knowledge.",
	knowledge: "Bound the claim. Write what it does not establish.",
	wisdom: "Record a competing explanation and the way the claim can fail.",
	stewardship: "Stewardship needs what, why, how, who, where, when, limits, failure conditions, monitoring, preservation, revision, and transmission. Blank fields are not permission."
};
function hashId(prefix, seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return `${prefix}-${(h >>> 0).toString(16)}`;
}
function norm(s) {
	return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function truncate(s, n) {
	const t = s.replace(/\s+/g, " ").trim();
	return t.length <= n ? t : `${t.slice(0, n - 1)}…`;
}
function unique(list) {
	return [...new Set(list.filter(Boolean))];
}
function decomposeClaim(raw) {
	const text = raw.replace(/\s+/g, " ").trim();
	if (!text) return [];
	const key = norm(text);
	if (key.includes("raspberry pi") && key.includes("behind a wall") && key.includes("csi")) return [...CSI_PARTS];
	const sentences = text.split(/;+|(?<=\.)\s+/).map((s) => s.trim()).filter(Boolean);
	const out = [];
	for (const sentence of sentences) {
		const clause = sentence.replace(/[.?!]+$/, "").trim();
		for (const bit of splitAnd(clause)) out.push(...peel(bit));
	}
	const parts = unique(out.map((s) => /[.?!]$/.test(s) ? s : `${s}.`));
	if (parts.length === 1 && norm(parts[0]) === key) return [];
	return parts.slice(0, 12);
}
function splitAnd(s) {
	const bits = s.split(/\s+\b(?:and|but)\b\s+/i).map((b) => b.trim()).filter(Boolean);
	if (bits.length < 2) return [s];
	if (bits.every((b) => b.split(/\s+/).length >= 3)) return bits;
	return [s];
}
function peel(s) {
	const extras = [];
	let core = s.trim();
	const using = core.match(/\b(?:using|via|through)\s+(.+)$/i);
	if (using && using.index !== void 0) {
		extras.push(`The method used is ${using[1].replace(/[.]+$/, "")}.`);
		core = core.slice(0, using.index).trim();
	}
	const because = core.match(/\bbecause\s+(.+)$/i);
	if (because && because.index !== void 0) {
		extras.push(because[1].replace(/[.]+$/, ""));
		core = core.slice(0, because.index).trim();
	}
	if (core && !/[.?!]$/.test(core)) core = `${core}.`;
	return [core, ...extras.map((e) => /[.?!]$/.test(e) ? e : `${e}.`)].filter((x) => x.length > 2);
}
function blankOperators() {
	return {
		WHAT: {
			text: "Unknown.",
			status: "unknown"
		},
		HOW: {
			text: "Unknown.",
			status: "unknown"
		},
		WHEN: {
			text: "Unknown.",
			status: "unknown"
		},
		WHY: {
			text: "Unknown.",
			status: "unknown"
		},
		WHERE: {
			text: "Unknown.",
			status: "unknown"
		},
		WHO: {
			text: "Unknown.",
			status: "unknown"
		}
	};
}
function asNote(text) {
	const t = text.trim();
	if (!t || /^unknown\b/i.test(t)) return {
		text: t || "Unknown.",
		status: "unknown"
	};
	return {
		text: t,
		status: "answered"
	};
}
function isPredictive(text) {
	return /\b(predicts?|forecasts?|guarantees)\b/i.test(text);
}
function isMonitorOnly(statement) {
	return /monitor mode/i.test(statement) && !/\bcsi\b/i.test(statement);
}
function isMonitorProposition(text) {
	return /monitor mode/i.test(text) && !/\bcsi\b/i.test(text);
}
function bearsOn(domain, evidence, text) {
	if (domain === "cybersecurity" && isMonitorOnly(evidence.statement) && !isMonitorProposition(text)) return false;
	if (domain === "astrological" && (evidence.standard === "tradition" || evidence.standard === "authority") && isPredictive(text)) return false;
	return true;
}
function standardOk(domain, text, standard) {
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
function weaker(current, cap) {
	if (current === "UNRESOLVED" || cap === "UNRESOLVED") return "UNRESOLVED";
	const order = [
		"PROPOSED",
		"REASONED",
		"SUPPORTED",
		"DEMONSTRATED"
	];
	return order[Math.min(order.indexOf(current), order.indexOf(cap))];
}
function aggregate(states) {
	if (states.length === 0) return "PROPOSED";
	if (states.includes("UNRESOLVED")) return "UNRESOLVED";
	if (states.includes("PROPOSED")) return "PROPOSED";
	if (states.includes("REASONED")) return "REASONED";
	if (states.includes("SUPPORTED")) return "SUPPORTED";
	return "DEMONSTRATED";
}
function judge(domain, prop, evidence) {
	const linked = evidence.filter((e) => e.propositionId === prop.id);
	if (domain === "astrological" && isPredictive(prop.text)) {
		if (linked.filter((e) => !e.contradicts && e.kind === "FACT" && (e.standard === "measurement" || e.standard === "observation")).length === 0) {
			if (linked.length) return {
				state: "UNRESOLVED",
				decision: "Tradition-internal evidence does not establish a prediction. The predicted event is unresolved."
			};
			return {
				state: "PROPOSED",
				decision: "Proposition identified. No evidence linked. Not evaluated."
			};
		}
	}
	const bearing = linked.filter((e) => bearsOn(domain, e, prop.text));
	if (bearing.filter((e) => e.contradicts && (e.kind === "FACT" || e.kind === "INFERENCE")).length) return {
		state: "UNRESOLVED",
		decision: "Evidence conflicts with this proposition. The conflict stays open and is not averaged away."
	};
	const facts = bearing.filter((e) => e.kind === "FACT" && !e.contradicts && standardOk(domain, prop.text, e.standard));
	const reasoned = bearing.filter((e) => e.kind === "INFERENCE" || e.kind === "ASSUMPTION");
	if (!facts.length) {
		if (reasoned.length) return {
			state: "REASONED",
			decision: "Reasoning is recorded. Inference and assumption are not observation, so the proposition is not supported."
		};
		if (linked.length) return {
			state: "PROPOSED",
			decision: "Material was linked. It does not bear on this proposition as evidence. State remains proposed."
		};
		return {
			state: "PROPOSED",
			decision: "Proposition identified. No evidence linked. Not evaluated."
		};
	}
	const missing = domainSpec(domain).operators.filter((op) => prop.operators[op].status === "unknown");
	let cap = "DEMONSTRATED";
	const limits = [];
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
		if (new Set(facts.map((f) => f.provenance.trim().toLowerCase()).filter(Boolean)).size < 2) {
			cap = weaker(cap, "SUPPORTED");
			limits.push(domain === "historical" ? "corroboration is unmet" : "source independence is unmet");
		}
	}
	if (cap === "DEMONSTRATED") return {
		state: "DEMONSTRATED",
		decision: "The linked evidence meets this domain's standard, and the required operators are answered. The claim is only as wide as its bound."
	};
	if (cap === "REASONED") return {
		state: "REASONED",
		decision: `Facts are on file, but they do not carry the proposition: ${limits.join("; ")}.`
	};
	return {
		state: "SUPPORTED",
		decision: `Evidence supports the proposition only within limits: ${limits.join("; ")}.`
	};
}
function stage(id, status, output, justification, blockedBy) {
	const meta = STAGE_META.find((s) => s.id === id);
	return {
		id,
		label: meta.label,
		required: meta.required,
		status,
		output,
		justification,
		blockedBy
	};
}
function recordedObservation(domain, evidence, props) {
	if (evidence.kind !== "FACT") return false;
	const prop = props.find((p) => p.id === evidence.propositionId);
	if (!prop) return false;
	if (domain === "astrological" && props.some((p) => p.role === "part" && isPredictive(p.text) || p.role === "root" && isPredictive(p.text) && props.length === 1)) return evidence.standard === "measurement" || evidence.standard === "observation";
	if (domain === "astrological" && props.some((p) => isPredictive(p.text))) return evidence.standard === "measurement" || evidence.standard === "observation";
	return standardOk(domain, prop.text, evidence.standard);
}
function testStewardship(inv) {
	const missing = [];
	for (const [key, label] of [
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
		["transmission", "TRANSMISSION"]
	]) if (!inv.stewardship[key].trim()) missing.push(label);
	const knowledge = inv.stages.find((s) => s.id === "knowledge");
	if (!knowledge || knowledge.status !== "justified") missing.push("Knowledge stage is not justified");
	if (inv.contradictions.length) missing.push("Contradictions are unresolved");
	if (inv.claimState === "PROPOSED" || inv.claimState === "UNRESOLVED") missing.push("Claim state does not support a decision");
	if (inv.claimState === "REASONED") missing.push("Reasoning alone does not justify stewardship");
	return {
		justified: missing.length === 0,
		missing
	};
}
function composeDecision(claimState, judged, knowledgeJustified, stewardshipJustified) {
	let text;
	if (judged.length > 1) {
		text = `Compound claim is ${claimState}. ${judged.map((p) => `${p.state} — ${truncate(p.text, 78)}`).join(" · ")}.`;
		if (claimState === "UNRESOLVED") text += " Unresolved constituents block the compound claim.";
		if (judged.every((p) => p.state === "PROPOSED")) text = "Compound claim, still proposed. No constituent is established. Identification is not evaluation.";
	} else text = judged[0]?.decision ?? "No proposition.";
	if ((claimState === "SUPPORTED" || claimState === "DEMONSTRATED") && !knowledgeJustified && claimState !== "DEMONSTRATED") text += " The knowledge stage is unresolved, so this is not demonstrated.";
	if (claimState === "DEMONSTRATED") text += stewardshipJustified ? " Stewardship is justified only inside the recorded limits." : " Demonstration does not itself justify stewardship.";
	return text;
}
function evaluate(input) {
	const inv = structuredClone(input);
	const domain = inv.domain;
	const findings = [];
	inv.propositions = inv.propositions.map((prop) => {
		const judged = judge(domain, prop, inv.evidence);
		return {
			...prop,
			state: judged.state,
			decision: judged.decision
		};
	});
	inv.evidence = inv.evidence.map((e) => {
		const prop = inv.propositions.find((p) => p.id === e.propositionId);
		const relevant = prop ? bearsOn(domain, e, prop.text) && !(domain === "astrological" && isPredictive(prop.text) && e.standard === "tradition") : false;
		if (prop && !relevant && isMonitorOnly(e.statement)) findings.push("A monitor-mode report is on file. Monitor mode does not establish CSI extraction.");
		if (prop && domain === "astrological" && isPredictive(prop.text) && (e.standard === "tradition" || e.standard === "authority")) findings.push("Tradition evidence was offered for a prediction. It does not establish the predicted event.");
		if (!e.integrity) findings.push(`Evidence ${e.id} has no SHA-256 integrity hash.`);
		return {
			...e,
			relevant
		};
	});
	if (domain === "cybersecurity" && /monitor mode/i.test(inv.claim) && /\bcsi\b/i.test(inv.claim)) findings.push("Monitor mode and CSI extraction are different capabilities. One does not establish the other.");
	const parts = inv.propositions.filter((p) => p.role === "part");
	const judged = parts.length ? parts : inv.propositions.filter((p) => p.role === "root");
	const raw = aggregate(judged.map((p) => p.state));
	const observed = inv.evidence.filter((e) => recordedObservation(domain, e, inv.propositions));
	const observationJustified = observed.length > 0;
	const observation = observationJustified ? stage("observation", "justified", observed.map((e) => e.statement).join(" "), "A recorded item meets the domain standard for observation. The record is not the phenomenon, and a contradicting record still counts only as a record.", null) : stage("observation", "unresolved", null, "No recorded observation meets the domain standard.", "No recorded observation meets the domain standard.");
	const experienceReady = inv.experiences.filter((e) => e.timestamp.trim() && e.observer.trim() && e.provenance.trim());
	const experience = !observationJustified ? stage("experience", "unresolved", null, "Experience is not reached while observation is unresolved.", "Observation is unresolved.") : experienceReady.length ? stage("experience", "justified", experienceReady.map((e) => `${e.observer} @ ${e.timestamp}`).join("; "), "Experience contextualises the observation. Emotion, image, and sound stay modalities. They are not interchangeable with the measurement. An affective note is a report or an inference, not a measurement of emotion.", null) : stage("experience", "unresolved", null, "Observation is on record. Observer, time, and provenance are not.", "No experience record with observer, time, and provenance.");
	const inferences = [...inv.evidence.filter((e) => e.kind === "INFERENCE").map((e) => e.statement), ...inv.experiences.filter((e) => e.interpretationKind === "inference" && e.interpretation.trim()).map((e) => e.interpretation.trim())];
	const understanding = experience.status !== "justified" ? stage("understanding", "unresolved", null, "Understanding is not reached while experience is unresolved.", "Experience is unresolved.") : inferences.length ? stage("understanding", "justified", inferences.join(" "), "This is an interpretation. It is not promoted to an observation.", null) : stage("understanding", "unresolved", null, "No interpretation has been separated from the record.", "No inference is marked.");
	const language = understanding.status !== "justified" ? stage("language", "unresolved", null, "Language represents an interpretation. There is not yet an interpretation to represent.", "Understanding is unresolved.") : stage("language", "justified", inv.claim, "The claim is an explicit representation of the interpretation. The wording is not knowledge.", null);
	const contradicted = inv.evidence.some((e) => e.contradicts && e.relevant);
	const knowledgeBlocked = language.status !== "justified" ? "Language is unresolved." : raw === "PROPOSED" || raw === "UNRESOLVED" || raw === "REASONED" ? "The proposition is not supported." : !inv.bounds.trim() ? "No bound is recorded. Unbounded support is not knowledge." : contradicted ? "A contradiction is open." : null;
	const knowledge = knowledgeBlocked ? stage("knowledge", "unresolved", null, "Knowledge is not justified.", knowledgeBlocked) : stage("knowledge", "justified", `${raw}. Bound: ${inv.bounds.trim()}`, "The claim is supported and bounded. The bound is part of the claim.", null);
	const wisdomBlocked = knowledge.status !== "justified" ? "Knowledge is unresolved." : inv.competing.length === 0 ? "No competing explanation is recorded." : null;
	const wisdom = wisdomBlocked ? stage("wisdom", "unresolved", null, "Wisdom is not justified.", wisdomBlocked) : stage("wisdom", "justified", inv.competing.join(" "), "Wisdom here is the recorded limit and the competing accounts. It is not a decision to act.", null);
	const reality = stage("reality", "defined", inv.claim, "The target is named by the claim. Naming it does not establish that it is so.", null);
	let claimState = raw;
	if (raw === "DEMONSTRATED" && knowledge.status !== "justified") claimState = "SUPPORTED";
	const partialStages = [
		reality,
		observation,
		experience,
		understanding,
		language,
		knowledge,
		wisdom
	];
	const stewardshipResult = testStewardship({
		...inv,
		claimState,
		stages: [...partialStages, stage("stewardship", "unresolved", null, "Pending the stewardship test.", null)],
		contradictions: inv.evidence.filter((e) => e.contradicts).map((e) => e.statement)
	});
	const stewardship = stewardshipResult.justified ? stage("stewardship", "justified", inv.stewardship.what.trim(), "The stewardship test passed. It remains inside the recorded limits and failure conditions.", null) : stage("stewardship", "unresolved", null, "Stewardship is not justified.", stewardshipResult.missing[0] ?? "Stewardship test failed.");
	const stages = [...partialStages, stewardship];
	const earliest = stages.find((s) => s.status === "unresolved") ?? null;
	const unknowns = [...judged.flatMap((p) => domainSpec(domain).operators.filter((op) => p.operators[op].status === "unknown").map((op) => `${op} unanswered (${truncate(p.text, 52)})`)), ...stages.filter((s) => s.status === "unresolved").map((s) => `${s.label} stage`)];
	const decision = composeDecision(claimState, judged, knowledge.status === "justified", stewardshipResult.justified);
	const factCount = inv.evidence.filter((e) => e.kind === "FACT").length;
	const inferenceCount = inv.evidence.filter((e) => e.kind === "INFERENCE").length;
	const assumptionCount = inv.evidence.filter((e) => e.kind === "ASSUMPTION").length;
	const answered = judged.reduce((n, p) => n + OPERATORS.filter((op) => p.operators[op].status === "answered").length, 0);
	const unknownOps = judged.length * OPERATORS.length - answered;
	return {
		...inv,
		propositions: inv.propositions.map((p) => p.role === "root" && parts.length ? {
			...p,
			state: claimState,
			decision
		} : p),
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
			`Conclusion state: ${claimState}.`
		],
		reverse: {
			earliestUnsupported: earliest?.id ?? null,
			nextAuditTarget: earliest ? NEXT_AUDIT[earliest.id] : "No stage is unresolved. The bound and the failure conditions still limit use.",
			trace: [...stages].reverse().map((s) => ({
				id: s.id,
				label: s.label,
				status: s.status
			}))
		}
	};
}
function createInvestigation(input) {
	const claim = input.claim.replace(/\s+/g, " ").trim();
	const createdAt = input.createdAt ?? (/* @__PURE__ */ new Date()).toISOString();
	const id = input.id ?? hashId("inv", `${claim}|${input.domain}|${createdAt}`);
	const parts = input.parts ?? decomposeClaim(claim);
	const root = {
		id: hashId("p", `${id}|root|${claim}`),
		text: claim,
		role: "root",
		state: "PROPOSED",
		decision: "",
		operators: blankOperators()
	};
	const children = parts.map((text, i) => ({
		id: hashId("p", `${id}|${i}|${text}`),
		text,
		role: "part",
		state: "PROPOSED",
		decision: "",
		operators: blankOperators()
	}));
	return evaluate({
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
		reverse: {
			earliestUnsupported: "observation",
			nextAuditTarget: "",
			trace: []
		},
		stewardship: EMPTY_STEWARDSHIP(),
		stewardshipResult: {
			justified: false,
			missing: []
		}
	});
}
function withEval(inv, mutate) {
	const draft = structuredClone(inv);
	mutate(draft);
	return evaluate(draft);
}
function applyEvidence(inv, draft) {
	const statement = draft.statement.trim();
	const provenance = draft.provenance.trim();
	if (!statement || !provenance) return inv;
	return withEval(inv, (next) => {
		const row = {
			id: hashId("e", `${statement}|${provenance}|${draft.propositionId}|${draft.contradicts ? "c" : "s"}`),
			statement,
			kind: draft.kind,
			standard: draft.standard,
			provenance,
			integrity: draft.integrity?.trim() || evidenceHash(statement, provenance),
			contradicts: Boolean(draft.contradicts),
			propositionId: draft.propositionId,
			relevant: true
		};
		next.evidence = [...next.evidence.filter((e) => e.id !== row.id), row];
	});
}
function setOperator(inv, propositionId, op, text) {
	return withEval(inv, (next) => {
		next.propositions = next.propositions.map((p) => p.id === propositionId ? {
			...p,
			operators: {
				...p.operators,
				[op]: asNote(text)
			}
		} : p);
	});
}
function setBounds(inv, bounds) {
	return withEval(inv, (next) => {
		next.bounds = bounds;
	});
}
function addCompeting(inv, text) {
	const line = text.trim();
	if (!line) return inv;
	return withEval(inv, (next) => {
		if (!next.competing.includes(line)) next.competing = [...next.competing, line];
	});
}
function addExperience(inv, draft) {
	if (!draft.timestamp.trim() || !draft.observer.trim() || !draft.provenance.trim()) return inv;
	return withEval(inv, (next) => {
		const row = {
			...draft,
			id: hashId("x", `${draft.timestamp}|${draft.observer}|${draft.provenance}|${draft.interpretation}`)
		};
		next.experiences = [...next.experiences.filter((e) => e.id !== row.id), row];
	});
}
function setStewardship(inv, patch) {
	return withEval(inv, (next) => {
		next.stewardship = {
			...next.stewardship,
			...patch
		};
	});
}
function refuseSynthetic(inv) {
	const line = "Refused: the CSI laboratory trace is synthetic interface geometry. It was not admitted as evidence, measurement, or occupancy.";
	return withEval(inv, (next) => {
		if (!next.refusals.includes(line)) next.refusals = [...next.refusals, line];
	});
}
function toArtefact(inv) {
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
			operators: p.operators
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
		stewardship: {
			...inv.stewardship,
			...inv.stewardshipResult
		}
	};
}
var WHEN = "2026-11-21T11:00:00.000Z";
function buildSeeds() {
	let csi = createInvestigation({
		id: "csi-occupancy",
		createdAt: WHEN,
		title: "CSI occupancy",
		claim: "The Raspberry Pi detected a person moving behind a wall using Wi-Fi CSI.",
		domain: "cybersecurity"
	});
	csi = applyEvidence(csi, {
		statement: "Monitor mode was reported active on the Raspberry Pi wireless interface.",
		kind: "FACT",
		standard: "report",
		provenance: "Operator report of Nexmon monitor mode. Not a CSI capture file.",
		contradicts: false,
		propositionId: csi.propositions[0].id
	});
	let arithmetic = createInvestigation({
		id: "arith-2-2",
		createdAt: WHEN,
		title: "Integer arithmetic",
		claim: "In integer arithmetic, 2 + 2 = 4.",
		domain: "mathematics"
	});
	const root = arithmetic.propositions[0].id;
	arithmetic = applyEvidence(arithmetic, {
		statement: "Addition is defined by recursion on the successor: S(S(0)) + S(S(0)) = S(S(S(S(0)))).",
		kind: "FACT",
		standard: "formal",
		provenance: "Peano arithmetic, addition by recursion.",
		contradicts: false,
		propositionId: root
	});
	arithmetic = applyEvidence(arithmetic, {
		statement: "The symbol '+' in the claim is this successor addition, not a count of physical objects.",
		kind: "INFERENCE",
		standard: "formal",
		provenance: "Reading of the claim against the cited definition.",
		contradicts: false,
		propositionId: root
	});
	arithmetic = setOperator(arithmetic, root, "WHAT", "The sum of two and two in the integers.");
	arithmetic = setOperator(arithmetic, root, "HOW", "Addition by recursion on the successor.");
	arithmetic = setBounds(arithmetic, "Holds for integer arithmetic as defined. It says nothing about clocks, measurements, or other number systems.");
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
		provenance: "Single recorded replay of the derivation."
	});
	arithmetic = addCompeting(arithmetic, "A different definition of '+' — concatenation, modular wrap, or a broken encoding — would not yield 4.");
	let stars = createInvestigation({
		id: "astro-mars",
		createdAt: WHEN,
		title: "Tradition and prediction",
		claim: "Mars in the seventh house predicts conflict this week.",
		domain: "astrological",
		parts: ["Mars in the seventh house predicts conflict this week.", "Within the stated tradition, Mars in the seventh house is read as conflict."]
	});
	const predictive = stars.propositions.find((p) => p.role === "part" && p.text.startsWith("Mars in"));
	const reading = stars.propositions.find((p) => p.text.startsWith("Within the stated"));
	const tradition = {
		statement: "In the cited tradition, Mars in the seventh house is read as conflict.",
		kind: "FACT",
		standard: "tradition",
		provenance: "Named interpretive tradition, internal rule only.",
		contradicts: false
	};
	stars = applyEvidence(stars, {
		...tradition,
		propositionId: reading.id
	});
	stars = applyEvidence(stars, {
		...tradition,
		propositionId: predictive.id
	});
	return [
		csi,
		arithmetic,
		stars
	];
}
var KEY = "rpf-console-v1";
function valid(inv) {
	if (!inv || typeof inv !== "object") return false;
	const row = inv;
	return typeof row.claim === "string" && typeof row.claimState === "string" && Array.isArray(row.propositions) && Array.isArray(row.stages) && row.stages.length === 8 && row.reverse !== void 0;
}
var seeds = buildSeeds();
function write(data) {
	try {
		localStorage.setItem(KEY, JSON.stringify(data));
	} catch {}
}
function focusFor(inv) {
	if (!inv) return null;
	return inv.propositions.find((p) => p.role === "part")?.id ?? inv.propositions[0]?.id ?? null;
}
var useRpf = create((set, get) => {
	const commit = (data, extra) => {
		set({
			...data,
			...extra
		});
		write(data);
	};
	const mapActive = (fn) => {
		const { investigations, activeId } = get();
		const next = investigations.map((inv) => inv.id === activeId ? fn(inv) : inv);
		commit({
			investigations: next,
			activeId
		});
	};
	return {
		investigations: seeds,
		activeId: seeds[0].id,
		view: "home",
		focusId: seeds[0].propositions.find((p) => p.role === "part")?.id ?? null,
		hydrate: () => {
			try {
				const raw = localStorage.getItem(KEY);
				if (!raw) return;
				const data = JSON.parse(raw);
				if (!Array.isArray(data.investigations) || !data.investigations.every(valid) || !data.investigations.length) return;
				const activeId = data.investigations.some((inv) => inv.id === data.activeId) ? data.activeId : data.investigations[0].id;
				set({
					investigations: data.investigations,
					activeId,
					focusId: focusFor(data.investigations.find((inv) => inv.id === activeId))
				});
			} catch {}
		},
		setView: (view) => set({ view }),
		select: (id) => {
			set({
				activeId: id,
				view: "status",
				focusId: focusFor(get().investigations.find((row) => row.id === id))
			});
			write({
				investigations: get().investigations,
				activeId: id
			});
		},
		focus: (id) => set({ focusId: id }),
		openClaim: (claim, domain) => {
			const inv = createInvestigation({
				claim,
				domain
			});
			const investigations = [inv, ...get().investigations];
			commit({
				investigations,
				activeId: inv.id
			}, {
				view: "status",
				focusId: focusFor(inv)
			});
		},
		addEvidence: (draft) => mapActive((inv) => applyEvidence(inv, draft)),
		setOperator: (propositionId, op, text) => mapActive((inv) => setOperator(inv, propositionId, op, text)),
		setBounds: (bounds) => mapActive((inv) => setBounds(inv, bounds)),
		addCompeting: (text) => mapActive((inv) => addCompeting(inv, text)),
		addExperience: (draft) => mapActive((inv) => addExperience(inv, draft)),
		setStewardship: (patch) => mapActive((inv) => setStewardship(inv, patch)),
		refuseSynthetic: () => mapActive((inv) => refuseSynthetic(inv)),
		restore: () => {
			const fresh = buildSeeds();
			commit({
				investigations: fresh,
				activeId: fresh[0].id
			}, {
				view: "home",
				focusId: focusFor(fresh[0])
			});
		},
		remove: (id) => {
			const investigations = get().investigations.filter((inv) => inv.id !== id);
			const activeId = get().activeId === id ? investigations[0]?.id ?? "" : get().activeId;
			commit({
				investigations,
				activeId
			}, { focusId: focusFor(investigations.find((inv) => inv.id === activeId)) });
		}
	};
});
function useActive() {
	return useRpf((s) => s.investigations.find((inv) => inv.id === s.activeId) ?? null);
}
var STATE_LABEL = {
	DEMONSTRATED: "Demonstrated",
	SUPPORTED: "Supported",
	REASONED: "Reasoned",
	PROPOSED: "Proposed",
	UNRESOLVED: "Unresolved"
};
var STATE_CLASS = {
	DEMONSTRATED: "border-green/40 bg-green/10 text-green",
	SUPPORTED: "border-cyan/40 bg-cyan/10 text-cyan",
	REASONED: "border-violet/40 bg-violet/10 text-violet",
	PROPOSED: "border-gold/40 bg-gold/10 text-gold",
	UNRESOLVED: "border-amber/40 bg-amber/10 text-amber"
};
function stateLabel(state) {
	return STATE_LABEL[state];
}
function StateBadge({ state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex min-h-7 items-center rounded-md border px-2 font-mono text-xs ${STATE_CLASS[state]}`,
		children: STATE_LABEL[state]
	});
}
function stageLabel(status) {
	if (status === "defined") return "Defined";
	if (status === "justified") return "Recorded";
	return "Unresolved";
}
function stageClass(status) {
	if (status === "defined") return "border-gold/50 text-gold";
	if (status === "justified") return "border-green/50 text-green";
	return "border-amber/50 text-amber";
}
function Panel({ title, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-panel border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-xs uppercase tracking-widest text-gold",
				children: title
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5 text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono uppercase tracking-widest",
			children: label
		}), children]
	});
}
var control = "min-h-11 w-full rounded-md border border-line bg-bg-raise px-3 text-sm text-fg outline-none focus:border-gold";
function GoldButton({ className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: `inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-4 text-sm font-medium text-on-gold disabled:opacity-40 ${className}`
	});
}
function GhostButton({ className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: `inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-surface px-4 text-sm text-fg disabled:opacity-40 ${className}`
	});
}
var TRACE = Array.from({ length: 48 }, (_, i) => ({
	bin: i,
	amp: Number((Math.sin(i / 3.1) * .62 + Math.sin(i / 1.17) * .22).toFixed(3))
}));
var PIPELINE = [
	["Wi-Fi monitor mode", "A report can exist. This desk has not re-verified firmware or capture behaviour."],
	["CSI acquisition", "No capture file is attached. Monitor mode is not acquisition."],
	["CSI decoding", "No samples, so there is nothing to decode."],
	["Signal processing", "No numerical CSI."],
	["RuView or any render", "A human-shaped picture would not be a detection."],
	["RPF observation", "Blocked until a real measurement has provenance and a hash."]
];
function GraphView({ inv }) {
	const [id, setId] = (0, import_react.useState)("reality");
	const [reverse, setReverse] = (0, import_react.useState)(false);
	const stage = inv.stages.find((s) => s.id === id) ?? inv.stages[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					type: "button",
					onClick: () => setReverse(false),
					className: !reverse ? "border-gold text-gold" : "",
					children: "Forward"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					type: "button",
					onClick: () => setReverse(true),
					className: reverse ? "border-gold text-gold" : "",
					children: "Reverse"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: reverse ? "Same chain, read from stewardship back toward reality. The first unresolved stage, starting at reality, is the audit target." : "Same chain, read from reality toward stewardship. A later stage cannot fill an earlier gap."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8",
				children: inv.stages.map((s, index) => {
					const walk = reverse ? inv.stages.length - index : index + 1;
					const target = s.id === inv.reverse.earliestUnsupported;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setId(s.id),
						className: `flex h-full w-full flex-col gap-2 rounded-md border bg-surface p-3 text-left ${s.id === stage.id ? "border-gold" : stageClass(s.status)} ${target ? "ring-2 ring-amber" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: String(walk).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono text-xs ${stageClass(s.status)} border-0`,
								children: stageLabel(s.status)
							}),
							target ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-amber",
								children: "Audit target"
							}) : null
						]
					}) }, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: stage.label,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: stage.required
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: stage.justification
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: stage.output ?? "No output. The gap is left empty."
					}),
					stage.blockedBy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-amber",
						children: ["Blocked: ", stage.blockedBy]
					}) : null
				]
			})
		]
	});
}
function OperatorsView({ inv }) {
	const focusId = useRpf((s) => s.focusId);
	const focus = useRpf((s) => s.focus);
	const save = useRpf((s) => s.setOperator);
	const active = inv.propositions.find((p) => p.id === focusId) ?? inv.propositions.find((p) => p.role === "part") ?? inv.propositions[0];
	const required = new Set(domainSpec(inv.domain).operators);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Proposition",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Which proposition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: active.id,
					onChange: (e) => focus(e.target.value),
					className: control,
					children: inv.propositions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: p.id,
						children: [
							p.role === "root" ? "Claim" : "Part",
							" — ",
							p.text
						]
					}, p.id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: ["An unanswered operator stays Unknown. A note is not evidence and cannot raise the claim state on its own.", ` ${domainSpec(inv.domain).label} requires ${domainSpec(inv.domain).operators.join(", ")}.`]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: OPERATORS.map((op) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorField, {
				op,
				value: active.operators[op].text,
				required: required.has(op),
				onCommit: (text) => save(active.id, op, text)
			}, `${active.id}-${op}`))
		})]
	});
}
function OperatorField({ op, value, required, onCommit }) {
	const [text, setText] = (0, import_react.useState)(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: op,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				onCommit(text);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: text,
				onChange: (e) => setText(e.target.value),
				rows: 3,
				className: `${control} min-h-24 py-3`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted",
					children: required ? "Required by domain" : "Optional"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
					type: "submit",
					children: "Record"
				})]
			})]
		})
	});
}
function EvidenceView({ inv }) {
	const addEvidence = useRpf((s) => s.addEvidence);
	const [statement, setStatement] = (0, import_react.useState)("");
	const [provenance, setProvenance] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("FACT");
	const [standard, setStandard] = (0, import_react.useState)("measurement");
	const [propositionId, setPropositionId] = (0, import_react.useState)(inv.propositions.find((p) => p.role === "part")?.id ?? inv.propositions[0].id);
	const [contradicts, setContradicts] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Append evidence",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Original evidence is not edited. Add a further record if an earlier one was wrong. A SHA-256 hash is taken over the statement and provenance."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (e) => {
					e.preventDefault();
					addEvidence({
						statement,
						provenance,
						kind,
						standard,
						propositionId,
						contradicts
					});
					setStatement("");
					setProvenance("");
					setContradicts(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Statement",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: statement,
							onChange: (e) => setStatement(e.target.value),
							rows: 3,
							className: `${control} min-h-24 py-3`
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: kind,
								onChange: (e) => setKind(e.target.value),
								className: control,
								children: [
									"FACT",
									"INFERENCE",
									"ASSUMPTION",
									"PROPOSAL",
									"UNKNOWN"
								].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Standard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: standard,
								onChange: (e) => setStandard(e.target.value),
								className: control,
								children: [
									"measurement",
									"observation",
									"formal",
									"authority",
									"tradition",
									"report"
								].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Provenance",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: provenance,
							onChange: (e) => setProvenance(e.target.value),
							className: control
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Linked proposition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: propositionId,
							onChange: (e) => setPropositionId(e.target.value),
							className: control,
							children: inv.propositions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.text
							}, p.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: contradicts,
							onChange: (e) => setContradicts(e.target.checked)
						}), "This record conflicts with the proposition"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
						type: "submit",
						disabled: !statement.trim() || !provenance.trim(),
						children: "Append"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [inv.evidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No evidence on file."
			}) : null, inv.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-panel border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-gold",
								children: e.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-cyan",
								children: e.standard
							}),
							e.contradicts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-red",
								children: "Contradiction"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: e.relevant ? "Bears on the link" : "Does not bear"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: e.statement
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: e.provenance
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 break-all font-mono text-xs text-muted",
						title: e.integrity,
						children: ["SHA-256 ", e.integrity]
					})
				]
			}, e.id))]
		})]
	});
}
function ReverseView({ inv }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Next audit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-amber",
					children: inv.reverse.earliestUnsupported ?? "No gap"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: inv.reverse.nextAuditTarget
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-2",
				children: inv.reverse.trace.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-md border border-line bg-surface px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: step.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-xs ${stageClass(step.status)} border-0`,
							children: stageLabel(step.status)
						})
					]
				}, step.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Trace order is stewardship back to reality. The audit target is the earliest gap, not the nearest one to the conclusion."
			})
		]
	});
}
function ExperienceView({ inv }) {
	const add = useRpf((s) => s.addExperience);
	const [form, setForm] = (0, import_react.useState)({
		timestamp: "",
		observer: "",
		vision: "",
		sound: "",
		emotion: "",
		environment: "",
		interpretation: "",
		interpretationKind: "",
		confidence: "",
		provenance: ""
	});
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Modalities",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Vision, sound, and emotion are associated records. They are not interchangeable evidence. A transcription is not the recording. An inference that someone sounded frightened is not a measurement of emotion."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Append an experience",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-3",
					onSubmit: (e) => {
						e.preventDefault();
						add(form);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Timestamp",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.timestamp,
									onChange: (e) => set("timestamp", e.target.value),
									className: control,
									placeholder: "2026-11-21T11:00:00Z"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Observer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.observer,
									onChange: (e) => set("observer", e.target.value),
									className: control
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Environment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.environment,
								onChange: (e) => set("environment", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Vision",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.vision,
								onChange: (e) => set("vision", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Sound",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.sound,
								onChange: (e) => set("sound", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Emotion — report or inference, not a measurement",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.emotion,
								onChange: (e) => set("emotion", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Interpretation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.interpretation,
								onChange: (e) => set("interpretation", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Interpretation kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.interpretationKind,
								onChange: (e) => set("interpretationKind", e.target.value),
								className: control,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "None"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "reported",
										children: "Reported"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "inference",
										children: "Inference"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Confidence in the interpretation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.confidence,
								onChange: (e) => set("confidence", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Provenance",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.provenance,
								onChange: (e) => set("provenance", e.target.value),
								className: control
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
							type: "submit",
							disabled: !form.timestamp.trim() || !form.observer.trim() || !form.provenance.trim(),
							children: "Append"
						})
					]
				})
			}),
			inv.experiences.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-panel border border-line bg-surface p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-gold",
						children: [
							row.observer,
							" · ",
							row.timestamp
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: row.environment || "No environment recorded."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: ["Vision: ", row.vision || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: ["Sound: ", row.sound || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: ["Emotion: ", row.emotion || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [
							"Interpretation (",
							row.interpretationKind || "unlabelled",
							"): ",
							row.interpretation || "—"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: row.provenance
					})
				]
			}, row.id))
		]
	});
}
function CsiView({ inv }) {
	const refuse = useRpf((s) => s.refuseSynthetic);
	const setView = useRpf((s) => s.setView);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Acquisition pipeline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "This laboratory does not talk to a Raspberry Pi. Nothing below is a capture. RuView, if it rendered a body, would still not be knowledge."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: PIPELINE.map(([name, detail], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-1 rounded-md border border-line bg-bg-raise p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: String(index + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted",
								children: detail
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-amber",
								children: "Unresolved"
							})
						]
					}, name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Synthetic trace",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Generated in the page for layout. Not a measurement, not occupancy, not an identity."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-40 w-full",
						children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: TRACE,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "bin",
										hide: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										hide: true,
										domain: [-1, 1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-surface)",
										border: "1px solid var(--color-line)",
										color: "var(--color-fg)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										dataKey: "amp",
										stroke: "var(--color-cyan)",
										fill: "var(--color-cyan)",
										fillOpacity: .15,
										isAnimationActive: false
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Trace withheld until the page is ready."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
							type: "button",
							disabled: !inv,
							onClick: () => {
								refuse();
								setView("status");
							},
							children: "Try to attach this trace"
						})
					})
				]
			}),
			inv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBadge, { state: inv.claimState }) : null
		]
	});
}
var STEWARD_FIELDS = [
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
	["transmission", "Transmission"]
];
function StewardshipView({ inv }) {
	const setStewardship = useRpf((s) => s.setStewardship);
	const result = inv.stewardshipResult;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: result.justified ? "Justified" : "Not justified",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: result.justified ? "The test passed inside the recorded limits. It is not a general permission." : "Filling the form is not enough. Knowledge has to be justified, and contradictions have to be closed."
			}), result.missing.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-1",
				children: result.missing.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-amber",
					children: item
				}, item))
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: STEWARD_FIELDS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: inv.stewardship[key],
					onChange: (e) => setStewardship({ [key]: e.target.value }),
					className: control
				})
			}, key))
		})]
	});
}
function ContractView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-3xl flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Boundary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "RPF decides whether a conclusion is justified. SCA remains the only orchestration authority. This desk does not call agents, open tools, or drive a radio. T-Lab findings, PentestGPT findings, and Pi observations would enter as attributed evidence, not as facts about the world."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Chain",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-col gap-1",
					children: STAGE_ORDER.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "font-mono text-sm text-fg",
						children: [
							String(i + 1).padStart(2, "0"),
							" ",
							id
						]
					}, id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Language sits before knowledge: a proposition has to be explicit before it can be admitted as a bounded claim. That is a rule of this framework, not a theory of all cognition. A stage may stay empty. It is never filled in just to finish the chain."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Claim states",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Demonstrated — domain standard met, required keys answered, knowledge bounded." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Supported — evidence supports the proposition inside stated limits." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reasoned — inference or assumption only. Not observation." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Proposed — identified, not established." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Unresolved — material uncertainty or an open contradiction. A legitimate state." })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Colour is never the only signal. Every state is written out."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Policies",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Offline by default. This page does not fetch a model." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Evidence is append-only and hashed." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A model's confidence is not evidential certainty." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Raw measurement, decoded measurement, and inferred occupancy stay different claims." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Stewardship is refused when the test is short, even if every box is filled." })
					]
				})
			})
		]
	});
}
var TONE = {
	idle: {
		core: "var(--color-violet)",
		ring: "var(--color-gold)"
	},
	PROPOSED: {
		core: "var(--color-violet)",
		ring: "var(--color-gold)"
	},
	SUPPORTED: {
		core: "var(--color-cyan)",
		ring: "var(--color-gold)"
	},
	REASONED: {
		core: "var(--color-violet)",
		ring: "var(--color-cyan)"
	},
	DEMONSTRATED: {
		core: "var(--color-green)",
		ring: "var(--color-cyan)"
	},
	UNRESOLVED: {
		core: "var(--color-amber)",
		ring: "var(--color-red)"
	}
};
function SentinelOrb({ state, reduceMotion, className }) {
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const tone = TONE[state];
	const spin = reduceMotion ? "" : "rpf-spin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 100",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: `${uid}-glow`,
				cx: "50%",
				cy: "50%",
				r: "50%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: tone.ring,
					stopOpacity: "0.45"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: tone.ring,
					stopOpacity: "0"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: `${uid}-body`,
				cx: "36%",
				cy: "32%",
				r: "68%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-fg)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "20%",
						stopColor: tone.ring
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "72%",
						stopColor: tone.core
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-bg)"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r: "48",
				fill: `url(#${uid}-glow)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: spin,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "50",
					cy: "50",
					rx: "40",
					ry: "13",
					fill: "none",
					stroke: tone.ring,
					strokeWidth: "1.2"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: spin ? "rpf-spin rpf-spin-rev" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "50",
					cy: "50",
					rx: "33",
					ry: "16",
					fill: "none",
					stroke: tone.core,
					strokeWidth: "1.1",
					transform: "rotate(58 50 50)"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r: "22",
				fill: `url(#${uid}-body)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "43",
				cy: "43",
				rx: "6",
				ry: "3",
				fill: "var(--color-fg)",
				opacity: "0.35",
				transform: "rotate(-28 43 43)"
			})
		]
	});
}
function HomeView({ reduceMotion }) {
	const investigations = useRpf((s) => s.investigations);
	const openClaim = useRpf((s) => s.openClaim);
	const select = useRpf((s) => s.select);
	const restore = useRpf((s) => s.restore);
	const [claim, setClaim] = (0, import_react.useState)("");
	const [domain, setDomain] = (0, import_react.useState)("cybersecurity");
	const spec = DOMAINS.find((d) => d.id === domain);
	const open = useActive();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid items-center gap-4 lg:grid-cols-[1fr_180px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-gold",
							children: "Local · offline · read only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold text-fg sm:text-4xl",
							children: "Reality Propagation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-sm text-muted sm:text-base",
							children: "RPF asks whether a conclusion is justified. It does not command tools, and a model, a sensor, or an authority does not become reality by speaking."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 lg:flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentinelOrb, {
						state: open?.claimState ?? "idle",
						reduceMotion,
						className: "size-28 shrink-0 sm:size-36"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: "Phase light for the open claim. Not a sensor."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Open an investigation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-3",
					onSubmit: (e) => {
						e.preventDefault();
						if (!claim.trim()) return;
						openClaim(claim, domain);
						setClaim("");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Claim",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: claim,
								onChange: (e) => setClaim(e.target.value),
								rows: 3,
								placeholder: "State one proposition.",
								className: `${control} min-h-24 py-3`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Domain",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: domain,
								onChange: (e) => setDomain(e.target.value),
								className: control,
								children: DOMAINS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d.id,
									children: d.label
								}, d.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: spec?.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
								type: "submit",
								disabled: !claim.trim(),
								children: "Investigate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
								type: "button",
								onClick: restore,
								children: "Restore examples"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 lg:grid-cols-3",
				children: investigations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No investigations on this desk."
				}) : investigations.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseCard, {
					inv,
					onOpen: () => select(inv.id)
				}, inv.id))
			})
		]
	});
}
function CaseCard({ inv, onOpen }) {
	const parts = inv.propositions.filter((p) => p.role === "part").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: "flex min-h-36 flex-col gap-3 rounded-panel border border-line bg-surface p-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs uppercase tracking-widest text-muted",
					children: inv.domain
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBadge, { state: inv.claimState })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-medium text-fg",
				children: inv.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "line-clamp-4 text-sm text-muted",
				children: inv.decision
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-auto font-mono text-xs text-muted",
				children: [
					parts ? `${parts} constituents` : "Single proposition",
					" · next: ",
					inv.reverse.earliestUnsupported ?? "none"
				]
			})
		]
	});
}
function StatusView({ inv }) {
	const focusId = useRpf((s) => s.focusId);
	const focus = useRpf((s) => s.focus);
	const setBounds = useRpf((s) => s.setBounds);
	const addCompeting = useRpf((s) => s.addCompeting);
	const remove = useRpf((s) => s.remove);
	const setView = useRpf((s) => s.setView);
	const [line, setLine] = (0, import_react.useState)("");
	const [canSpeak, setCanSpeak] = (0, import_react.useState)(false);
	const active = inv.propositions.find((p) => p.id === focusId) ?? inv.propositions.find((p) => p.role === "part") ?? inv.propositions[0];
	const parts = inv.propositions.filter((p) => p.role === "part");
	const shown = parts.length ? parts : inv.propositions;
	(0, import_react.useEffect)(() => {
		setCanSpeak(typeof speechSynthesis !== "undefined");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-gold",
						children: "RPF status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold sm:text-3xl",
						children: inv.claim
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBadge, { state: inv.claimState }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs uppercase tracking-widest text-muted",
								children: domainSpec(inv.domain).label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: inv.id
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-sm text-muted sm:text-base",
						children: inv.decision
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
								type: "button",
								disabled: !canSpeak,
								onClick: () => {
									if (!canSpeak) return;
									speechSynthesis.cancel();
									const utter = new SpeechSynthesisUtterance(inv.decision);
									utter.rate = .96;
									speechSynthesis.speak(utter);
								},
								children: "Read conclusion"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
								type: "button",
								onClick: () => {
									const blob = new Blob([JSON.stringify(toArtefact(inv), null, 2)], { type: "application/json" });
									const url = URL.createObjectURL(blob);
									const a = document.createElement("a");
									a.href = url;
									a.download = `${inv.id}.rpf.json`;
									a.click();
									URL.revokeObjectURL(url);
								},
								children: "Export artefact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
								type: "button",
								onClick: () => remove(inv.id),
								children: "Drop from desk"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Propositions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: shown.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => focus(p.id),
							className: `flex w-full flex-col gap-2 rounded-md border p-3 text-left ${p.id === active.id ? "border-gold bg-bg-raise" : "border-line"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBadge, { state: p.state }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg",
								children: p.text
							})]
						}) }, p.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Keys",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
							onClick: () => setView("operators"),
							children: "Edit keys"
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm text-muted",
							children: active.decision
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "grid gap-2 sm:grid-cols-2",
							children: OPERATORS.map((op) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-line bg-bg-raise p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "font-mono text-xs text-gold",
										children: op
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-sm text-fg",
										children: active.operators[op].text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono text-xs text-muted",
										children: active.operators[op].status === "unknown" ? "Unknown" : "Answered"
									})
								]
							}, op))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
								title: "Forward",
								items: inv.forward,
								empty: "No forward pass."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
								title: "Reverse",
								items: [inv.reverse.earliestUnsupported ? `Earliest gap: ${inv.reverse.earliestUnsupported}` : "No unresolved stage.", inv.reverse.nextAuditTarget],
								empty: "No reverse pass."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
								title: "Findings",
								items: inv.findings,
								empty: "No findings."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
								title: "Unknowns",
								items: inv.unknowns,
								empty: "No unknowns recorded."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
								title: "Contradictions",
								items: inv.contradictions,
								empty: "No contradiction on file.",
								tone: "red"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Record, {
								title: "Assumptions",
								items: inv.assumptions,
								empty: "No assumptions on file."
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Bound",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What this claim does not establish",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: inv.bounds,
						onChange: (e) => setBounds(e.target.value),
						rows: 3,
						className: `${control} min-h-24 py-3`
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "An empty bound blocks the knowledge stage. The gap is not filled for you."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Competing accounts",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mb-3 flex flex-col gap-2",
					children: [inv.competing.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "None recorded. Wisdom stays unresolved."
					}) : null, inv.competing.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-md border border-line bg-bg-raise p-3 text-sm",
						children: item
					}, item))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						addCompeting(line);
						setLine("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: line,
						onChange: (e) => setLine(e.target.value),
						className: control,
						placeholder: "Another way this could fail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
						type: "submit",
						disabled: !line.trim(),
						children: "Add"
					})]
				})]
			})
		]
	});
}
function Record({ title, items, empty, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title,
		children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: `text-sm ${tone === "red" ? "text-red" : "text-fg"}`,
				children: item
			}, item))
		})
	});
}
var VIEWS = [
	["home", "Home"],
	["status", "Status"],
	["graph", "Graph"],
	["operators", "Operators"],
	["evidence", "Evidence"],
	["reverse", "Reverse"],
	["experience", "Experience"],
	["csi", "CSI lab"],
	["stewardship", "Stewardship"],
	["contract", "Contract"]
];
function useReduceMotion() {
	const [reduce, setReduce] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduce(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return reduce;
}
function RpfApp() {
	const hydrate = useRpf((s) => s.hydrate);
	const view = useRpf((s) => s.view);
	const setView = useRpf((s) => s.setView);
	const inv = useActive();
	const reduceMotion = useReduceMotion();
	(0, import_react.useLayoutEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2.5 shrink-0 rounded-full bg-gold",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold tracking-wide",
							children: "RPF"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden truncate text-xs text-muted sm:block",
							children: "Reality Propagation Framework"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ml-auto font-mono text-xs text-cyan",
						children: "Offline · local"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [inv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-mono text-xs text-muted sm:inline",
							children: stateLabel(inv.claimState)
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentinelOrb, {
							state: inv?.claimState ?? "idle",
							reduceMotion,
							className: "size-9"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 overflow-x-auto px-3 py-2",
				"aria-label": "Desk",
				children: VIEWS.map(([id, label]) => {
					const on = view === id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-current": on ? "page" : void 0,
						onClick: () => setView(id),
						className: `min-h-11 shrink-0 rounded-md px-3 text-xs font-medium ${on ? "bg-gold text-on-gold" : "text-muted"}`,
						children: label
					}, id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 pb-16",
			children: [
				view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, { reduceMotion }) : null,
				view === "contract" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractView, {}) : null,
				view === "csi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CsiView, { inv }) : null,
				view !== "home" && view !== "contract" && view !== "csi" && !inv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Open an investigation from Home."
				}) : null,
				inv && view === "status" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusView, { inv }) : null,
				inv && view === "graph" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphView, { inv }) : null,
				inv && view === "operators" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorsView, { inv }) : null,
				inv && view === "evidence" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceView, { inv }, inv.id) : null,
				inv && view === "reverse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReverseView, { inv }) : null,
				inv && view === "experience" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceView, { inv }, inv.id) : null,
				inv && view === "stewardship" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StewardshipView, { inv }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "border-t border-line pt-4 text-xs text-muted",
					children: "SCA keeps execution. Sentinel's phase light follows the open claim. It does not decide, and it does not hear a microphone."
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RpfApp, {});
}
//#endregion
export { Home as component };
