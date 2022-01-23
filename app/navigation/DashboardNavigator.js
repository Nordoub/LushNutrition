import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AddMealScreen from "../screens/AddMealScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddMeal"
      component={AddMealScreen}
      options={{
        title: "Meals",
        headerTintColor: "#f39c12",
        headerTitleStyle: {
          fontSize: 30,
        },
      }}
    />
  </Stack.Navigator>
);

export default DashboardNavigator;