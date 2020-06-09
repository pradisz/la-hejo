import React from "react";
import { StyleSheet, TextInput as RNTextInput } from "react-native";

const TextInput = (props) => {
  return (
    <RNTextInput
      {...props}
      style={[
        props.style,
        styles.textInput,
        { textAlign: props.center && "center" },
      ]}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    color: "#102E39",
    fontFamily: "muli",
    fontSize: 18,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
});
