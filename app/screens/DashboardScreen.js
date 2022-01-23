import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ListItemSeperator from "../components/lists/ListItemSeperator";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import CircularProgress from "react-native-circular-progress-indicator";

import { days, months } from "../config/dates";
import { maaltijden } from "../config/maaltijden";

let today = new Date();

function DashboardScreen() {
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [date, setDate] = useState(
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
  );
  const [translatedDate, setTranslatedDate] = useState(
    days[today.getDay()] +
      ", " +
      today.getDate() +
      " " +
      months[today.getMonth()]
  );

  return (
    <Screen style={styles.container}>
      <CircularProgress
        value={value <= maxValue ? value : maxValue}
        radius={110}
        duration={2000}
        // textColor={"#ecf0f1"}
        maxValue={maxValue}
        title={"Calorieën"}
        // subtitle={`${maxValue < value ? value - maxValue : "test"}`}
        activeStrokeColor={"#f39c12"}
        inActiveStrokeColor={"#9b59b6"}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={20}
        activeStrokeWidth={10}
      />
      <AppText style={styles.date}>{translatedDate}</AppText>
      <FlatList
        data={maaltijden}
        style={styles.items}
        keyExtractor={(maaltijd) => maaltijd.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            image={item.image}
            onPress={() => setValue(value + 15)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
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
    // flex: 1,
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
