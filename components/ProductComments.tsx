import { View, Text, Image } from "react-native";
import React from "react";
import { Comment } from "@/types";
import { ThemedText } from "@/components/ThemedText";

interface CommentProps {
  comments: Comment[];
}

const ProductComments = ({ comments }: CommentProps) => {
  return comments.map((comment, index) => (
    <View className="flex-row items-start gap-3" key={index}>
      <View className="h-full">
        <Image
          source={{ uri: comment.user.image }}
          className="w-10 h-10 rounded-full bg-gray-200 mt-3"
        />
      </View>
      <View className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <ThemedText className="font-semibold text-lg mb-1">
          {comment.user.name}
        </ThemedText>
        <ThemedText className="mb-2">{comment.content}</ThemedText>
        <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(comment.timestamp).toLocaleDateString()}
        </ThemedText>
      </View>
    </View>
  ));
};

export default ProductComments;
