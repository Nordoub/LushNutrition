import React, { useState } from "react";
import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import Screen from "./app/components/Screen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import AccountScreen from "./app/screens/AccountScreen";
import SetupScreen from "./app/screens/SetupScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import AddMealScreen from "./app/screens/AddMealScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="WelcomeScreen">
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator initialRouteName="LoginScreen">
    {/* <Tab.Screen name="Feed" component={ListingsScreen} /> */}
    {/* <Tab.Screen name="ListingsEdit" component={ListingEditScreen} /> */}
    <Tab.Screen name="LoginScreen" component={LoginScreen} />
    <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
    <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Tab.Screen name="SetupScreen" component={SetupScreen} />
    <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
    <Tab.Screen name="Messages" component={MessagesScreen} />
    <Tab.Screen name="View" component={ViewImageScreen} />
    <Tab.Screen name="AddMeal" component={AddMealScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthNavigator />
    // </NavigationContainer>
    <>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}
