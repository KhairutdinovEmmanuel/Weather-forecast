import { LIST_DAYS } from "../constants/date";

const getAverageValueBykey = (times, key) => {
  const valueKeys = times.map((time) => {
    const valueKey = time[key]?.sg || time[key]?.noaa || time[key]?.dwd;
    return Number.parseInt(valueKey, 0);
  });
  const summaryValueKeys = valueKeys.reduce(
    (accamulator, current) => accamulator + current,
    0
  );
  const averageValue = summaryValueKeys / times.length;
  return Math.floor(averageValue);
};

export const parsedWeatherForecastData = (hours) => {
  const weatherForecast = [];
  for (let i = 0; i < hours.length; i++) {
    const { time, ...rest } = hours[i];
    const currentHour = new Date(time).getHours();
    const currentDay = new Date(time).getDay();
    const currentDate = new Date(time).getUTCDate();
    const foundDay = weatherForecast.findIndex(
      (day) => day.numberDay === currentDate
    );
    const newTime = {
      hour: currentHour,
      ...rest,
    };
    if (foundDay >= 0) {
      weatherForecast[foundDay]?.times.push(newTime);
    } else {
      const indexLastItem = weatherForecast.length - 1;
      const prevItemId = weatherForecast[indexLastItem]?.id || 0;
      weatherForecast.push({
        id: weatherForecast.length ? prevItemId + 1 : 1,
        numberDay: currentDate,
        day: LIST_DAYS[currentDay],
        times: [newTime],
      });
    }
  }
  for (let i = 0; i < weatherForecast.length; i++) {
    try {
      const times = weatherForecast[i].times;
      const averageAirTemperature = getAverageValueBykey(
        times,
        "airTemperature"
      );
      const averageWindSpeed = getAverageValueBykey(times, "windSpeed");
      weatherForecast[i].averageAirTemperature = averageAirTemperature;
      weatherForecast[i].averageWindSpeed = averageWindSpeed;
      weatherForecast[i].times = times.map((time) => {
        const airTemperature =
          time.airTemperature.sg || time.airTemperature.noaa;
        const windSpeed = time.windSpeed.sg || time.windSpeed.noaa;
        const pressure =
          (time.pressure.sg && time.pressure.sg * 0.7501) ||
          (time.pressure.noaa && time.pressure.noaa * 0.7501);
        return {
          ...time,
          airTemperature: Number.parseInt(airTemperature, 0),
          windSpeed: Number.parseInt(windSpeed, 0),
          pressure: Number.parseInt(pressure, 0),
        };
      });
    } catch (error) {
      console.log({ error });
    }
  }

  return weatherForecast;
};

export const mapSortFieldTimes = ({ times, ...rest }) => {
  const newTimes = times.sort((a, b) => a.hour - b.hour);
  return {
    times: newTimes,
    ...rest,
  };
};

export const getWeatherForecast = (hours, countDays) => {
  const wetherForecast = parsedWeatherForecastData(hours);
  if (countDays) {
    return wetherForecast
      .filter((day) => day.id <= countDays)
      .map(mapSortFieldTimes);
  }
  return wetherForecast.map(mapSortFieldTimes);
};
