import React from "react";
import { View, Text } from "react-native";

const MuliText = (props) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          color: props.inverted ? "#FFF" : "#102E39",
          fontFamily: "muli",
          fontSize: props.size ? props.size : 16,
        },
      ]}
    />
  );
};

const PlayfairText = (props) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          color: props.inverted ? "#FFF" : "#102E39",
          fontFamily: props.bold ? "playfair-semibold" : "playfair-regular",
          fontSize: props.size ? props.size : 16,
        },
      ]}
    />
  );
};

export const HeaderText = (props) => {
  return <PlayfairText {...props} bold size={props.size ? props.size : 36} />;
};

export const BodyText = (props) => {
  return props.bold ? <PlayfairText {...props} /> : <MuliText {...props} />;
};

export const PriceText = (props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <PlayfairText
        style={
          ({ color: props.inverted && "#FFF" }, props.size > 24 && { top: 5 })
        }
      >
        $
      </PlayfairText>
      <MuliText
        size={props.size && props.size}
        style={{ color: props.inverted && "#FFF" }}
      >
        {props.value}
      </MuliText>
    </View>
  );
};
