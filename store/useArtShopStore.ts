import { create } from "zustand";
import { Product } from "@/types";
import { ProductApi } from "@/api/product";

interface ArtShopState {
  products: Product[];
  searchQuery: string;
  selectedBrand: string;
  brands: string[];
  allBrands: string[];
  isLoading: boolean;
}

interface ArtShopActions {
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brand: string) => void;
  fetchProducts: (query?: string, brand?: string) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  fetchAllBrands: () => Promise<void>;
  clearAllFilters: () => void;
}

type ArtShopStore = ArtShopState & ArtShopActions;

export const useArtShopStore = create<ArtShopStore>((set, get) => ({
  products: [],
  searchQuery: "",
  selectedBrand: "",
  brands: [],
  allBrands: [],
  isLoading: false,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSelectedBrand: (brand: string) => set({ selectedBrand: brand }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  clearAllFilters: () => {
    set({ searchQuery: "", selectedBrand: "" });
    get().fetchProducts();
  },

  fetchProducts: async (query: string = "", brand: string = "") => {
    set({ isLoading: true });
    try {
      const filters: Partial<Pick<Product, "artName" | "brand">> = {};
      if (query) filters.artName = query;
      if (brand) filters.brand = brand;

      const fetchedProducts = await ProductApi.getAll(filters);
      const uniqueBrands = Array.from(
        new Set(fetchedProducts.map((p) => p.brand))
      );

      set((state) => ({
        ...state,
        products: fetchedProducts,
        brands: uniqueBrands,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set((state) => ({
        ...state,
        products: [],
        brands: [],
        isLoading: false,
      }));
    }
  },

  fetchAllBrands: async () => {
    try {
      const allProducts = await ProductApi.getAll();
      const allUniqueBrands = Array.from(
        new Set(allProducts.map((p) => p.brand))
      );
      set({ allBrands: allUniqueBrands });
    } catch (error) {
      console.error("Failed to fetch all brands:", error);
    }
  },
}));

// Type-safe selector hooks
export const useProducts = () => useArtShopStore((state) => state.products);
export const useSearchQuery = () =>
  useArtShopStore((state) => state.searchQuery);
export const useSelectedBrand = () =>
  useArtShopStore((state) => state.selectedBrand);
export const useBrands = () => useArtShopStore((state) => state.brands);
export const useAllBrands = () => useArtShopStore((state) => state.allBrands);
export const useIsLoading = () => useArtShopStore((state) => state.isLoading);

// Type-safe action hooks
export const useSetSearchQuery = () =>
  useArtShopStore((state) => state.setSearchQuery);
export const useSetSelectedBrand = () =>
  useArtShopStore((state) => state.setSelectedBrand);
export const useFetchProducts = () =>
  useArtShopStore((state) => state.fetchProducts);
export const useSetIsLoading = () =>
  useArtShopStore((state) => state.setIsLoading);
export const useFetchAllBrands = () =>
  useArtShopStore((state) => state.fetchAllBrands);
export const useClearAllFilters = () =>
  useArtShopStore((state) => state.clearAllFilters);
