import { DateTime } from "luxon";


const API_KEY = "510cd0b2236762ab68abee5054069515";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details: weather[0].description,
    icon: weather[0].icon,
    speed,
  };
};

const formatForecastweather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastweather = await getWeatherData('onecall', {
      lat,
      lon,
      exclude: "currently,minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastweather);


    return {... formattedCurrentWeather, ...formattedForecastweather };
  } catch (error) {
    console.error('Error fetching or formatting weather data:', error);
    throw error;
  }
};

const formatToLocalTime = (secs, zone, format = "cccc,dd LLL yyyy'|Local time: 'hh:mm a") =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const iconUrlfromCode = (code)=>'http://openweathermap.org/img/wn/${code}@2x.png'

  


export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlfromCode};
