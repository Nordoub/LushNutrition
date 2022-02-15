import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/context/authContext";
import ProgressContext from "./app/context/progressContext";
import PersonalContext from "./app/context/personalContext";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [personalInfo, setPersonalInfo] = useState();
  const [maxCalories, setMaxCalories] = useState(0);
  const [currentCalories, setCurrentCalories] = useState(0);
  const [mealHistory, setMealHistory] = useState([]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PersonalContext.Provider
        value={{
          personalInfo,
          setPersonalInfo,
          maxCalories,
          setMaxCalories,
        }}
      >
        <ProgressContext.Provider
          value={{
            currentCalories,
            setCurrentCalories,
            mealHistory,
            setMealHistory,
          }}
        >
          <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
          <Toast />
        </ProgressContext.Provider>
      </PersonalContext.Provider>
    </AuthContext.Provider>
  );
}
