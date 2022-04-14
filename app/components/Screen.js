import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

function Screen({ children, style }) {
  const { landscape } = useDeviceOrientation();

  return (
    <SafeAreaView
      style={{
        ...styles.screen,
        ...style,
        paddingTop: landscape ? 0 : Constants.statusBarHeight,
      }}
    >
      <View style={[styles.screen, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    // backgroundColor: "white",
  },
});

export default Screen;
