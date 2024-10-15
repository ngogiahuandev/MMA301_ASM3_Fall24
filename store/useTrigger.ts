import { create } from "zustand";

interface TriggerState {
  trigger: boolean;
  switchTrigger: () => void;
}

export const useTrigger = create<TriggerState>((set) => ({
  trigger: false,
  switchTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));
