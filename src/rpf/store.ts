import { create } from "zustand";
import {
  addCompeting,
  addExperience,
  applyEvidence,
  createInvestigation,
  refuseSynthetic,
  setBounds,
  setOperator,
  setStewardship,
  type EvidenceDraft,
} from "./engine.ts";
import { buildSeeds } from "./seeds.ts";
import type { DomainId, Experience, Investigation, Operator, StewardshipDraft } from "./types.ts";

export type DeskView =
  | "home"
  | "status"
  | "graph"
  | "operators"
  | "evidence"
  | "reverse"
  | "experience"
  | "csi"
  | "stewardship"
  | "contract";

const KEY = "rpf-console-v1";

type Persisted = { investigations: Investigation[]; activeId: string };

function valid(inv: unknown): inv is Investigation {
  if (!inv || typeof inv !== "object") return false;
  const row = inv as Investigation;
  return (
    typeof row.claim === "string" &&
    typeof row.claimState === "string" &&
    Array.isArray(row.propositions) &&
    Array.isArray(row.stages) &&
    row.stages.length === 8 &&
    row.reverse !== undefined
  );
}

type Store = Persisted & {
  view: DeskView;
  focusId: string | null;
  hydrate: () => void;
  setView: (view: DeskView) => void;
  select: (id: string) => void;
  focus: (id: string) => void;
  openClaim: (claim: string, domain: DomainId) => void;
  addEvidence: (draft: EvidenceDraft) => void;
  setOperator: (propositionId: string, op: Operator, text: string) => void;
  setBounds: (bounds: string) => void;
  addCompeting: (text: string) => void;
  addExperience: (draft: Omit<Experience, "id">) => void;
  setStewardship: (patch: Partial<StewardshipDraft>) => void;
  refuseSynthetic: () => void;
  restore: () => void;
  remove: (id: string) => void;
};

const seeds = buildSeeds();

function write(data: Persisted) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* The desk still works for this visit. */
  }
}

function focusFor(inv: Investigation | undefined) {
  if (!inv) return null;
  return inv.propositions.find((p) => p.role === "part")?.id ?? inv.propositions[0]?.id ?? null;
}

export const useRpf = create<Store>((set, get) => {
  const commit = (data: Persisted, extra?: Partial<Store>) => {
    set({ ...data, ...extra });
    write(data);
  };
  const mapActive = (fn: (inv: Investigation) => Investigation) => {
    const { investigations, activeId } = get();
    const next = investigations.map((inv) => (inv.id === activeId ? fn(inv) : inv));
    commit({ investigations: next, activeId });
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
        const data = JSON.parse(raw) as Partial<Persisted>;
        if (!Array.isArray(data.investigations) || !data.investigations.every(valid) || !data.investigations.length) return;
        const activeId = data.investigations.some((inv) => inv.id === data.activeId)
          ? (data.activeId as string)
          : data.investigations[0].id;
        set({ investigations: data.investigations, activeId, focusId: focusFor(data.investigations.find((inv) => inv.id === activeId)) });
      } catch {
        /* Keep the seeded desk. */
      }
    },
    setView: (view) => set({ view }),
    select: (id) => {
      const inv = get().investigations.find((row) => row.id === id);
      set({ activeId: id, view: "status", focusId: focusFor(inv) });
      write({ investigations: get().investigations, activeId: id });
    },
    focus: (id) => set({ focusId: id }),
    openClaim: (claim, domain) => {
      const inv = createInvestigation({ claim, domain });
      const investigations = [inv, ...get().investigations];
      commit({ investigations, activeId: inv.id }, { view: "status", focusId: focusFor(inv) });
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
      commit({ investigations: fresh, activeId: fresh[0].id }, { view: "home", focusId: focusFor(fresh[0]) });
    },
    remove: (id) => {
      const investigations = get().investigations.filter((inv) => inv.id !== id);
      const activeId = get().activeId === id ? (investigations[0]?.id ?? "") : get().activeId;
      commit({ investigations, activeId }, { focusId: focusFor(investigations.find((inv) => inv.id === activeId)) });
    },
  };
});

export function useActive() {
  return useRpf((s) => s.investigations.find((inv) => inv.id === s.activeId) ?? null);
}
