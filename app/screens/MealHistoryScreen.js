import React, { useContext } from "react";
import { StyleSheet, FlatList } from "react-native";
import Toast from "react-native-toast-message";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import ListItemSeperator from "../components/lists/ListItemSeperator";

import ProgressContext from "../context/progressContext";

function MealHistoryScreen({ route }) {
  const { mealHistory, setMealHistory, currentCalories, setCurrentCalories } =
    useContext(ProgressContext);

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const removeMeal = (meal) => {
    setMealHistory(mealHistory.filter((item) => item.id !== meal.id));
    setCurrentCalories(currentCalories - meal.calorieën);
    showToast(`${meal.title} has been removed!`);
  };

  return (
    <Screen>
      {mealHistory && !mealHistory.length > 0 && (
        <>
          <AppText style={styles.empty}>No meals consumed yet...</AppText>
        </>
      )}
      <FlatList
        data={mealHistory}
        keyExtractor={(meal) => meal.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            subTitle={item.calorieën + " calorieën"}
            iconName={"chevron-left"}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => removeMeal(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
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

export default MealHistoryScreen;
