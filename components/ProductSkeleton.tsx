import React from "react";
import { View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <View className="w-1/2 p-2">
      <View className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Skeleton width="100%" height={160} />
        <View className="p-4">
          <Skeleton width="75%" height={16} style={{ marginBottom: 8 }} />
          <Skeleton width="50%" height={12} style={{ marginBottom: 16 }} />
          <View className="flex-row justify-between items-center">
            <Skeleton width="33%" height={20} />
            <Skeleton width="25%" height={24} style={{ borderRadius: 12 }} />
          </View>
        </View>
      </View>
    </View>
  );
}
