export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  rain?: { "1h": number };
  snow?: { "1h": number };
  pollution?: AirQualityData;
};

export interface HourlyWeather
  extends Omit<CurrentWeather, "sunrise" | "sunset"> {
  pop: number;
}

export type DailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
};

export type WeatherData = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

export type SearchResponce = {
  name: string;
  lat: string;
  lon: string;
};

export type geocodingInitialState = {
  data: SearchResponce[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

type Components = {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
};

export type AirQualityData = {
  main: {
    aqi: number;
  };
  components: Components;
  dt: number;
};

export type AirQualityResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  list: AirQualityData[];
};
