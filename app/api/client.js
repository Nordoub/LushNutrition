import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.178.13:4000",
});

export default apiClient;
