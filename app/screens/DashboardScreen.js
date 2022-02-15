import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, LogBox } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItemSeperator from "../components/lists/ListItemSeperator";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import CircularProgress from "react-native-circular-progress-indicator";

import { days, months } from "../config/dates";
import { maaltijden } from "../config/maaltijden";
import PersonalContext from "../context/personalContext";
import ProgressContext from "../context/progressContext";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

let today = new Date();

function DashboardScreen({ navigation }) {
  const { maxCalories } = useContext(PersonalContext);
  const { currentCalories } = useContext(ProgressContext);

  const [date, setDate] = useState(
    days[today.getDay()] +
      ", " +
      today.getDate() +
      " " +
      months[today.getMonth()]
  );

  const handlePress = () => {
    navigation.navigate("AddMeal");
  };

  return (
    <Screen style={styles.container}>
      <CircularProgress
        value={currentCalories}
        radius={110}
        duration={2000}
        maxValue={maxCalories}
        title={"/ " + Math.round(maxCalories)}
        subtitle={"Calorieën"}
        activeStrokeColor={currentCalories <= maxCalories ? "#f39c12" : "red"}
        inActiveStrokeColor={currentCalories <= maxCalories ? "#9b59b6" : "red"}
        inActiveStrokeOpacity={currentCalories <= maxCalories ? 0.2 : 1}
        inActiveStrokeWidth={currentCalories <= maxCalories ? 20 : 10}
        activeStrokeWidth={10}
      />
      <AppText style={styles.date}>{date}</AppText>
      <FlatList
        data={maaltijden}
        style={styles.items}
        keyExtractor={(maaltijd) => maaltijd.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            image={item.image}
            onPress={handlePress}
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
