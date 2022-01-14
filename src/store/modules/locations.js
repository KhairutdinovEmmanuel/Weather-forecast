import * as api from "../../service/api";

export default {
  namespaced: true,
  state: {
    countries: [],
    countryDetails: [],
    error: null,
  },
  actions: {
    async getCountries(store) {
      try {
        const data = await api.getAllCountries();
        store.commit("setCountries", data.countries);
      } catch (error) {
        store.commit("setError", error.data.message);
      }
    },
    async getCountryDetails(store, payload) {
      try {
        const countryDetails = await api.getCountryDetailsById(payload);
        store.commit("setCountryDetails", countryDetails);
      } catch (error) {
        store.commit("setError", error.data.message);
      }
    },
  },
  mutations: {
    setCountries: (state, countries) => {
      state.countries = countries;
    },
    setCountryDetails: (state, countryDetails) => {
      state.countryDetails = countryDetails;
    },
    setError: (state, error) => {
      state.error = error;
    },
  },
  getters: {
    countries: (state) => state.countries,
    countryDetails: (state) => state.countryDetails,
    error: (state) => state.error,
  },
};
