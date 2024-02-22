import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TripDto } from "../DTOs/tripDto";
import { tripsService } from "../services/services";

interface ITripsState {
  trips: TripDto[];
  currentTrip: TripDto | null;
}

const initialState: ITripsState = {
  trips: [],
  currentTrip: null,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    initTrips: (state, action: PayloadAction<TripDto[]>) => {
      state.trips = tripsService.sortTrips(action.payload);
    },
    addTrip: (state, action: PayloadAction<TripDto>) => {
      state.trips = tripsService.sortTrips([...state.trips, action.payload]);
    },
    selectTrip: (state, action: PayloadAction<TripDto>) => {
      state.currentTrip = action.payload;
    },
  },
});

export const { initTrips, addTrip, selectTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
