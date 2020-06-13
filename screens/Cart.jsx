import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
} from "react-native";

import { BodyText, PriceText } from "../components/Text";
import Header from "../components/Header";
import Button from "../components/Button";

const initialData = [
  {
    id: "1",
    title: "Yucca",
    image:
      "https://i.pinimg.com/564x/fc/12/4b/fc124b9da4b20d092d30d79642afe196.jpg",
    price: 35,
    quantity: 1,
  },
];

const CartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header title="Cart" showBack />
        <FlatList
          data={initialData}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 25 }}
          showsVerticalScrollIndicator={false}
        />
        <Footer total={35} />
      </View>
    </SafeAreaView>
  );
};

const CartItem = ({ item }) => {
  const { id, title, image, price, quantity } = item;
  return (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: image }} style={styles.thumbnail} />
      <View style={{ marginHorizontal: 7.5 }} />
      <View>
        <BodyText bold>{title}</BodyText>
        <View style={{ marginVertical: 2 }} />
        <PriceText value={price} />
      </View>
    </View>
  );
};

const Footer = ({ total }) => {
  return (
    <View style={styles.footerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: Platform.OS == "ios" ? "flex-end" : "center",
        }}
      >
        <BodyText size={18}>Total</BodyText>
        <View style={{ marginHorizontal: 10 }} />
        <PriceText value={total} size={32} />
      </View>
      <Button
        title="Checkout"
        accent
        inverted
        btnStyle={{ borderTopEndRadius: 0, borderBottomEndRadius: 0 }}
        icon={require("../assets/images/arrow-right.png")}
        iconEnd
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 25,
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
    paddingBottom: Platform.OS == "android" ? 55 : 0,
  },
  cartItemContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingVertical: 10,
    paddingLeft: 25,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
