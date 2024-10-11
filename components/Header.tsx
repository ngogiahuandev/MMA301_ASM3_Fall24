import React from "react";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SearchBar } from "@/components/SearchBar";
import { BrandFilter } from "@/components/BrandFilter";

export function Header() {
  return (
    <ThemedView className="p-4 mt-[220px] bg-white rounded-lg">
      <View className="flex-row itemas-center mb-6 ">
        <ThemedText type="title" className="text-2xl font-bold mr-2">
          Welcome to ArtShop!
        </ThemedText>
      </View>
      <ThemedText className="text-base text-gray-500 mb-4">
        Discover unique artworks from talented artists around the world.
      </ThemedText>
      <SearchBar />
      <BrandFilter />
    </ThemedView>
  );
}
