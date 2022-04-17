import React, { useContext, useState, useRef } from "react";
import { StyleSheet, Image, Keyboard } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import AppText from "../components/AppText";
import authApi from "../api/auth";
import AuthContext from "../context/authContext";
import { loginValidationSchema } from "../schemas/schemas";

function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const { landscape } = useDeviceOrientation();

  const passwordRef = useRef(null);
  const submitRef = useRef(null);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);
    authContext.setUser(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={{
          ...styles.logo,
          marginTop: landscape ? 0 : 50,
          marginBottom: landscape ? 0 : 20,
        }}
        source={require("../assets/logo-red.png")}
      />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          icon="email"
          placeholder="Email"
          textContentType="emailAddress"
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
        <SubmitButton title="login" innerRef={submitRef} />
      </AppForm>

      <AppText
        style={{ ...styles.register, margin: landscape ? 0 : 20 }}
        onPress={() => navigation.navigate("Register")}
      >
        Account aanmaken
      </AppText>
    </Screen>
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
  },
  register: {
    alignSelf: "center",
  },
});

export default LoginScreen;
