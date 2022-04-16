import React, { useState, useRef } from "react";
import { StyleSheet, Image, Keyboard } from "react-native";
import authApi from "../api/auth";
import AppText from "../components/AppText";
import Toast from "react-native-toast-message";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { registerValidationSchema } from "../schemas/schemas";

function RegisterScreen({ navigation }) {
  const [registerFailed, setRegisterFailed] = useState(false);
  const { landscape } = useDeviceOrientation();

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);

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
        {!landscape && (
          <Image
            style={styles.logo}
            source={require("../assets/logo-red.png")}
          />
        )}
        {registerFailed && <AppText>{"Error registering"}</AppText>}
        <AppForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={registerValidationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="firstName"
            placeholder="First name"
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
          />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="lastName"
            placeholder="Last name"
            innerRef={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            icon="email"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            innerRef={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
            innerRef={passwordRef}
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
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
