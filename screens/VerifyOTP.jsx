import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useAuth } from "../hooks/useAuth";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import TextLink from "../components/TextLink";
import Button from "../components/Button";

const VerifyOTPScreen = () => {
  const { confirmVerificationCode } = useAuth();
  const { navigate } = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const isNewUser = await confirmVerificationCode(verificationCode);
      setLoading(false);
      if (isNewUser) {
        navigate("add-personal-info");
      } else {
        navigate("home");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <BodyText bold>Enter OTP code</BodyText>
              <View style={{ marginVertical: 15 }} />
              <TextInput
                placeholder="xxxxxx"
                autoFocus
                keyboardType="numeric"
                maxLength={6}
                onChangeText={(value) => setVerificationCode(value)}
                value={verificationCode}
              />
              <View style={{ marginVertical: 15 }} />
              <TextLink
                title="Didn't get a text? Resend code"
                onPress={() => {}}
              />
              <View style={{ marginVertical: 15 }} />
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: 25,
                }}
              >
                <Button title="Continue" onPress={handleSubmit} primary />
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
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
