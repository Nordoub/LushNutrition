import React from "react";
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "Maintain weight", value: 1 },
  { label: "Mild weight loss", value: 2 },
  { label: "Normal weight loss", value: 3 },
  { label: "Advanced weight loss", value: 4 },
];

function SetupScreen() {
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
            weightloss: null,
          }}
          onSubmit={(values) => console.log(values)}
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
          <Picker
            items={categories}
            name="weightloss"
            placeholder="Type of weightloss"
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
