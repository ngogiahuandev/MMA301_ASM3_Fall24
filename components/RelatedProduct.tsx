import React, { useEffect, useState } from "react";
import { View, Image, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ProductApi } from "@/api/product";
import { Product } from "@/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAverageRating, USD } from "@/lib/format";
import { Star } from "lucide-react-native";
import { useArtShopStore } from "@/store/useArtShopStore";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
  brand: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  brand,
  currentProductId,
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await ProductApi.getAll({ brand });
        setRelatedProducts(
          products.filter((product) => product.id !== currentProductId)
        );
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [brand, currentProductId]);

  if (isLoading) {
    return (
      <ThemedView className="h-60 justify-center items-center">
        <ThemedText>Loading related products...</ThemedText>
      </ThemedView>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <ThemedView className="mb-6">
      <ThemedText className="text-xl font-semibold mb-4">
        Related Products
      </ThemedText>
      <FlatList
        data={relatedProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-2"
      />
    </ThemedView>
  );
};

export default RelatedProducts;
