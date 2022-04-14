import React, { useContext, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import Toast from "react-native-toast-message";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import ListItemSeperator from "../components/lists/ListItemSeperator";

import ProgressContext from "../context/progressContext";

function MealHistoryScreen() {
  const { mealHistory, setMealHistory, currentCalories, setCurrentCalories } =
    useContext(ProgressContext);
  const swipeableRef = useRef(null);

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const removeMeal = (meal) => {
    setMealHistory(mealHistory.filter((item) => item !== meal));
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
        keyExtractor={(index) => index}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.calorieën + " calorieën"}
            // iconName={"chevron-left"}
            iconName={"minus-circle"}
            innerRef={swipeableRef}
            onPress={() => removeMeal(item)}
            // renderRightActions={() => (
            //   <ListItemDeleteAction
            //     onPress={() => {
            //       swipeableRef.current.close();
            //       removeMeal(item);
            //     }}
            //   />
            // )}
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
