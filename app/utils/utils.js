import { days, months } from "../constants/dates";
import Toast from "react-native-toast-message";

export const showToast = (message) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "bottom",
  });
};

export const getDate = () => {
  const today = new Date();

  return (
    days[today.getDay()] +
    ", " +
    today.getDate() +
    " " +
    months[today.getMonth()]
  );
};

export const calculateCalories = ({
  weight,
  height,
  age,
  gender,
  activity,
}) => {
  let maxCalories;
  if (gender.value === "Male")
    maxCalories = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  else maxCalories = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;

  // multiply by activity level value minus 500 calories (for weight loss)
  return Math.round(maxCalories * activity.value - 500);
};
