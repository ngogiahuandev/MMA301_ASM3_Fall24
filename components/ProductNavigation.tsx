import React from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Home, Heart } from "lucide-react-native";
import { ThemedText } from "@/components/ThemedText";

export default function ProductNavigation() {
  const router = useRouter();

  return (
    <View className="flex-row justify-around items-center py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <Pressable onPress={() => router.push("/")} className="flex items-center">
        <Home size={24} className="text-gray-600 dark:text-gray-400" />
      </Pressable>
      <Pressable
        onPress={() => router.push("/favorites")}
        className="flex items-center"
      >
        <Heart size={24} className="text-gray-600 dark:text-gray-400" />
      </Pressable>
    </View>
  );
}
