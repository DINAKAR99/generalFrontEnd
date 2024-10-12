import { getJwtToken } from "../utility/AuthorizationUtils";
import axios from "axios";

export const API_BASE_URL = import.meta.env.REACT_APP_API_URL;
console.log(API_BASE_URL);

export const publicAxios = axios.create({
  baseURL: API_BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: API_BASE_URL,
});
export const publicBasePath = () => {
  return process.env.PUBLIC_URL;
};
export const apiBasePath = () => {
  return process.env.REACT_APP_API_URL;
};
// interceptor
privateAxios.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    console.log(token + "ddd");

    if (token) {
      // Add Authorization header if token exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);
export default privateAxios;
