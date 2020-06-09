import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { BodyText } from "./Text";

const OAuthButton = ({ google }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ marginHorizontal: 15 }} />
      <Image
        source={
          google
            ? require("../assets/images/google.png")
            : require("../assets/images/facebook.png")
        }
        style={styles.icon}
      />
      <BodyText center style={{ flex: 1 }}>
        Continue with {google ? "Google" : "Facebook"}
      </BodyText>
      <View style={{ marginHorizontal: 15 }} />
    </TouchableOpacity>
  );
};

export default OAuthButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
