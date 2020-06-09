import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import { HeaderText, BodyText } from "./Text";
import CartIcon from "./CartIcon";

const Header = ({ title, style, showBack, showCart, showSave, onSave }) => {
  return (
    <View
      style={[
        style,
        styles.headerContainer,
        title &&
          showBack && {
            alignItems: "flex-end",
            justifyContent: "flex-start",
          },
      ]}
    >
      {showBack && <BackButton />}
      {title && (
        <HeaderText style={title && showBack && { marginLeft: 25 }}>
          {title}
        </HeaderText>
      )}
      {showCart && <CartIcon count={1} />}
      {showSave && <SaveButton onPress={onSave} />}
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

const SaveButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.saveContainer}>
        <BodyText bold>Save</BodyText>
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
  saveContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
