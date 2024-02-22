import { TripDto } from "../../../../DTOs/tripDto";
import { tripsService } from "../../../../services/services";
import { useAppSelector } from "../../../../store/store";
import style from "./trips-search.module.css";
import { useEffect, useState } from "react";

type Props = {
  setTrips: (trips: TripDto[]) => void;
};

const TripsSearch = ({ setTrips }: Props): JSX.Element => {
  const trips = useAppSelector((state) => state.trips.trips);
  const [query, setQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const result = tripsService.searchByCity(query, trips);
    setTrips(result);
    if (query === "") setTrips(trips);
  }, [query]);

  return (
    <div className={style.searchContainer}>
      <div className={style.zoomIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search your trip"
        value={query}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export { TripsSearch };
