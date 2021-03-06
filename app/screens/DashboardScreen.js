import React, { useState, useContext } from "react";
import { FlatList, StyleSheet, LogBox } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useDeviceOrientation } from "@react-native-community/hooks";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItemSeperator from "../components/lists/ListItemSeperator";
import { ListItem } from "../components/lists";
import { mealTypes } from "../constants/mealTypes";
import PersonalContext from "../context/personalContext";
import ProgressContext from "../context/progressContext";
import { getDate } from "../utils/utils";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function DashboardScreen({ navigation }) {
  const { maxCalories } = useContext(PersonalContext);
  const { currentCalories } = useContext(ProgressContext);
  const { landscape } = useDeviceOrientation();

  const [date, setDate] = useState(getDate());

  return (
    <Screen
      style={{ ...styles.container, flexDirection: landscape ? "row" : "" }}
    >
      <CircularProgress
        value={currentCalories}
        radius={110}
        duration={2000}
        maxValue={maxCalories}
        title={"/ " + maxCalories}
        subtitle={"Calorieën"}
        activeStrokeColor={currentCalories <= maxCalories ? "#f39c12" : "red"}
        inActiveStrokeColor={currentCalories <= maxCalories ? "#9b59b6" : "red"}
        inActiveStrokeOpacity={currentCalories <= maxCalories ? 0.2 : 1}
        inActiveStrokeWidth={currentCalories <= maxCalories ? 20 : 10}
        activeStrokeWidth={10}
      />
      {!landscape && <AppText style={styles.date}>{date}</AppText>}
      <FlatList
        data={mealTypes}
        style={styles.items}
        keyExtractor={(meal) => meal.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            image={item.image}
            onPress={() => navigation.navigate("AddMeal")}
            style={landscape ? { alignSelf: "flex-end", width: "80%" } : {}}
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  items: {
    width: "100%",
    paddingTop: 10,
  },
  date: {
    fontSize: 20,
    color: "black",
    opacity: 0.5,
  },
});

export default DashboardScreen;
