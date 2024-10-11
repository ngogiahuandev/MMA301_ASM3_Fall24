import { ThemedText } from "@/components/ThemedText";
import { getAverageRating } from "@/lib/format";
import { Product } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { Rating } from "react-native-ratings";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/product/[id]",
      params: { id: product.id },
    });
  };

  return (
    <Pressable className="w-1/2 p-2 " onPress={handlePress}>
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
          <View className="p-4 space-y-2">
            <ThemedText
              type="subtitle"
              className="text-lg font-semibold "
              numberOfLines={2}
            >
              {product.artName}
            </ThemedText>
            <ThemedText className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {product.brand}
            </ThemedText>
            <View className="flex-row justify-between items-center">
              <ThemedText type="defaultSemiBold" className="text-lg">
                ${product.price.toFixed(2)}
              </ThemedText>
              {product.limitedTimeDeal > 0 && (
                <View className="bg-red-500 rounded px-2 py-1">
                  <ThemedText className="text-white text-xs font-bold">
                    {product.limitedTimeDeal}% OFF
                  </ThemedText>
                </View>
              )}
            </View>
            {product.comments.length > 0 ? (
              <View className="flex-row items-center">
                <Rating
                  ratingCount={5}
                  imageSize={12}
                  startingValue={getAverageRating(product)}
                />
                <ThemedText className="text-gray-500 text-sm ml-2">
                  {product.comments.length} review(s)
                </ThemedText>
              </View>
            ) : (
              <ThemedText className="text-gray-500 text-sm">
                No reviews yet
              </ThemedText>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
}
