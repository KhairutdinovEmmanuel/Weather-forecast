<template>
  <v-card class="card-weather-forecast">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ weatherForecast.day }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ weatherForecast.numberDay }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="text-h4" cols="6">
          {{ weatherForecast.averageAirTemperature }} &deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sun.png"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        {{ weatherForecast.averageWindSpeed }}/nd
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>48%</v-list-item-subtitle>
    </v-list-item>

    <!-- <v-list class="transparent">
      <v-list-item v-for="item in forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ item.temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list> -->

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        block
        @click="handleChangeWeatherForecastDetails(weatherForecast.numberDay)"
      >
        Show Details Weather
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "card-weather-forecast",
  props: ["weatherForecast"],
  methods: {
    handleClickBtnShowDetailsWeather(numberDay) {
      this.$emit("handleChangeWeatherForecastDetails", numberDay);
    },
    handleChangeWeatherForecastDetails(numberDay) {
      return this.handleClickBtnShowDetailsWeather(numberDay);
    },
  },
};
</script>

<style scoped>
.card-weather-forecast {
  min-width: 270px;
  flex-grow: 1;
}
</style>
