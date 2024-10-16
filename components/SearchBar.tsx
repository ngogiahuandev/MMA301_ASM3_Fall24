import React, { useMemo, useCallback } from "react";
import { View, TextInput, Pressable } from "react-native";
import debounce from "lodash.debounce";
import {
  useSearchQuery,
  useSetSearchQuery,
  useFetchProducts,
  useSelectedBrand,
  useSetSelectedBrand,
  useClearAllFilters,
} from "@/store/useArtShopStore";
import { ThemedText } from "@/components/ThemedText";
import { Ban } from "lucide-react-native";

export function SearchBar() {
  const searchQuery = useSearchQuery();
  const setSearchQuery = useSetSearchQuery();
  const fetchProducts = useFetchProducts();
  const selectedBrand = useSelectedBrand();
  const clearAllFilters = useClearAllFilters();

  const debouncedFetchProducts = useMemo(
    () =>
      debounce((query: string) => {
        fetchProducts(query, selectedBrand);
      }, 500),
    [fetchProducts, selectedBrand]
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      debouncedFetchProducts(text);
    },
    [setSearchQuery, debouncedFetchProducts]
  );

  return (
    <View className="mb-4 flex flex-row items-center gap-2">
      <TextInput
        className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-black dark:text-white flex-1"
        placeholder="Search artworks..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      {(searchQuery.length > 0 || selectedBrand !== "") && (
        <Pressable
          onPress={clearAllFilters}
          className="flex-row items-center px-2 py-1  text-red-500 rounded   "
        >
          <ThemedText className="text-red-500">Clear</ThemedText>
        </Pressable>
      )}
    </View>
  );
}
