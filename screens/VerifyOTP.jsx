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
import TextLink from "../components/TextLink";
import Button from "../components/Button";

const VerifyOTPScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header showBack />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <HeaderText size={32}>Verify your number</HeaderText>
          <View style={{ marginVertical: 15 }} />
          <BodyText bold>Enter OTP code</BodyText>
          <View style={{ marginVertical: 15 }} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <NumberInput />
            <NumberInput />
            <NumberInput />
            <NumberInput />
          </View>
          <View style={{ marginVertical: 15 }} />
          <TextLink title="Didn't get a text? Resend code" onPress={() => {}} />
          <View style={{ marginVertical: 15 }} />
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}
          >
            <Button
              title="Continue"
              onPress={() => navigate("add-personal-info")}
              primary
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const NumberInput = () => {
  return (
    <View style={styles.numberInput}>
      <TextInput keyboardType="numeric" maxLength={1} center />
    </View>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
  numberInput: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
