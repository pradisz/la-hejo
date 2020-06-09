import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";

const AccountScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderText>Account</HeaderText>
          <Avatar />
        </View>
        <View style={{ marginVertical: 25 }} />
        <Menu
          title="Personal information"
          icon={require("../assets/images/user-light.png")}
          onTap={() => navigate("edit-personal-info")}
        />
        <Menu
          title="Shipping Address"
          icon={require("../assets/images/package.png")}
          onTap={() => navigate("shipping-address")}
        />
        <Menu title="Log out" />
      </View>
    </SafeAreaView>
  );
};

const Avatar = ({ image }) => {
  return (
    <Image
      source={
        image
          ? { uri: image }
          : {
              uri:
                "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
            }
      }
      style={styles.avatar}
    />
  );
};

const Menu = ({ title, icon, onTap }) => {
  return (
    <TouchableOpacity onPress={onTap} style={styles.menuContainer}>
      <BodyText>{title}</BodyText>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? "5%" : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    resizeMode: "cover",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
