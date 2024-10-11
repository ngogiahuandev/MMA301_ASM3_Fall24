import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Skeleton className="w-full h-64" />
        <View className="p-4">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-20 mb-4" />
          <View className="flex-row justify-between items-center mb-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-1/4 rounded-full" />
          </View>
          <Skeleton className="h-6 w-1/3 mb-2" />
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              className="mb-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
            >
              <Skeleton className="h-4 w-1/4 mb-1" />
              <Skeleton className="h-3 w-3/4 mb-1" />
              <Skeleton className="h-2 w-1/5" />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
