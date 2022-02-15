import client from "./client";

const endpoint = "/users";
const login = (email, password) =>
  client.post(endpoint + "/authenticate", { email, password });

const register = (firstName, lastName, email, password) =>
  client.post(endpoint + "/register", { firstName, lastName, email, password });

export default {
  login,
  register,
};
