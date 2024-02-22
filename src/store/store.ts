import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import trips from "./trips";
import forecast from "./forecast";

const store = configureStore({
  reducer: {
    trips,
    forecast,
  },
});

const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
type RootState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useStoreDispatch, useAppSelector };
export type { RootState };
