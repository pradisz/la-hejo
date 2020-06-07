import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { BodyText } from "./Text";

const Button = ({
  title,
  onPress,
  bgColor,
  uppercase,
  capitalize,
  bold,
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
        { backgroundColor: bgColor && bgColor },
      ]}
    >
      {iconStart && <Image source={icon} />}
      <BodyText
        bold={bold}
        size={textSize}
        inverted={inverted}
        style={[
          styles.title,
          {
            textTransform:
              (capitalize && "capitalize") || (uppercase && "uppercase"),
          },
        ]}
      >
        {title}
      </BodyText>
      {iconEnd && (
        <Image
          source={icon}
          style={[styles.icon, inverted && { tintColor: "#FFF" }]}
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
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: "#102E39",
    bottom: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
