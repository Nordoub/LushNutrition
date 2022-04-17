import React, { useState, useRef } from "react";
import { StyleSheet, Image, Keyboard } from "react-native";
import mealsApi from "../api/meals";
import AppText from "../components/AppText";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showToast } from "../utils/utils";
import { createMealValidationSchema } from "../schemas/schemas";

function CreateMealScreen({ navigation }) {
  const [createMealFailed, setCreateMealFailed] = useState(false);
  const calorieRef = useRef(null);

  const handleSubmit = async ({ title, calorieën }) => {
    const result = await mealsApi.addMeal(title, calorieën);
    if (!result.ok) return setCreateMealFailed(true);

    setCreateMealFailed(false);
    showToast("Meal successfully created");

    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        {createMealFailed && <AppText>{"Error creating meal"}</AppText>}
        <AppForm
          initialValues={{
            title: "",
            calorieën: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={createMealValidationSchema}
        >
          <AppFormField
            autoCorrect={false}
            name="title"
            placeholder="Meal name"
            returnKeyType="next"
            onSubmitEditing={() => {
              calorieRef.current.focus();
            }}
          />
          <AppFormField
            autoCorrect={false}
            name="calorieën"
            placeholder="Amount of calories"
            innerRef={calorieRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              Keyboard.close();
            }}
            keyboardType="numeric"
            maxLength={4}
          />
          <SubmitButton title="Add Meal" />
        </AppForm>
      </Screen>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default CreateMealScreen;
