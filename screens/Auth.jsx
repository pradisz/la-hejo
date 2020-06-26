import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import React, { useRef, useState } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useAuth } from "../hooks/useAuth";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import OAuthButton from "../components/OAuthButton";
import TextLink from "../components/TextLink";

const AuthScreen = () => {
  const recaptchaVerifier = useRef(null);
  const { sendVerificationCode } = useAuth();
  const { navigate } = useNavigation();
  const route = useRoute();
  const loginRoute = route.name == "login";

  const [phoneNumber, setPhoneNumber] = useState("+62");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (phoneNumber.length < 4) {
      Alert.alert("", "Phone number is required.");
    } else {
      setLoading(true);
      try {
        await sendVerificationCode(phoneNumber, recaptchaVerifier.current);
        navigate("verify-otp");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={Constants.manifest.extra.firebase}
        />
        <Header showBack />

        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32}>{loginRoute ? "Log in" : "Sign up"}</HeaderText>
          <View style={{ marginVertical: 15 }} />
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <BodyText bold>Phone number</BodyText>
              <TextInput
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                maxLength={15}
                onChangeText={(value) => setPhoneNumber(value)}
                value={phoneNumber}
              />
              <View style={{ marginVertical: 15 }} />
              <Button title="Log in" onPress={handleSubmit} primary />
              <View style={{ marginVertical: 15 }} />
              <BodyText bold center>
                OR
              </BodyText>
              <View style={{ marginVertical: 15 }} />
              <OAuthButton google />
              <OAuthButton facebook />
              <View style={{ marginVertical: 15 }} />
              <TextLink
                title={
                  loginRoute
                    ? "Don't have an acccount? Sign up"
                    : "Already have an acccount? Log in"
                }
                onPress={() => {
                  loginRoute ? navigate("signup") : navigate("login");
                }}
                primary
              />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
});
