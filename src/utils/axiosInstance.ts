import axios from "axios";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 440) {
        window.location.href = "/signin";
      }
      const { status, data } = error.response;
      console.error(`Request failed with status ${status}`, data);
      toast.error(data.message || "An error occurred");
    } else if (error.request) {
      console.error("No response received from the server");
      toast.error("No response received from the server");
    } else {
      console.error("Error setting up the request", error.message);
      toast.error("Error setting up the request");
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(await getSession({}));
    const session = await getSession();
    if (session) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${session?.auth_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
