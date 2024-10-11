import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HEADER_HEIGHT = 200;

interface AnimatedHeaderProps {
  scrollY: Animated.SharedValue<number>;
}

export function AnimatedHeader({ scrollY }: AnimatedHeaderProps) {
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT],
        [HEADER_HEIGHT, 70],
        "clamp"
      ),
      opacity: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT],
        [1, 0.9],
        "clamp"
      ),
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, 30],
            "clamp"
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      className="absolute top-0 left-0 right-0 bg-[#A1CEDC] dark:bg-[#1D3D47] overflow-hidden"
      style={headerStyle}
    >
      <Animated.Image
        source={require("@/assets/images/partial-react-logo.png")}
        className="h-44 w-72 absolute bottom-0 left-0"
        style={imageStyle}
      />
    </Animated.View>
  );
}
