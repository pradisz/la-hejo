import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { BodyText } from "./Text";

const Button = ({
  title,
  onPress,
  primary,
  secondary,
  accent,
  btnStyle,
  textSize,
  iconStart,
  iconEnd,
  icon,
  inverted,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        btnStyle,
        styles.container,
        primary && { backgroundColor: "#008576" },
        secondary && { backgroundColor: "#EE6457" },
        accent && { backgroundColor: "#F7D57B" },
      ]}
    >
      {iconStart && <Image source={icon} />}
      <BodyText
        size={textSize}
        inverted={inverted ? false : true}
        style={{
          bottom: 2,
        }}
      >
        {title}
      </BodyText>
      {iconEnd && (
        <Image
          source={icon}
          style={[styles.icon, inverted && { tintColor: "#102E39" }]}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 41.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#FFF",
  },
});
