import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/context/authContext";
import CalorieContext from "./app/context/progressContext";
import PersonalContext from "./app/context/personalContext";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [personalInfo, setPersonalInfo] = useState();
  const [maxCalories, setMaxCalories] = useState(0);
  const [currentCalories, setCurrentCalories] = useState(0);

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
        <CalorieContext.Provider
          value={{ currentCalories, setCurrentCalories }}
        >
          <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
          <Toast />
        </CalorieContext.Provider>
      </PersonalContext.Provider>
    </AuthContext.Provider>
  );
}
