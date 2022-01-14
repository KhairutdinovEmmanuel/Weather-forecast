import axios from "axios";

const axiosInstanceServer = axios.create({
  baseURL: "https://www.mockachino.com/525051e9-9de7-44/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceServer.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response)
);

export default axiosInstanceServer;
