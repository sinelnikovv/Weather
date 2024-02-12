import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<any, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `?lat=${lat}&lon=${lon}&exclude=hourly&units=metric&appid=f98a3418c294c0451a96467ba9d4dc6c`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
