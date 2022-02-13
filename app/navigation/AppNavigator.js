import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SetupScreen from "../screens/SetupScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Setup"
    screenOptions={{ headerTitleAlign: "center", headerShown: false }}
  >
    <Stack.Screen
      name="Setup"
      component={SetupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="MainScreen" component={TabNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
