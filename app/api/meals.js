import client from "./client";

const endpoint = "/meals";

const getMeals = () => client.get(endpoint);

export default {
  getMeals,
};
