import React from "react";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SearchBar } from "@/components/SearchBar";
import { BrandFilter } from "@/components/BrandFilter";

interface HeaderProps {
  productsCount: number;
}

export function Header({ productsCount }: HeaderProps) {
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
      <View className="px-2">
        {productsCount > 0 && (
          <ThemedText className="text-sm text-gray-500">
            {productsCount} product found(s)
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );
}
