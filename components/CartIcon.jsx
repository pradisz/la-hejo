import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

const CartIcon = ({ count, style, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress ? onPress : () => navigation.navigate("cart")}
    >
      <View style={[styles.container, style]}>
        <Image
          source={require("../assets/images/shopping-cart.png")}
          style={styles.icon}
        />
        {count && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 18,
              height: 18,
              backgroundColor: "#EE6457",
              borderRadius: 18 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 10 }}>{count}</Text>
          </View>
        )}
        {!count && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 18,
              height: 18,
              backgroundColor: "#F7D57B",
              borderRadius: 18 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#102E39", fontSize: 10 }}>+</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
    left: -2,
    resizeMode: "contain",
  },
});
