import React from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
// import { auth } from "../firebase";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).max(255).label("Name"),
  email: Yup.string().required().email().max(255).label("Email"),
  password: Yup.string().required().min(4).max(255).label("Password"),
});

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// const db = firestore();

function RegisterScreen() {
  // const handleSignup = (email, password) => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log(user.email);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log("test");
  // };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values.email, values.password);
          handleSignup(values.email, values.password);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
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
