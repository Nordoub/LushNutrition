import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../constants/colors";
import defaultStyles from "../constants/styles";
import { useDeviceOrientation } from "@react-native-community/hooks";

function AppTextInput({ icon, innerRef, ...otherProps }) {
  const { landscape } = useDeviceOrientation();

  return (
    <View style={{ ...styles.container, marginVertical: landscape ? 0 : 10 }}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={{ ...defaultStyles.text, ...styles.textInput }}
        ref={innerRef}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    // marginVertical: landscape ? 0 : 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
});

export default AppTextInput;
