import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, StatusBar } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

import PlantsScreen from "./screens/PlantsScreen";
import CartScreen from "./screens/CartScreen";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="plants" component={PlantsScreen} />
            <Stack.Screen name="cart" component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
