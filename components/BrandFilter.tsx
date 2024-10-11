import React from "react";
import { ScrollView, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import {
  useAllBrands,
  useSelectedBrand,
  useSetSelectedBrand,
  useFetchProducts,
  useSearchQuery,
  useIsLoading,
} from "@/store/useArtShopStore";

export function BrandFilter() {
  const allBrands = useAllBrands();
  const selectedBrand = useSelectedBrand();
  const setSelectedBrand = useSetSelectedBrand();
  const fetchProducts = useFetchProducts();
  const searchQuery = useSearchQuery();
  const isLoading = useIsLoading();

  const handleBrandSelect = (brand: string) => {
    if (isLoading) return;
    const newSelectedBrand = brand === selectedBrand ? "" : brand;
    setSelectedBrand(newSelectedBrand);
    fetchProducts(searchQuery, newSelectedBrand);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      {allBrands.map((brand) => (
        <Pressable
          key={brand}
          className={`mr-2 px-4 py-2 rounded-full ${
            brand === selectedBrand
              ? "bg-blue-500"
              : "bg-gray-200 dark:bg-gray-700"
          } ${isLoading ? "opacity-50" : ""}`}
          onPress={() => handleBrandSelect(brand)}
          disabled={isLoading}
        >
          {({ pressed }) => (
            <ThemedText
              className={`${brand === selectedBrand ? "text-white" : ""} ${
                pressed ? "opacity-75" : ""
              }`}
            >
              {brand}
            </ThemedText>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}
