import React, { useContext } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDeviceOrientation } from "@react-native-community/hooks";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import PersonalContext from "../context/personalContext";
import { activity, gender } from "../constants/modalData";
import { setupValidationSchema } from "../schemas/schemas";

function SetupScreen({ navigation }) {
  const personalContext = useContext(PersonalContext);
  const { landscape } = useDeviceOrientation();

  const submit = (values) => {
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
    return Math.round(maxCalories * activity.value - 500);
  };

  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        <View style={styles.logoContainer}>
          {!landscape && (
            <Image style={styles.logo} source={require("../assets/user.jpg")} />
          )}
          <Text
            style={{ ...styles.title, paddingVertical: landscape ? 0 : 20 }}
          >
            Personal information
          </Text>
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
          validationSchema={setupValidationSchema}
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
  },
  container2: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
});

export default SetupScreen;
