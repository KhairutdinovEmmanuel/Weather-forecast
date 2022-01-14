import Vue from "vue";
import Vuex from "vuex";
import locations from "./modules/locations";
import weatherForecast from "./modules/weatherForecast";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    locations,
    weatherForecast,
  },
});
