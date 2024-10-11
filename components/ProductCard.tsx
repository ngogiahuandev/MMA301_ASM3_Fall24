import React from "react";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Pressable className="w-1/2 p-2">
      {({ pressed }) => (
        <View
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
            pressed ? "opacity-75" : ""
          }`}
        >
          <Image
            source={{ uri: product.image }}
            className="w-full h-40 object-cover"
          />
          <View className="p-4">
            <ThemedText
              type="subtitle"
              className="text-lg font-semibold mb-1 h-12"
              numberOfLines={2}
            >
              {product.artName}
            </ThemedText>
            <ThemedText className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
              {product.brand}
            </ThemedText>
            <View className="flex-row justify-between items-center">
              <ThemedText type="defaultSemiBold" className="text-lg">
                ${product.price.toFixed(2)}
              </ThemedText>
              {product.limitedTimeDeal > 0 && (
                <View className="bg-red-500 rounded-full px-2 py-1">
                  <ThemedText className="text-white text-xs font-bold">
                    {product.limitedTimeDeal}% OFF
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}
