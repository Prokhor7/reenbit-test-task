import { useEffect } from "react";
import { useAppSelector, useStoreDispatch } from "../../../../store/store";
import style from "./forecasts-list.module.css";
import { getForecast } from "../../../../store/forecast";
import { ForecastItem } from "../forecast-item/forecast-item";

const ForecastsList = (): JSX.Element => {
  const selected = useAppSelector((state) => state.trips.currentTrip);
  const tripDays = useAppSelector((state) => state.forecast.forecast);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (selected) {
      dispatch(getForecast(selected));
    }
  }, [selected]);

  return (
    <div className={style.forecast_container}>
      <h1>Trip's days:</h1>
      {selected ? (
        <div className={style.forecast_list}>
          <ul>
            {tripDays?.days.map((forecast) => (
              <ForecastItem key={forecast.datetime} forecast={forecast} />
            ))}
          </ul>
        </div>
      ) : (
        <strong>No trip selected</strong>
      )}
    </div>
  );
};

export { ForecastsList };
