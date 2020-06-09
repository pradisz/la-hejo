import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import { HeaderText } from "./Text";
import CartIcon from "./CartIcon";

const STACK_SHOW_BACK = ["cart", "checkout"]; // Show back button
const STACK_HIDE_CART = [
  "login",
  "signup",
  "verify-otp",
  "add-personal-info",
  "cart",
  "account",
]; // Hide cart icon

const Header = ({ title, style }) => {
  const route = useRoute();

  return (
    <View
      style={[
        style,
        styles.headerContainer,
        STACK_SHOW_BACK.includes(route.name) && {
          alignItems: "flex-end",
          justifyContent: "flex-start",
        },
      ]}
    >
      {STACK_SHOW_BACK.includes(route.name) && <BackButton />}
      {title ? (
        <HeaderText
          style={STACK_SHOW_BACK.includes(route.name) && { marginLeft: 25 }}
        >
          {title}
        </HeaderText>
      ) : (
        <BackButton />
      )}
      {!STACK_HIDE_CART.includes(route.name) && <CartIcon count={1} />}
    </View>
  );
};

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.backContainer}>
        <Image
          source={require("../assets/images/chevron-left.png")}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    left: -2,
    resizeMode: "contain",
  },
});
