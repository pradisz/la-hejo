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
import Button from "../components/Button";

const AddPersonalInfoScreen = () => {
  const { addProfile } = useAuth();
  const { navigate } = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await addProfile(displayName, email);
    navigate("home");
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header showBack />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <HeaderText size={32}>Add personal info</HeaderText>
          <View style={{ marginVertical: 15 }} />
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <BodyText bold>Display name</BodyText>
              <TextInput
                autofocus
                maxLength={25}
                onChangeText={(value) => setDisplayName(value)}
                value={displayName}
              />
              <View style={{ marginVertical: 15 }} />
              <BodyText bold>Email address</BodyText>
              <TextInput
                keyboardType="email-address"
                maxLength={25}
                onChangeText={(value) => setEmail(value)}
                value={email}
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

export default AddPersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
});
