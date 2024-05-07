import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { WeatherData } from "../../types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherData, { lat: string; lon: string }>({
      query: ({ lat, lon }) =>
        `?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${Constants.expoConfig.extra.openWeatherId}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
