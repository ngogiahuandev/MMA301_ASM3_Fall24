import { ProductApi } from "@/api/product";
import ProductComments from "@/components/ProductComments";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import RatingAnalyst from "@/components/RatingAnalyst";
import RelatedProducts from "@/components/RelatedProduct";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  formatDiscount,
  getAverageRating,
  getOriginalPrice,
  handlGroupRating,
  USD,
} from "@/lib/format";
import { Product, RatingGoup } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState, useTransition } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Rating } from "react-native-ratings";

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
          setRatingGrup(handlGroupRating(product!));
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
    <ThemedView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="relative">
          <Image
            source={{ uri: currentProduct.image }}
            className="w-full h-96 object-cover"
          />
        </View>
        <View className="p-6 -mt-6 rounded-t-3xl bg-white dark:bg-gray-800">
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
            <View
              className={`dark:bg-gray-700 p-4 rounded-xl ${
                currentProduct.glassSurface ? "bg-green-100 " : "bg-red-100 "
              }`}
            >
              <ThemedText
                className={`text-base text-center ${
                  currentProduct.glassSurface
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
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
                <View className="flex-row justify-between items-center py-3 border-y border-gray-200 mb-2">
                  <View className="flex-row items-center gap-4  ">
                    <Rating
                      ratingCount={5}
                      imageSize={20}
                      startingValue={getAverageRating(currentProduct)}
                    />
                    <ThemedText>
                      {getAverageRating(currentProduct).toFixed(1)}
                    </ThemedText>
                  </View>
                  <ThemedText className="text-sm ">
                    {currentProduct.comments.length} review(s)
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
              <View className="bg-gray-200 aspect-video w-full rounded-md justify-center items-center flex ">
                <ThemedText className="text-gray-500">
                  No reviews yet
                </ThemedText>
              </View>
            )}
          </View>
          <RelatedProducts
            brand={currentProduct.brand}
            currentProductId={currentProduct.id}
          />
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
