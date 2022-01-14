<template>
  <main-layout>
    <div class="weather-forecast">
      <div class="container-form-weather-forecast">
        <form-weather-forecast
          :options="options"
          v-model="values"
          @handleRequestWeatherForecast="handleRequestWeatherForecast"
          @handleRequestCountryDetails="handleRequestCountryDetails"
        />
      </div>
      <div class="container-panel-weather-forecast">
        <panel-weather-forecast
          :weather-forecast-five-days="weatherForecastFiveDays"
          :weather-forecast-ten-days="weatherForecastTenDays"
          :weather-forecast-remaining-days="weatherForecastRemainingDays"
          @handleChangeSelectedCard="handleChangeSelectedCard"
        />
        <div>
          <card-details-weather-forecast
            :weather-forecast-details="weatherForecastDetails"
          />
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainLayout from "../components/layouts/MainLayout.vue";
import PanelWeatherForecast from "../components/PanelWeatherForecast.vue";
import FormWeatherForecast from "../components/FormWeatherForecast.vue";
import CardDetailsWeatherForecast from "../components/CardDetailsWeatherForecast.vue";

export default {
  name: "home-page",
  components: {
    MainLayout,
    PanelWeatherForecast,
    FormWeatherForecast,
    CardDetailsWeatherForecast,
  },
  data: () => ({
    options: {
      countries: [],
      cities: [],
    },
    values: {
      selectedCountryId: undefined,
      selectedCityId: undefined,
    },
  }),
  methods: {
    ...mapActions({
      getCountries: "locations/getCountries",
      getCountryDetails: "locations/getCountryDetails",
      getWeatherForecast: "weatherForecast/getWeatherForecast",
      setWeatherForecastDetailsByDate: "weatherForecast/setWeatherForecastDetailsByDate",
    }),
    handleRequestCountryDetails(countryId) {
      this.getCountryDetails(countryId);
    },
    handleRequestWeatherForecast(cityId) {
      const { latitude, longitude } = this.countryDetails?.cities?.find(
        (city) => city.id === Number(cityId)
      );
      this.getWeatherForecast({ latitude, longitude });
    },
    handleChangeSelectedCard(numberDay) {
      this.setWeatherForecastDetailsByDate(numberDay);
    },
  },
  computed: {
    ...mapGetters({
      countries: "locations/countries",
      countryDetails: "locations/countryDetails",
      weatherForecastFiveDays: "weatherForecast/weatherForecastFiveDays",
      weatherForecastTenDays: "weatherForecast/weatherForecastTenDays",
      weatherForecastRemainingDays:
        "weatherForecast/weatherForecastRemainingDays",
      weatherForecastDetails: "weatherForecast/weatherForecastDetails",
    }),
  },
  watch: {
    countries(countries) {
      this.options = {
        ...this.options,
        countries: countries.map((country) => ({
          id: country.id,
          value: country.id,
          label: country.country_name,
        })),
      };
    },
    countryDetails(country) {
      this.options = {
        ...this.options,
        cities: country.cities.map((city) => ({
          id: city.id,
          value: city.id,
          label: city.city_name,
        })),
      };
    },
  },
  beforeMount() {
    this.getCountries();
  },
};
</script>

<style>
.weather-forecast {
  max-width: 1400px;
  display: flex;
  flex-wrap: wrap;
}

.container-form-weather-forecast {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.container-panel-weather-forecast {
  width: 100%;
}

@media (min-width: 600px) {
  .weather-forecast {
    width: 80%;
    margin: auto;
  }
}

@media (min-width: 800px) {
  .weather-forecast {
    width: 100%;
    flex-wrap: nowrap;
    margin: auto;
  }

  .container-form-weather-forecast {
    width: 35%;
  }

  .container-panel-weather-forecast {
    width: 60%;
  }
}

@media (min-width: 1000px) {
  .container-form-weather-forecast {
    width: 30%;
  }

  .container-panel-weather-forecast {
    width: 70%;
  }
}

@media (min-width: 1200px) {
  .container-form-weather-forecast {
    width: 25%;
  }

  .container-panel-weather-forecast {
    width: 75%;
  }
}
</style>
