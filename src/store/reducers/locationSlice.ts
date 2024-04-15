import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchResponce } from "./geocodingSlice";

const initialState: SearchResponce = {
  lat: "0",
  lon: "0",
  name: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<SearchResponce>) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.name = action.payload.name;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
