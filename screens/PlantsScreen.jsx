import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { HeaderText, BodyText, PriceText } from "../components/Text";
import Header from "../components/Header";
import CartIcon from "../components/CartIcon";
import Button from "../components/Button";

const PlantsScreen = () => {
  const route = useRoute();
  const {
    id,
    title,
    image,
    price,
    lighting,
    watering,
    temperature,
    size,
    description,
  } = route.params.plant;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Header style={{ paddingHorizontal: 25 }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderText size={32} style={{ paddingHorizontal: 25 }}>
            {title}
          </HeaderText>
          <TopDetail
            image={image}
            lighting={lighting}
            watering={watering}
            temperature={temperature}
          />
          <MidDetail size={size} />
          <BodyText style={{ padding: 25, lineHeight: 25 }}>
            {description}
          </BodyText>
        </ScrollView>
        <Footer price={price} />
      </View>
    </SafeAreaView>
  );
};

const TopDetail = ({ image, lighting, watering, temperature }) => {
  return (
    <View style={styles.topDetailContainer}>
      <View style={styles.careOverview}>
        <BodyText bold>Lighting</BodyText>
        <BodyText>{lighting}</BodyText>
        <View style={{ marginVertical: 10 }} />
        <BodyText bold>Watering</BodyText>
        <BodyText>{watering}</BodyText>
        <View style={{ marginVertical: 10 }} />
        <BodyText bold>Temperature</BodyText>
        <BodyText>{temperature}</BodyText>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
        <Image source={{ uri: image }} style={styles.plantImage} />
      </TouchableOpacity>
    </View>
  );
};

const MidDetail = ({ size }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 25 }}
    >
      <View style={styles.cardContainer}>
        <BodyText bold>Size</BodyText>
        <BodyText>
          {size} <BodyText size={14}>inch</BodyText>
        </BodyText>
      </View>
      <View style={styles.cardContainer}>
        <BodyText bold>Shipment</BodyText>
        <BodyText>
          3-5 <BodyText size={14}>business days</BodyText>
        </BodyText>
      </View>
    </ScrollView>
  );
};

const Footer = ({ price }) => {
  return (
    <View style={styles.footerContainer}>
      <PriceText value={price} size={32} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CartIcon bgColor="#B6DDDA" />
        <View style={{ marginHorizontal: 10 }} />
        <Button
          title="Buy Now"
          bgColor="#008576"
          btnStyle={{ borderTopEndRadius: 0, borderBottomEndRadius: 0 }}
          icon={require("../assets/images/arrow-right.png")}
          iconEnd
          uppercase
          bold
          inverted
        />
      </View>
    </View>
  );
};

export default PlantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS == "ios" ? "5%" : StatusBar.currentHeight + 15,
    paddingBottom: 55, // Footer Height
  },
  topDetailContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 40,
    paddingHorizontal: 25,
  },
  careOverview: {
    flex: 1,
    paddingRight: 15,
  },
  plantImage: {
    width: 150,
    height: 200,
    borderRadius: 15,
    resizeMode: "cover",
  },
  cardContainer: {
    width: 180,
    height: 100,
    justifyContent: "space-around",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    padding: 10,
    marginRight: 15,
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
});
