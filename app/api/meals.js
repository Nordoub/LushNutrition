import client from "./client";

const endpoint = "/meals";

const getMeals = () => client.get(endpoint);

const addMeal = (title, calorieën) =>
  client.post(endpoint, { title, calorieën });

const deleteMeal = (title) => client.delete(endpoint + "/" + title);

export default {
  getMeals,
  addMeal,
  deleteMeal,
};
