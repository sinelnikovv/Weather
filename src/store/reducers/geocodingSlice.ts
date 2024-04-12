// geocodingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export type SearchResponce = {
  name: string;
  lat: string;
  lon: string;
};

type initialStateType = {
  data: SearchResponce[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: initialStateType = {
  data: [],
  status: "idle",
  error: null,
};
export const fetchCoordinates = createAsyncThunk<SearchResponce[], string>(
  "geocoding/fetchCoordinates",
  async (city: string) => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.0e1ce1fb5b5bcae2803eef081c2d6846&q=${city}&format=json`,
    );
    const data = await response.json();
    return data.map((location) => ({
      name: location.display_name,
      lat: location.lat,
      lon: location.lon,
    }));
  },
);

const geocodingSlice = createSlice({
  name: "geocoding",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoordinates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCoordinates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default geocodingSlice.reducer;
