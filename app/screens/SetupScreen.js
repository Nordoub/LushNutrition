import React, { useContext } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import PersonalContext from "../context/personalContext";

const validationSchema = Yup.object().shape({
  age: Yup.number().required().min(1).max(120).label("Age"),
  height: Yup.number().required().min(30).max(220).label("Height"),
  weight: Yup.number().required().min(10).max(300).label("Weight"),
});

const activity = [
  { label: "Sedentary", value: 1.2 },
  { label: "Lightly Active", value: 1.375 },
  { label: "Moderately Active", value: 1.55 },
  { label: "Very Active", value: 1.725 },
];

const gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

function SetupScreen({ navigation }) {
  const personalContext = useContext(PersonalContext);

  const submit = (values) => {
    // console.log(calculateCalories(values));
    personalContext.setPersonalInfo(values);
    personalContext.setMaxCalories(calculateCalories(values));
    navigation.navigate("MainScreen");
  };

  const calculateCalories = ({ weight, height, age, gender, activity }) => {
    let maxCalories;
    if (gender.value === "Male")
      maxCalories = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    else maxCalories = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;

    // multiply by activity level value minus 500 calories (for weight loss)
    return maxCalories * activity.value - 500;
  };

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/mosh.jpg")} />
          <Text style={styles.title}>Personal information</Text>
        </View>

        <Form
          initialValues={{
            age: "",
            height: "",
            weight: "",
            gender: gender[0],
            activity: activity[0],
          }}
          onSubmit={(values) => submit(values)}
          validationSchema={validationSchema}
        >
          <FormField
            keyboardType="numeric"
            maxLength={3}
            name="age"
            placeholder="Age"
          />
          <FormField
            keyboardType="numeric"
            maxLength={3}
            name="weight"
            placeholder="Weight in kilograms"
          />
          <FormField
            keyboardType="numeric"
            maxLength={3}
            name="height"
            placeholder="Height in centimeters"
          />
          <Picker items={gender} name="gender" placeholder="Your gender" />
          <Picker
            items={activity}
            name="activity"
            placeholder="Type of activity"
          />
          <SubmitButton title="Submit" />
        </Form>
      </Screen>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // alignItems: "center",
  },
  container2: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    // position: "absolute",
    // top: 70,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default SetupScreen;
