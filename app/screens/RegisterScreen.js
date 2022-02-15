import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import AppText from "../components/AppText";
import Toast from "react-native-toast-message";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(4).max(255).label("firstName"),
  lastName: Yup.string().required().min(4).max(255).label("lastName"),
  email: Yup.string().required().email().max(255).label("Email"),
  password: Yup.string().required().min(4).max(255).label("Password"),
});

function RegisterScreen({ navigation }) {
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleSubmit = async ({ firstName, lastName, email, password }) => {
    const result = await authApi.register(firstName, lastName, email, password);
    if (!result.ok) return setRegisterFailed(true);

    setRegisterFailed(false);
    Toast.show({
      type: "success",
      text1: "Registration succesful",
      position: "bottom",
    });
    navigation.navigate("Login");
  };
  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        {registerFailed && <AppText>{"fail"}</AppText>}
        <AppForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="firstName"
            placeholder="First name"
          />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="lastName"
            placeholder="Last name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            icon="email"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
          <SubmitButton title="register" />
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

export default RegisterScreen;
