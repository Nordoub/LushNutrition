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
  age: Yup.number().required().min(1).max(120).label("Age"),
  height: Yup.number().required().min(30).max(220).label("Height"),
  weight: Yup.number().required().min(10).max(300).label("Weight"),
});

const categories = [
  { label: "Maintain weight", value: 1 },
  { label: "Mild weight loss", value: 2 },
  { label: "Normal weight loss", value: 3 },
  { label: "Advanced weight loss", value: 4 },
];

function SetupScreen({ navigation }) {
  const submit = (values) => {
    console.log(values);
    navigation.navigate("Dashboard");
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
            weightloss: categories[0],
          }}
          onSubmit={(values) => submit(values)}
          //validationSchema={validationSchema}
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
