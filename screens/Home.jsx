import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import { useProducts } from "../hooks/useProducts";

import { BodyText, PriceText } from "../components/Text";
import Header from "../components/Header";

const HomeScreen = () => {
  const { products } = useProducts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header title="La Hejo" showCart />
        <FlatList
          data={products}
          renderItem={({ item }) => <PlantItem plant={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ marginVertical: 15 }}
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: -8 }}
        />
      </View>
    </SafeAreaView>
  );
};

const PlantItem = ({ plant }) => {
  const { productId, name, thumbnail, price } = plant;
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate("plants", { productId })}
      style={{ flex: 1 / 2, paddingHorizontal: 8 }}
    >
      <View>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        <View style={{ marginVertical: 5 }} />
        <BodyText bold>{name}</BodyText>
        <PriceText value={price} />
      </View>
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? 20 : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbnail: {
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
});
