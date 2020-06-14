import React from "react";
import { Platform, StatusBar } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";

import AppNavigation from "./navigation/AppNavigation";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger", "Setting a timer"]);

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <AuthProvider>
          <CartProvider>
            <AppNavigation />
          </CartProvider>
        </AuthProvider>
      </>
    );
  }
};

export default App;
