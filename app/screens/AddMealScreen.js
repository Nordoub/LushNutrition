import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, LogBox } from "react-native";
import Toast from "react-native-toast-message";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import ListItemSeperator from "../components/lists/ListItemSeperator";
import mealsApi from "../api/meals";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
import ProgressContext from "../context/progressContext";
LogBox.ignoreLogs(["Encountered two"]);

function AddMealScreen() {
  const { data: meals, error, request: loadMeals } = useApi(mealsApi.getMeals);
  const { currentCalories, setCurrentCalories, mealHistory, setMealHistory } =
    useContext(ProgressContext);

  useEffect(() => {
    loadMeals();
  }, []);

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const addMeal = (meal) => {
    setCurrentCalories(currentCalories + meal.calorieën);
    setMealHistory([
      ...mealHistory,
      { title: meal.title, calorieën: meal.calorieën },
    ]);
    showToast(`${meal.title} has been added!`);
  };

  return (
    <Screen style={styles.container}>
      {error && (
        <>
          <AppText>Couldn't retrieve the meals.</AppText>
          <AppButton title="Retry" onPress={loadMeals} />
        </>
      )}
      <FlatList
        data={meals}
        keyExtractor={(meal) => meal.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.calorieën + " calorieën"}
            iconName={"plus-circle"}
            onPress={() => addMeal(item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  header: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 20,
    color: "#f39c12",
  },
});

export default AddMealScreen;
