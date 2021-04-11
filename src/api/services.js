import axios from "axios";
import { SERVER_URL } from "@constants/api";

export const getServices = async () => {
  const response = await axios.get(`${SERVER_URL}/service`);
  return response;
};
