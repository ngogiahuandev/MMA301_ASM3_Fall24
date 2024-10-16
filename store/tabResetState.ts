import { create } from "zustand";

type TabResetStore = {
  homeKey: number;
  favoritesKey: number;
  resetHome: () => void;
  resetFavorites: () => void;
};

export const useTabResetStore = create<TabResetStore>((set) => ({
  homeKey: 0,
  favoritesKey: 0,
  resetHome: () => set((state) => ({ homeKey: state.homeKey + 1 })),
  resetFavorites: () =>
    set((state) => ({ favoritesKey: state.favoritesKey + 1 })),
}));
