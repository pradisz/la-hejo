import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useCart } from "../hooks/useCart";

import { BodyText, PriceText } from "../components/Text";
import Header from "../components/Header";
import Counter from "../components/Counter";
import Button from "../components/Button";

const CartScreen = () => {
  const { cartItems, cartItemsCount, cartTotal } = useCart();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header title="Cart" showBack />
        {cartItemsCount !== 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item) => item.productId}
              contentContainerStyle={{ paddingTop: 15, paddingBottom: 25 }}
              showsVerticalScrollIndicator={false}
            />
            <Footer total={cartTotal} />
          </>
        ) : (
          <>
            <View style={styles.emptyContainer}>
              <Image
                source={require("../assets/images/marginalia-online-shopping.png")}
                style={{ width: 225, height: 220 }}
              />
              <BodyText>Your cart is currently empty</BodyText>
            </View>
            <Button
              title="Shop Plants"
              onPress={() => navigation.goBack()}
              primary
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const CartItem = ({ item }) => {
  const { addItem, removeItem } = useCart();
  const { productId, name, thumbnail, price, quantity } = item;
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate("plants", { productId })}
      style={styles.cartItemContainer}
    >
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={{ marginHorizontal: 7.5 }} />
      <View style={{ flex: 1 }}>
        <BodyText bold>{name}</BodyText>
        <View style={{ marginVertical: 2 }} />
        <View style={styles.cartItemQuantity}>
          <PriceText value={price} />
          <Counter
            value={quantity}
            onIncrement={() => addItem(item)}
            onDecrement={() => removeItem(item)}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    paddingBottom: Platform.OS == "android" ? 55 : 25,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  cartItemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
