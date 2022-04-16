import * as Yup from "yup";

export const setupValidationSchema = Yup.object().shape({
  age: Yup.number().required().min(1).max(120).label("Age"),
  height: Yup.number().required().min(30).max(220).label("Height"),
  weight: Yup.number().required().min(10).max(300).label("Weight"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(4).max(255).label("First name"),
  lastName: Yup.string().required().min(4).max(255).label("Last name"),
  email: Yup.string().required().email().max(255).label("Email"),
  password: Yup.string().required().min(4).max(255).label("Password"),
});

export const createMealValidationSchema = Yup.object().shape({
  title: Yup.string().required().min(3).max(255).label("Name"),
  calorieën: Yup.number().required().min(1).max(3000).label("Calories"),
});
