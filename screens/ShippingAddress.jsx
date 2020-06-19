import React, { useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useAddress } from "../hooks/useCheckout";

import { HeaderText, BodyText } from "../components/Text";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

const ShippingAddressScreen = () => {
  const { shipping, isFetching, editAddress } = useAddress();
  const [recipient, setRecipient] = useState(null);
  const [contact, setContact] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setRecipient(shipping?.recipient);
    setContact(shipping?.contact);
    setAddress(shipping?.address);
  }, [shipping]);

  const handleOnSave = async () => {
    setLoading(true);
    await editAddress(recipient, contact, address);
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header
          showBack
          showSave={isLoading ? false : true}
          onSave={handleOnSave}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32}>Shipping address</HeaderText>
          <View style={{ marginVertical: 25 }} />
          {isFetching || isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <BodyText bold>Recipient</BodyText>
              <TextInput
                maxLength={25}
                onChangeText={(value) => setRecipient(value)}
                value={recipient}
              />
              <View style={{ marginVertical: 15 }} />
              <BodyText bold>Contact number</BodyText>
              <TextInput
                keyboardType="phone-pad"
                maxLength={15}
                onChangeText={(value) => setContact(value)}
                value={contact}
              />
              <View style={{ marginVertical: 15 }} />
              <BodyText bold>Address</BodyText>
              <TextInput
                multiline={true}
                onChangeText={(value) => setAddress(value)}
                value={address}
              />
            </>
          )}
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
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
});
