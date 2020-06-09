import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

const EditPersonalInfoScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header
          showBack
          showSave
          onSave={() => {}}
          style={{ paddingHorizontal: 25 }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32} style={{ paddingHorizontal: 25 }}>
            Edit personal info
          </HeaderText>
          <View style={{ marginVertical: 15 }} />
          <AvatarForm onTap={() => {}} />
          <View style={{ marginVertical: 25, paddingHorizontal: 25 }}>
            <BodyText bold>Display name</BodyText>
            <TextInput maxLength={25} />
            <View style={{ marginVertical: 15 }} />
            <BodyText bold>Email adress</BodyText>
            <TextInput keyboardType="email-address" maxLength={25} />
            <View style={{ marginVertical: 15 }} />
            <BodyText bold>Phone number</BodyText>
            <TextInput keyboardType="phone-pad" maxLength={15} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const AvatarForm = ({ image, onTap }) => {
  return (
    <TouchableOpacity onPress={onTap} activeOpacity={0.5} style={styles.avatarContainer}>
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
    paddingTop: Platform.OS == "ios" ? "5%" : StatusBar.currentHeight + 15,
    paddingBottom: Platform.OS == "ios" ? 55 : null, // Footer Height
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
