import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL_GENERAL;

const generalAxiosInstance = axios.create({
  baseURL: BASE_URL
});

generalAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default generalAxiosInstance;