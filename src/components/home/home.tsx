import { useEffect, useState } from "react";
import style from "./home.module.css";
import { useAppSelector, useStoreDispatch } from "../../store/store";
import { initTrips } from "../../store/trips";
import data from "../../assets/mock-data/trips.json";
import { TripsSearch } from "../common/trips/trips-search/trips-search";
import { TripDto } from "../../DTOs/tripDto";
import { TripsList } from "../common/trips/trips-list/trips-list";
import { ForecastsList } from "../common/forecasts/forecasts-list/forecasts-list";
import { ForecastNow } from "../common/forecasts/forecast-now/forecast-now";

const Home = (): JSX.Element => {
  const trips = useAppSelector((state) => state.trips.trips);
  const dispatch = useStoreDispatch();
  const [currentTrips, setCurrentTrips] = useState<TripDto[]>([]);

  useEffect(() => {
    const storedTrips = localStorage.getItem("trips-store");
    if (storedTrips) {
      dispatch(initTrips(JSON.parse(storedTrips)));
    } else {
      dispatch(initTrips(data.trips));
    }
  }, []);

  useEffect(() => {
    setCurrentTrips(trips);
  }, [trips]);

  return (
    <div className={style.home_container}>
      <div className={style.block}>
        <h1>
          Weather <strong>Forecast</strong>
        </h1>
        <TripsSearch setTrips={setCurrentTrips} />
        <TripsList trips={currentTrips} />
        <ForecastsList />
      </div>
      <ForecastNow />
    </div>
  );
};

export { Home };
