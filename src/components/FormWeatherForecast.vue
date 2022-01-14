<template>
  <div class="form-weather-forecast">
    <label class="container-field-select">
      <span> Please select country </span>
      <select
        class="field-select"
        name="selectedCountryId"
        :value="value.selectedCountryId"
        @change="handleChangeValues"
      >
        <option hidden />
        <option
          v-for="country of options.countries"
          :key="country.id"
          :value="country.id"
        >
          {{ country.label }}
        </option>
      </select>
    </label>

    <label class="container-field-select">
      <span> Please select city </span>
      <select
        class="field-select"
        name="selectedCityId"
        :value="value.selectedCityId"
        @change="handleChangeValues"
      >
        <option hidden />
        <option v-for="city of options.cities" :key="city.id" :value="city.id">
          {{ city.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "form-weather-forecast",
  props: ["options", "value"],
  methods: {
    handleChangeValues(event) {
      const { name, value } = event.target;
      this.$emit("input", { ...this.value, [name]: value });
      if (name === "selectedCityId") {
        this.$emit("handleRequestWeatherForecast", value);
      }
      if (name === "selectedCountryId") {
        this.$emit("handleRequestCountryDetails", value);
      }
    },
  },
};
</script>

<style scoped>
.form-weather-forecast {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
}

.container-field-select {
  margin-top: 15px;
}

.container-field-select span {
  padding-left: 5px;
  font-size: 18px;
}

.field-select {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  padding-left: 7px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 18px;
}

.field-select:focus {
  border: 1px solid #ccc;
  outline: none;
}

.field-select option {
  font-size: 18px;
}
</style>
