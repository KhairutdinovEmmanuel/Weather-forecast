import axiosInstanceServer from "../utils/axiosInstanceServer";
import axiosWeatherForecast from "../utils/axiosWeatherForecast";

export const getWetherForecast = async (
  lat,
  lng,
  params = "windSpeed,pressure,airTemperature"
) =>
  await axiosWeatherForecast.get(
    `/point?lat=${lat}&lng=${lng}&params=${params}`
  );

export const getAllCountries = async () =>
  await axiosInstanceServer.get(`/countries`);

export const getCountryDetailsById = async (contry_id) =>
  await axiosInstanceServer.get(`/countries/${contry_id}`);
