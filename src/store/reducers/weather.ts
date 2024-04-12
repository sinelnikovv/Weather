import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<any, { lat: string; lon: string }>({
      query: ({ lat, lon }) =>
        `?lat=${lat}&lon=${lon}&exclude=hourly,alerts&units=metric&appid=${Constants.expoConfig.extra.openWeatherId}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
