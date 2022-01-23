import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import CircularProgress from "react-native-circular-progress-indicator";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
];

function DashboardScreen() {
  const [value, setValue] = useState(80);
  const [maxValue, setMaxValue] = useState(100);
  // useEffect(() => {
  //   setValue(value + 1);
  //   console.log("test");
  // });

  return (
    <Screen style={styles.container}>
      <CircularProgress
        value={value <= maxValue ? value : maxValue}
        radius={120}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: "center",
  },
});

export default DashboardScreen;
