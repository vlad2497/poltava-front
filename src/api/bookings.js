import axios from "axios";
import { SERVER_URL } from "@constants/api";

export const getBookings = async (id, data) => {
  const response = await axios.post(
    `${SERVER_URL}/service/${id}/details`,
    data,
    { "Content-Type": "multipart/form-data" }
  );
  return response;
};
