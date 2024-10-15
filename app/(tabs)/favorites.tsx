import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  Button,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FavList } from "@/lib/favList";
import { Product } from "@/types";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import {
  Trash2,
  Heart,
  ShoppingBag,
  Check,
  CheckSquare,
  Square,
} from "lucide-react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function FavoriteProductsScreen() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favProducts = await FavList.get();
    setFavorites(favProducts);
  };

  const handleDelete = async (product: Product) => {
    Alert.alert(
      "Remove from Favorites",
      `Are you sure you want to remove ${product.artName} from your favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await FavList.remove(product);
            loadFavorites();
          },
        },
      ]
    );
  };

  const handleLongPress = (productId: string) => {
    setIsSelectionMode(true);
    setSelectedProducts([productId]);
  };

  const handlePress = (productId: string) => {
    if (isSelectionMode) {
      setSelectedProducts((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } else {
      router.push({
        pathname: "/product/[id]",
        params: { id: productId },
      });
    }
  };

  const handleRemoveSelected = async () => {
    Alert.alert(
      "Remove Selected",
      `Are you sure you want to remove ${selectedProducts.length} item(s) from your favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            for (const productId of selectedProducts) {
              const product = favorites.find((p) => p.id === productId);
              if (product) {
                await FavList.remove(product);
              }
            }
            setSelectedProducts([]);
            setIsSelectionMode(false);
            loadFavorites();
          },
        },
      ]
    );
  };

  const renderRightActions = (product: Product) => {
    return (
      <TouchableOpacity
        className="bg-red-500 w-20 h-full justify-center items-center"
        onPress={() => handleDelete(product)}
      >
        <Trash2 size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedProducts.length === favorites.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(favorites.map((p) => p.id));
    }
  };

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setIsSelectionMode(true);
    } else {
      setIsSelectionMode(false);
    }
  }, [selectedProducts]);

  const renderItem = ({ item }: { item: Product }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item)}
      enabled={!isSelectionMode}
    >
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.id)}
        onPress={() => handlePress(item.id)}
        delayLongPress={500}
      >
        <Animated.View
          entering={FadeInDown}
          layout={Layout.springify()}
          className={`bg-white dark:bg-gray-800 mb-4 flex-row items-center p-4 rounded-lg shadow-sm ${
            isSelectionMode && selectedProducts.includes(item.id)
              ? "bg-blue-50"
              : ""
          }`}
        >
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-lg mr-4"
            resizeMode="cover"
          />
          <View className="flex-1">
            <ThemedText numberOfLines={1} className="text-lg font-bold mb-1">
              {item.artName}
            </ThemedText>
            <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
              ${item.price.toFixed(2)}
            </ThemedText>
          </View>
          {isSelectionMode && selectedProducts.includes(item.id) && (
            <View className="bg-primary rounded-full p-1">
              <Check size={20} color="#fff" />
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Swipeable>
  );

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-4">
      <View className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-6">
        <Heart size={48} className="text-primary" />
      </View>
      <ThemedText className="text-2xl font-bold mb-2 text-center">
        Your favorites list is empty
      </ThemedText>
      <ThemedText className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Start adding products you love to your favorites list!
      </ThemedText>
      <TouchableOpacity
        className="bg-primary py-3 px-6 rounded-full flex-row items-center"
        onPress={() => router.push("/")}
      >
        <ShoppingBag size={20} color="#fff" className="mr-2" />
        <ThemedText className="text-white font-semibold">
          Browse Products
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ThemedView className="flex-1 px-4 pt-4">
        <ThemedText className="text-2xl font-bold">
          Favorite Products
        </ThemedText>

        <View className="flex-row justify-between items-center my-4">
          <View className="flex flex-row items-center gap-2 ">
            <Pressable
              onPress={handleToggleSelectAll}
              className="flex-row items-center px-2 py-1  text-blue-500 rounded"
            >
              {selectedProducts.length === favorites.length ? (
                <CheckSquare size={24} className="text-blue-800 mr-2" />
              ) : (
                <Square size={24} className="text-blue-800 mr-2" />
              )}
              <ThemedText className="text-blue-800">
                {selectedProducts.length === favorites.length
                  ? "Deselect All"
                  : "Select All"}
              </ThemedText>
            </Pressable>
          </View>
          {isSelectionMode && selectedProducts.length > 0 && (
            <Pressable onPress={handleRemoveSelected}>
              <ThemedText className="px-2 py-1 bg-red-200 text-red-800 rounded">
                Remove ({selectedProducts.length})
              </ThemedText>
            </Pressable>
          )}
        </View>

        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <EmptyState />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}
