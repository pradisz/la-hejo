import React from "react";
import { View, Image, Dimensions } from "react-native";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        background: "#FFF",
      }}
    >
      <Image
        source={require("../assets/images/splash.png")}
        style={{ width: Dimensions.get("screen").width, resizeMode: "contain" }}
      />
    </View>
  );
};

export default SplashScreen;
