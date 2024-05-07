import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentWeather } from "../../types";

const initialState: CurrentWeather = {
  dt: 0,
  sunrise: 0,
  sunset: 0,
  temp: 0,
  feels_like: 0,
  pressure: 0,
  humidity: 0,
  dew_point: 0,
  uvi: 0,
  clouds: 0,
  visibility: 0,
  wind_speed: 0,
  wind_deg: 0,
  wind_gust: 0,
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  pollution: {
    main: {
      aqi: 0,
    },
    components: {
      co: 0,
      no: 0,
      no2: 0,
      o3: 0,
      so2: 0,
      pm2_5: 0,
      pm10: 0,
      nh3: 0,
    },
    dt: 0,
  },
};

export const selectedWeatherSlice = createSlice({
  name: "selectedWeather",
  initialState,
  reducers: {
    setSelectedWeather: (state, action: PayloadAction<CurrentWeather>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSelectedWeather } = selectedWeatherSlice.actions;

export default selectedWeatherSlice.reducer;
