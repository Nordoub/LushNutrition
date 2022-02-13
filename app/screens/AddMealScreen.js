import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import ListItemSeperator from "../components/lists/ListItemSeperator";
import mealsApi from "../api/meals";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
import ProgressContext from "../context/progressContext";

function AddMealScreen({ route }) {
  const { data: meals, error, request: loadMeals } = useApi(mealsApi.getMeals);
  const { currentCalories, setCurrentCalories } = useContext(ProgressContext);

  useEffect(() => {
    loadMeals();
  }, []);

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      //   text2: "This is some something 👋",
      position: "bottom",
      //   bottomOffset: 60,
    });
  };

  const addMeal = (meal) => {
    // setCurrentCalories(currentCalories + meal.calorieën);
    route.params.setValue(route.params.value + meal.calorieën);
    route.params.setMeals([...route.params.meals, meal]);
    console.log(route.params.meals);
    showToast(`${meal.title} has been added!`);
  };

  return (
    <Screen style={styles.container}>
      {/* <AppText style={styles.header}>{"Maaltijden"}</AppText> */}
      {error && (
        <>
          <AppText>Could't retrieve the meals.</AppText>
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
