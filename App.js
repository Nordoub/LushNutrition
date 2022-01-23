import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </>
    // <>
    //   <NavigationContainer>
    //     <TabNavigator />
    //   </NavigationContainer>
    //   <Toast />
    // </>
  );
}
