import React, { useMemo, useState } from "react";
import { View, Image, Pressable, ScrollView } from "react-native";
import { Comment } from "@/types";
import { Rating } from "react-native-ratings";
import { handlGroupRatingByComments } from "@/lib/format";
import { Star } from "lucide-react-native";
import { ThemedText } from "@/components/ThemedText";

interface CommentProps {
  comments: Comment[];
}

const ProductComments = ({ comments }: CommentProps) => {
  const ratingGroups = useMemo(
    () => handlGroupRatingByComments(comments),
    [comments]
  );

  const [filterComments, setFilterComments] = useState<Comment[]>(comments);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleFilter = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
      setFilterComments(comments);
    } else {
      setSelectedRating(rating);
      setFilterComments(
        comments.filter((comment) => comment.rating === rating)
      );
    }
  };

  const RatingButton = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
      >
        <View className="flex-row items-center gap-3 py-2">
          {ratingGroups.map((group, index) => (
            <Pressable
              key={index}
              className={`justify-center  px-2 py-1 bg-gray-200 rounded active:opacity-75 ${
                selectedRating === group.rating ? "bg-blue-300 text-white" : ""
              }`}
              onPress={() => handleFilter(group.rating)}
            >
              <View className="flex-row items-center gap-2">
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <ThemedText className="text-sm font-semibold ">
                  {group.rating} ({group.count})
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  };

  const RenderComment = ({ comment }: { comment: Comment }) => {
    return (
      <View className="flex-row items-start gap-3 mb-6">
        <View className="h-full">
          <Image
            source={{ uri: comment.user.image }}
            className="w-12 h-12 rounded-full bg-gray-200 mt-3"
          />
        </View>
        <View className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
          <View className="flex-row items-center justify-between mb-2">
            <ThemedText className="font-semibold text-lg">
              {comment.user.name}
            </ThemedText>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={16}
              startingValue={comment.rating}
              readonly={true}
              tintColor="#ffffff"
              ratingBackgroundColor="#d4d4d4"
            />
          </View>
          <ThemedText className="mb-2 text-gray-700 dark:text-gray-300">
            {comment.content}
          </ThemedText>
          <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(comment.timestamp).toLocaleDateString()}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <View>
      <RatingButton />
      {filterComments.map((comment, index) => (
        <RenderComment key={index} comment={comment} />
      ))}
    </View>
  );
};

export default ProductComments;
