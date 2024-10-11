import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { Search } from "lucide-react-native";
import {
  useSearchQuery,
  useSetSearchQuery,
  useFetchProducts,
  useSelectedBrand,
} from "@/store/useArtShopStore";

export function SearchBar() {
  const searchQuery = useSearchQuery();
  const setSearchQuery = useSetSearchQuery();
  const fetchProducts = useFetchProducts();
  const selectedBrand = useSelectedBrand();

  const handleSearch = () => {
    fetchProducts(searchQuery, selectedBrand);
  };

  return (
    <View className="flex-row items-center mb-4">
      <TextInput
        className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-l-lg px-4 py-2 text-black dark:text-white"
        placeholder="Search artworks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Pressable
        className="bg-blue-500 rounded-r-lg px-4 py-2"
        onPress={handleSearch}
      >
        {({ pressed }) => (
          <Search
            color="white"
            size={24}
            style={{ opacity: pressed ? 0.75 : 1 }}
          />
        )}
      </Pressable>
    </View>
  );
}
