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

const AddPersonalInfoScreen = () => {
  const navigation = useNavigation();

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
          <BodyText bold>Display name</BodyText>
          <TextInput maxLength={25} />
          <View style={{ marginVertical: 15 }} />
          <BodyText bold>Phone number</BodyText>
          <TextInput keyboardType="phone-pad" maxLength={15} />
          <View style={{ marginVertical: 15 }} />
          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 15 }}
          >
            <Button
              title="Continue"
              onPress={() => navigation.navigate("root")}
              primary
            />
          </View>
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
