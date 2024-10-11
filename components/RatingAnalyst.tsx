import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Star } from "lucide-react-native";
import { RatingGoup } from "@/types";

interface RatingAnalystProps {
  ratingGroups: RatingGoup[];
  totalRatings: number;
}

export default function RatingAnalyst({
  ratingGroups,
  totalRatings,
}: RatingAnalystProps) {
  const starCounts = [5, 4, 3, 2, 1];

  return (
    <View className="w-full space-y-2">
      {starCounts.map((starCount) => {
        const group = ratingGroups.find((g) => g.rating === starCount) || {
          rating: starCount,
          count: 0,
        };
        const percentage =
          totalRatings > 0 ? (group.count / totalRatings) * 100 : 0;

        return (
          <View key={starCount} className="flex-row items-center space-x-2">
            <View className="w-12 flex-row items-center">
              <ThemedText className="mr-1">{starCount}</ThemedText>
              <Star size={16} color="#FFD700" fill="#FFD700" />
            </View>
            <View className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <View
                style={{ width: `${percentage}%` }}
                className="h-full bg-yellow-400"
              />
            </View>
            <ThemedText className="w-12 text-right">{group.count}</ThemedText>
          </View>
        );
      })}
    </View>
  );
}
