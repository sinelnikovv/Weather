import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./reducers/weatherAPI";
import locationReducer from "./reducers/locationSlice";
import geocodingReducer from "./reducers/geocodingSlice";
import selectedWeatherReducer from "./reducers/selectedWeatherSlice";
import { useDispatch } from "react-redux";
import { pollutionApi } from "./reducers/pollutionAPI";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [pollutionApi.reducerPath]: pollutionApi.reducer,
    location: locationReducer,
    geocoding: geocodingReducer,
    selectedWeather: selectedWeatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(pollutionApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
