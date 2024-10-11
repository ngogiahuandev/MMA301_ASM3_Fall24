import React, { useEffect, useRef } from "react";
import { View, ViewProps, Animated } from "react-native";

interface SkeletonProps extends ViewProps {
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ width, height, style, ...props }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: "#E1E9EE",
          borderRadius: 4,
          opacity: opacity.current,
        },
        style,
      ]}
      {...props}
    />
  );
}
