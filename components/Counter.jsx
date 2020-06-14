import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { BodyText } from "./Text";

const Counter = ({ value, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <CounterButton decrement onPress={onDecrement} />
      <View style={[styles.buttonContainer, styles.quantity]}>
        <BodyText>{value}</BodyText>
      </View>
      <CounterButton increment onPress={onIncrement}  />
    </View>
  );
};

const CounterButton = ({ increment, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        increment ? styles.increment : styles.decrement,
      ]}
    >
      <Image
        source={
          increment
            ? require("../assets/images/plus.png")
            : require("../assets/images/minus.png")
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#E5E5E5",
    borderBottomColor: "#E5E5E5",
  },
  decrement: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: "#E5E5E5",
    borderRightColor: "#E5E5E5",
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
  },
  quantity: {
    width: "auto",
    paddingHorizontal: 15,
  },
  increment: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: "#E5E5E5",
    borderRightColor: "#E5E5E5",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
