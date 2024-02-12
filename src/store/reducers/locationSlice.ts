import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type location = {
  lat: number;
  lon: number;
};

const initialState: location = {
  lat: 0,
  lon: 0,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<location>) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
