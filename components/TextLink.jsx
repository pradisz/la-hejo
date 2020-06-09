import React from "react";
import { TouchableOpacity } from "react-native";

import { BodyText } from "./Text";

const TextLink = ({ title, onPress, primary }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BodyText primary={primary}>{title}</BodyText>
    </TouchableOpacity>
  );
};

export default TextLink;
