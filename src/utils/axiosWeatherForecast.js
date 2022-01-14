import axios from "axios";

const WEATHER_FORECAST_API_KEY =
  process.env.VUE_APP_WEATHER_FORECAST_API_KEY || "";

const axiosWeatherForecast = axios.create({
  baseURL: "https://api.stormglass.io/v2/weather",
  headers: {
    Authorization: WEATHER_FORECAST_API_KEY,
  },
});

axiosWeatherForecast.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response)
);

export default axiosWeatherForecast;
