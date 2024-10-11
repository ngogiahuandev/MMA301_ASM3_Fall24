import React, { useEffect, useState, useTransition } from "react";
import { View, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ProductApi } from "@/api/product";
import { Product, RatingGoup } from "@/types";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import {
  formatDiscount,
  getAverageRating,
  getOriginalPrice,
  handlGroupRating,
  USD,
} from "@/lib/format";
import { ArrowLeft, Star } from "lucide-react-native";
import ProductComments from "@/components/ProductComments";
import RatingAnalyst from "@/components/RatingAnalyst";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ratingGrup, setRatingGrup] = useState<RatingGoup[]>([]);

  const fetchProductById = (id: string) => {
    startTransition(() => {
      ProductApi.getById(id)
        .then((product) => {
          setCurrentProduct(product);
          setError(null);
          setRatingGrup(handlGroupRating(product));
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
          setError("Product not found");
        });
    });
  };

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText className="text-xl font-bold mb-4">{error}</ThemedText>
        <Pressable
          className="bg-blue-500 px-4 py-2 rounded-full"
          onPress={() => router.push("/")}
        >
          <ThemedText className="text-white font-semibold">
            Go back to home
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (!currentProduct) {
    return <ProductDetailSkeleton />;
  }

  return (
    <ThemedView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image
            source={{ uri: currentProduct.image }}
            className="w-full h-96 object-cover"
          />
        </View>
        <View className="p-6 -mt-6 rounded-t-3xl bg-gray-100 dark:bg-gray-800">
          <ThemedText className="text-3xl font-bold mb-2 ">
            {currentProduct.artName}
          </ThemedText>
          <ThemedText className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {currentProduct.brand}
          </ThemedText>
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row gap-3 items-center justify-center">
              <ThemedText className="text-3xl font-semibold">
                {USD.format(currentProduct.price)}
              </ThemedText>
              {currentProduct.limitedTimeDeal > 0 && (
                <ThemedText className="text-lg text-gray-500 line-through">
                  {USD.format(
                    getOriginalPrice(
                      currentProduct.price,
                      currentProduct.limitedTimeDeal
                    )
                  )}
                </ThemedText>
              )}
            </View>
            {currentProduct.limitedTimeDeal > 0 && (
              <View className=" bg-red-500 px-2 py-1 rounded">
                <ThemedText className="text-white font-bold">
                  {formatDiscount(currentProduct.limitedTimeDeal)}
                </ThemedText>
              </View>
            )}
          </View>
          <ThemedText className="text-base mb-6 leading-6">
            {currentProduct.description}
          </ThemedText>
          <View className="mb-6">
            <ThemedText className="text-xl font-semibold mb-3">
              Features
            </ThemedText>
            <View className="bg-blue-100 dark:bg-gray-700 p-4 rounded-xl">
              <ThemedText className="text-base">
                {currentProduct.glassSurface
                  ? "Glass surface is available"
                  : "Non-glass surface"}
              </ThemedText>
              {/* Add more features here */}
            </View>
          </View>
          <View>
            {currentProduct.comments.length > 0 ? (
              <View>
                <ThemedText className="text-xl font-semibold mb-3">
                  Reviews
                </ThemedText>
                <View className="flex-row items-center">
                  <Star size={20} color="#FFD700" fill="#FFD700" />
                  <ThemedText className="ml-1 text-lg font-semibold">
                    4.5
                  </ThemedText>
                </View>
                <RatingAnalyst
                  ratingGroups={handlGroupRating(currentProduct)}
                  totalRatings={getAverageRating(currentProduct)}
                />
                <View className="py-3">
                  <ProductComments comments={currentProduct.comments} />
                </View>
              </View>
            ) : (
              <ThemedText className="text-lg font-semibold mt-4">
                No reviews yet
              </ThemedText>
            )}
          </View>
        </View>
      </ScrollView>
      {/* <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <Pressable className="bg-blue-500 py-3 rounded-xl">
          <ThemedText className="text-white text-center font-semibold text-lg">
            Add to Cart
          </ThemedText>
        </Pressable>
      </View> */}
    </ThemedView>
  );
}
