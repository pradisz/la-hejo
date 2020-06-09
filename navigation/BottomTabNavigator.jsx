import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Image } from "react-native";

import HomeScreen from "../screens/Home";
import AccountScreen from "../screens/Account";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

const BottomTabNavigator = ({ navigation, route }) => {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: Platform.OS != "ios" && { height: 55 },
        showLabel: false,
        activeTintColor: "#008576",
        inactiveTintColor: "#BBBBBB",
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/user.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Links":
      return "Links to learn more";
  }
}
