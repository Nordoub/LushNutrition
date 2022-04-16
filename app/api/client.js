import { create } from "apisauce";
import { BASE_URL } from "@env";

const apiClient = create({
  baseURL: BASE_URL,
});

export default apiClient;
