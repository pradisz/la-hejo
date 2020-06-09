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

const ShippingAddressScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header showBack showSave onSave={() => {}} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32}>Shipping address</HeaderText>
          <View style={{ marginVertical: 25 }} />
          <BodyText bold>Recipient</BodyText>
          <TextInput maxLength={25} />
          <View style={{ marginVertical: 15 }} />
          <BodyText bold>Contact number</BodyText>
          <TextInput keyboardType="phone-pad" maxLength={15} />
          <View style={{ marginVertical: 15 }} />
          <BodyText bold>Address</BodyText>
          <TextInput multiline={true} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? "5%" : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
    paddingBottom: Platform.OS == "ios" ? 55 : null, // Footer Height
  },
});
