import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import { ListItem, ListItemDeleteAction } from "../components/lists";
import ListItemSeperator from "../components/lists/ListItemSeperator";

import { lunch, ontbijt } from "../config/maaltijden";

function AddMealScreen({ meals }) {
  const [type, setType] = useState(meals ? meals : ontbijt);

  //   useEffect(() => {
  //     setType(mealType);
  //   }, [mealType]);

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
    // addmeal code
    showToast(`${meal.title} has been added!`);
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.header}>{"Maaltijden"}</AppText>
      <FlatList
        data={type}
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
  container: {},
  header: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 20,
    color: "#f39c12",
  },
});

export default AddMealScreen;
