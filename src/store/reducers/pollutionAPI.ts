import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { AirQualityResponse } from "../../types";

export const pollutionApi = createApi({
  reducerPath: "pollutionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.openweathermap.org/data/2.5/air_pollution/forecast",
  }),
  endpoints: (builder) => ({
    getPollution: builder.query<
      AirQualityResponse,
      { lat: string; lon: string }
    >({
      query: ({ lat, lon }) =>
        `?lat=${lat}&lon=${lon}&appid=${Constants.expoConfig.extra.openWeatherId}`,
    }),
  }),
});

export const { useGetPollutionQuery } = pollutionApi;
