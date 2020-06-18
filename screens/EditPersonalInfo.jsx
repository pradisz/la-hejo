import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useAuth } from "../hooks/useAuth";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

const EditPersonalInfoScreen = () => {
  const { currentUser, editProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [isLoading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header
          showBack
          showSave={isLoading ? false : true}
          onSave={async () => {
            setLoading(true);
            await editProfile({ displayName });
            setLoading(false);
          }}
          style={{ paddingHorizontal: 25 }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32} style={{ paddingHorizontal: 25 }}>
            Edit personal info
          </HeaderText>
          <View style={{ marginVertical: 15 }} />
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <AvatarForm />
              <View style={{ marginVertical: 25, paddingHorizontal: 25 }}>
                <BodyText bold>Display name</BodyText>
                <TextInput
                  maxLength={25}
                  onChangeText={(value) => setDisplayName(value)}
                  value={displayName}
                />
                <View style={{ marginVertical: 15 }} />
                <TouchableOpacity onPress={() => {}}>
                  <BodyText bold>Email address</BodyText>
                  <TextInput
                    keyboardType="email-address"
                    maxLength={25}
                    value={currentUser.email}
                    editable={false}
                  />
                </TouchableOpacity>
                <View style={{ marginVertical: 15 }} />
                <TouchableOpacity onPress={() => {}}>
                  <BodyText bold>Phone number</BodyText>
                  <TextInput
                    keyboardType="phone-pad"
                    maxLength={15}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const AvatarForm = () => {
  const { currentUser } = useAuth();

  const handleForm = () => {};

  return (
    <TouchableOpacity
      onPress={handleForm}
      activeOpacity={0.5}
      style={styles.avatarContainer}
    >
      <Image source={{ uri: currentUser.photoURL }} style={styles.avatar} />
      <View style={{ marginVertical: 5 }} />
      <BodyText>Tap to change photo</BodyText>
    </TouchableOpacity>
  );
};

export default EditPersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
  },
  avatarContainer: {
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    paddingVertical: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    resizeMode: "cover",
  },
});
