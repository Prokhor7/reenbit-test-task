import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ForecastsDto } from "../DTOs/forecastDto";
import { TripDto } from "../DTOs/tripDto";
import { weatherForecastService } from "../services/services";

interface IForecastState {
  forecast: ForecastsDto | null;
  today: ForecastsDto | null;
}

const initialState: IForecastState = {
  forecast: null,
  today: null,
};

export const getToday = createAsyncThunk(
  "forecast/get-today",
  async (trip: TripDto) => {
    const response = await weatherForecastService.getToday(trip);
    return response;
  }
);

export const getForecast = createAsyncThunk(
  "forecast/get-forecast",
  async (trip: TripDto) => {
    const response = await weatherForecastService.getForecast(trip);
    return response;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToday.fulfilled, (state, action) => {
      state.today = action.payload;
    });

    builder.addCase(getForecast.fulfilled, (state, action) => {
      state.forecast = action.payload;
    });
  },
});

export default forecastSlice.reducer;
