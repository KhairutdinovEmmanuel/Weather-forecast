<template>
  <v-card v-if="!!weatherForecastDetails" class="card">
    <div>
      <div class="card-column-title card-column-title-icon">Icons:</div>
      <div class="card-column-title">Hours:</div>
      <div class="card-column-title">Air temperatures:</div>
      <div class="card-column-title">Wind speed:</div>
      <div class="card-column-title">pressure mm:</div>
    </div>
    <div v-for="time of weatherForecastDetails.times" :key="time.hour">
      <div class="card-column card-column-icon">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sun.png"
          alt="Sunny image"
          width="50"
          height="50"
        ></v-img>
      </div>
      <div class="card-column">
        {{ time.hour >= 10 ? `${time.hour}.00` : `0${time.hour}.00` }}
      </div>
      <div class="card-column">{{ time.airTemperature }}&deg;C</div>
      <div class="card-column">{{ time.windSpeed }}/nd</div>
      <div class="card-column">{{ time.pressure }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "card-details-weather-forecast",
  props: ["weatherForecastDetails"],
};
</script>

<style>
.card {
  display: flex !important;
  overflow-x: scroll;
}

.card-column-title-icon {
  width: 150px;
  height: 70px;
  padding: 5px;
  text-align: start;
}

.card-column-title {
  width: 150px;
  padding: 5px;
  text-align: start;
}

.card-column-icon {
  width: 70px;
  height: 70px;
  padding: 15px;
  display: flex;
  justify-content: center;
}

.card-column {
  width: 70px;
  padding: 5px;
  text-align: center;
}
</style>
