import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, StatusBar } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

import SplashScreen from "./screens/Splash";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import VerifyOTPScreen from "./screens/VerifyOTP";
import AddPersonalInfoScreen from "./screens/AddPersonalInfo";
import PlantsScreen from "./screens/Plants";
import CartScreen from "./screens/Cart";
import EditPersonalInfoScreen from "./screens/EditPersonalInfo";
import ShippingAddressScreen from "./screens/ShippingAddress";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger", "Setting a timer"]);

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
            <Stack.Screen name="root" component={BottomTabNavigator} />
            <Stack.Screen name="plants" component={PlantsScreen} />
            <Stack.Screen name="cart" component={CartScreen} />
            <Stack.Screen
              name="edit-personal-info"
              component={EditPersonalInfoScreen}
            />
            <Stack.Screen
              name="shipping-address"
              component={ShippingAddressScreen}
            />
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignupScreen} />
            <Stack.Screen name="verify-otp" component={VerifyOTPScreen} />
            <Stack.Screen
              name="add-personal-info"
              component={AddPersonalInfoScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
