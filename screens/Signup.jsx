import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import OAuthButton from "../components/OAuthButton";
import TextLink from "../components/TextLink";

const SignupScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header showBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32}>Sign up</HeaderText>
          <View style={{ marginVertical: 15 }} />
          <BodyText bold>Phone number</BodyText>
          <TextInput keyboardType="phone-pad" maxLength={15} />
          <View style={{ marginVertical: 15 }} />
          <Button
            title="Sign up"
            onPress={() => navigate("verify-otp")}
            primary
          />
          <View style={{ marginVertical: 15 }} />
          <BodyText bold center>
            OR
          </BodyText>
          <View style={{ marginVertical: 15 }} />
          <OAuthButton google />
          <OAuthButton facebook />
          <View style={{ marginVertical: 15 }} />
          <TextLink
            title="Already have an acccount? Log in"
            onPress={() => navigate("login")}
            primary
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? "5%" : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
    paddingBottom: Platform.OS == "ios" ? 55 : null, // Footer Height
  },
});
