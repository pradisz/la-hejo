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

import { useAuth } from "../hooks/useAuth";

import { HeaderText, BodyText } from "../components/Text";
import Button from "../components/Button";

const AccountScreen = () => {
  const { currentUser } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {currentUser ? <AuthenticatedView /> : <AnonymousView />}
    </SafeAreaView>
  );
};

const Avatar = () => {
  const { currentUser } = useAuth();

  return (
    <Image
      source={{
        uri: currentUser.photoURL
          ? currentUser.photoURL
          : "https://avatars3.githubusercontent.com/u/44938931?s=460&u=d386991175dac33d37cfef5ada23e67d643469e4&v=4",
      }}
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

const AuthenticatedView = () => {
  const { navigate } = useNavigation();
  const { signOut } = useAuth();

  return (
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
      <Menu title="Log out" onTap={signOut} />
    </View>
  );
};

const AnonymousView = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderText>Account</HeaderText>
      </View>
      <View style={{ marginVertical: 25 }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/images/vector-collages-taking-care-of-flowers.png")}
          style={{ width: 225, height: 219.94 }}
        />
      </View>
      <Button title="Get Started" onPress={() => navigate("login")} primary />
      <View style={{ marginVertical: 25 }} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
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
