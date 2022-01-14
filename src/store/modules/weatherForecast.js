import * as api from "../../service/api";
import { getWeatherForecast } from "../../utils/weatherForecast";

export default {
  namespaced: true,
  state: {
    weatherForecastFiveDays: [],
    weatherForecastTenDays: [],
    weatherForecastRemainingDays: [],
    weatherForecastDetails: null,
  },
  actions: {
    setWeatherForecastDetailsByDate(store, selectedDay) {
      try {
        const newWeatherForecastDetails =
          store.state.weatherForecastRemainingDays.find(
            (day) => day.numberDay === selectedDay
          );
        if (!newWeatherForecastDetails) {
          throw new Error("selected day from card weather forecast, not exist");
        }
        store.commit("setWeatherForecastDetails", newWeatherForecastDetails);
      } catch (error) {
        store.commit("setError", error.message);
      }
    },
    async getWeatherForecast(store, payload) {
      try {
        const { latitude, longitude } = payload;
        const data = await api.getWetherForecast(latitude, longitude);
        const hours = data.hours;
        const weatherForFiveDays = 5;
        const weatherForTenDays = 10;
        const weatherFiveDays = getWeatherForecast(hours, weatherForFiveDays);
        const weatherTenDays = getWeatherForecast(hours, weatherForTenDays);
        const weatherRemainingDays = getWeatherForecast(hours);
        const weatherForecastDetails = weatherFiveDays[0];
        store.commit("setWeatherForecastFiveDays", weatherFiveDays);
        store.commit("setWeatherForecastTenDays", weatherTenDays);
        store.commit("setWeatherForecastRemainingDays", weatherRemainingDays);
        store.commit("setWeatherForecastDetails", weatherForecastDetails);
      } catch (error) {
        store.commit("setError", error.data.message);
      }
    },
  },
  mutations: {
    setWeatherForecastFiveDays: (state, weatherForecastFiveDays) => {
      state.weatherForecastFiveDays = weatherForecastFiveDays;
    },
    setWeatherForecastTenDays: (state, weatherForecastTenDays) => {
      state.weatherForecastTenDays = weatherForecastTenDays;
    },
    setWeatherForecastRemainingDays: (state, weatherForecastRemainingDays) => {
      state.weatherForecastRemainingDays = weatherForecastRemainingDays;
    },
    setWeatherForecastDetails: (state, weatherForecastDetails) => {
      state.weatherForecastDetails = weatherForecastDetails;
    },
    setError: (state, error) => {
      state.error = error;
    },
  },
  getters: {
    weatherForecastFiveDays: (state) => state.weatherForecastFiveDays,
    weatherForecastTenDays: (state) => state.weatherForecastTenDays,
    weatherForecastRemainingDays: (state) => state.weatherForecastRemainingDays,
    weatherForecastDetails: (state) => state.weatherForecastDetails,
    error: (state) => state.error,
  },
};
