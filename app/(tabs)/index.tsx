import React, { useEffect, useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSharedValue } from "react-native-reanimated";
import {
  useProducts,
  useFetchProducts,
  useIsLoading,
  useFetchAllBrands,
} from "@/store/useArtShopStore";
import { Product } from "@/types";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { Header } from "@/components/Header";

export default function HomeScreen() {
  const products = useProducts();
  const fetchProducts = useFetchProducts();
  const fetchAllBrands = useFetchAllBrands();
  const isLoading = useIsLoading();
  const scrollY = useSharedValue(0);

  const handleScroll = useCallback(
    (event: any) => {
      scrollY.value = event.nativeEvent.contentOffset.y;
    },
    [scrollY]
  );

  useEffect(() => {
    fetchProducts();
    fetchAllBrands();
  }, [fetchProducts, fetchAllBrands]);

  const renderItem = ({ item, index }: { item: Product; index: number }) =>
    isLoading ? (
      <ProductSkeleton key={`skeleton-${index}`} />
    ) : (
      <ProductCard product={item} />
    );

  return (
    <ThemedView className="flex-1 bg-white">
      <AnimatedHeader scrollY={scrollY} />
      <FlatList
        data={isLoading ? Array(6).fill({}) : products}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : item.id
        }
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          isLoading ? (
            <ThemedText className="text-center mt-4">
              No products found. Try adjusting your search or filters.
            </ThemedText>
          ) : (
            <View>
              <Text>There are no products</Text>
            </View>
          )
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </ThemedView>
  );
}
