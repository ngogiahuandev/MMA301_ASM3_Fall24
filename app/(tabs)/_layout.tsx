import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { HeartIcon, HomeIcon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2f95dc",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              size={24}
              className={`${focused ? "text-blue-500" : "text-gray-500"}`}
              fill={focused ? "#3b82f6" : "none"}
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <HeartIcon
              size={24}
              className={`${focused ? "text-red-500" : "text-gray-500"}`}
              fill={focused ? "#ef4444" : "none"}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
