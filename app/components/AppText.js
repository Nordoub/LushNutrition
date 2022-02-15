import React from "react";
import { Text } from "react-native";

import defaultStyles from "../constants/styles";

function AppText({ children, style, onPress }) {
  return (
    <Text style={[defaultStyles.text, style]} onPress={onPress}>
      {children}
    </Text>
  );
}

export default AppText;
