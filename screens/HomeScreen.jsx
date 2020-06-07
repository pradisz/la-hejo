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
// import { SafeAreaView } from "react-native-safe-area-context";

import { BodyText, PriceText } from "../components/Text";
import Header from "../components/Header";

const initialData = [
  {
    id: "1",
    title: "Yucca",
    image:
      "https://i.pinimg.com/564x/fc/12/4b/fc124b9da4b20d092d30d79642afe196.jpg",
    price: 35,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "2",
    title: "Pachira",
    image:
      "https://i.pinimg.com/564x/8b/1c/92/8b1c929b21d60c5a2888610d52edbf7c.jpg",
    price: 74,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "3",
    title: "Sansevieria",
    image:
      "https://i.pinimg.com/564x/cd/7c/15/cd7c15b7f43f1ca8e8f9f93494ac5c6f.jpg",
    price: 145,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "4",
    title: "ZZ Plant",
    image:
      "https://i.pinimg.com/564x/e8/61/1c/e8611c0c878d62844ef0d236ddaec6ac.jpg",
    price: 57,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "5",
    title: "Calathea",
    image:
      "https://i.pinimg.com/564x/bb/b6/12/bbb612453bb17a5c5565b855f1355e57.jpg",
    price: 23,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
  {
    id: "6",
    title: "Cast Iron",
    image:
      "https://i.pinimg.com/564x/90/26/66/902666ab55b31f2e71fb13aaabb08090.jpg",
    price: 47,
    lighting: "Bright Indoor, Indirect",
    watering: "Once in 6 days",
    temperature: "18-25°C",
    size: "47-59”",
    description:
      "The recipe for a happy yucca is easy: sun, sun, and more sun. Water sparingly and plant in a deep container to prevent the top-heavy woody stems from toppling over.",
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header title="La Hejo" />
        <FlatList
          data={initialData}
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
  const { title, image, price } = plant;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("plants", { plant: plant })}
      style={{ flex: 1 / 2, paddingHorizontal: 8 }}
    >
      <View>
        <Image source={{ uri: image }} style={styles.thumbnail} />
        <View style={{ marginVertical: 5 }} />
        <BodyText bold>{title}</BodyText>
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
    paddingTop: Platform.OS == "ios" ? "5%" : StatusBar.currentHeight + 15,
    paddingHorizontal: 25,
  },
  contentContainer: { paddingVertical: 20, paddingHorizontal: 25 },
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
