<template>
  <div class="panel-weather-forecast">
    <div class="container-panel-tabs">
      <v-tabs>
        <v-tab @click="handleChangeDays" id="weatherForecastFiveDays">
          Five days
        </v-tab>
        <v-tab @click="handleChangeDays" id="weatherForecastTenDays">
          Ten days
        </v-tab>
        <v-tab @click="handleChangeDays" id="weatherForecastRemainingDays">
          Month
        </v-tab>
      </v-tabs>
    </div>
    <div class="container-weather-forecast-card">
      <card-weather-forecast
        v-for="weatherForecast of weatherForecastMap"
        :weather-forecast="weatherForecast"
        :key="weatherForecast.id"
        @handleChangeWeatherForecastDetails="handleChangeWeatherForecastDetails"
      />
    </div>
  </div>
</template>

<script>
import CardWeatherForecast from "../components/CardWeatherForecast.vue";

export default {
  name: "panel-weather-forecast",
  components: {
    "card-weather-forecast": CardWeatherForecast,
  },
  props: [
    "weatherForecastFiveDays",
    "weatherForecastTenDays",
    "weatherForecastRemainingDays",
  ],
  data: () => ({
    selectedTab: "weatherForecastFiveDays",
    weatherForecastMap: [],
  }),
  methods: {
    handleChangeDays(event) {
      this.weatherForecastMap = this[event.target.id];
    },
    handleChangeWeatherForecastDetails(numberDay) {
      this.$emit("handleChangeSelectedCard", numberDay);
    },
  },
  watch: {
    $props: {
      handler() {
        const selectedTab = this.selectedTab;
        this.weatherForecastMap = this[selectedTab];
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.panel-weather-forecast {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container-panel-tabs {
  margin-bottom: 10px;
}

.container-weather-forecast-card {
  display: flex;
  padding: 10px;
  overflow-x: scroll;
}
</style>
