import React, { useContext, useEffect } from "react";
import { StyleSheet, FlatList, LogBox } from "react-native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import ListItemSeperator from "../components/lists/ListItemSeperator";
import mealsApi from "../api/meals";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
import ProgressContext from "../context/progressContext";
import { FloatingAction } from "react-native-floating-action";
import { showToast } from "../utils/utils";
LogBox.ignoreLogs(["Encountered two"]);

function AddMealScreen({ navigation }) {
  const { data: meals, error, request: loadMeals } = useApi(mealsApi.getMeals);
  const { currentCalories, setCurrentCalories, mealHistory, setMealHistory } =
    useContext(ProgressContext);

  // Retrieve meals from API when screen is focused.
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadMeals();
    });

    return unsubscribe;
  }, [navigation]);

  const addMealToMealHistory = (meal) => {
    setCurrentCalories(currentCalories + meal.calorieën);
    setMealHistory([
      ...mealHistory,
      { title: meal.title, calorieën: meal.calorieën },
    ]);
    showToast(`${meal.title} has been added!`);
  };

  const removeMeal = async (title) => {
    const result = await mealsApi.deleteMeal(title);
    if (!result.ok) return showToast("Error deleting meal.");
    loadMeals();

    showToast("Meal successfully deleted");
  };

  return (
    <Screen style={styles.container}>
      {error && (
        <>
          <AppText>Couldn't retrieve the meals.</AppText>
          <AppButton title="Retry" onPress={loadMeals} />
        </>
      )}
      {meals && !meals.length > 0 && (
        <AppText style={styles.empty}>No meals exist yet...</AppText>
      )}

      <FlatList
        data={meals}
        keyExtractor={(meal) => meal.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.calorieën + " calorieën"}
            iconName={"plus-circle"}
            onPress={() => addMealToMealHistory(item)}
            renderRightActions={() => (
              <ListItemDeleteAction
                onPress={() => {
                  removeMeal(item.title);
                }}
              />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
      />
      <FloatingAction
        actions={[
          {
            name: "createMeal",
            icon: require("../assets/plus.png"),
            color: "grey",
            position: 1,
          },
        ]}
        overrideWithAction
        onPressItem={() => {
          navigation.navigate("CreateMeal");
        }}
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
  empty: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default AddMealScreen;
