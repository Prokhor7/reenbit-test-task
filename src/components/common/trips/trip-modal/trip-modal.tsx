import style from "./trip-modal.module.css";
import data from "../../../../assets/cities/cities.json";
import { ChangeEvent, FormEvent, useState } from "react";
import { useStoreDispatch } from "../../../../store/store";
import { addTrip } from "../../../../store/trips";
import { tripsService } from "../../../../services/services";

type Props = {
  isHidden: boolean;
  toggleIsHidden: () => void;
};

const minDate = new Date();
const maxDate = new Date();
minDate.setDate(minDate.getDate() + 1);
maxDate.setDate(maxDate.getDate() + 15);

const TripModal = ({ isHidden, toggleIsHidden }: Props): JSX.Element => {
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleClose = () => {
    setSelectedCity("");
    setStartDate("");
    setEndDate("");
    toggleIsHidden();
  };

  const dispatch = useStoreDispatch();

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (startDate < endDate) {
      dispatch(
        addTrip(tripsService.create({ city: selectedCity, startDate, endDate }))
      );
      handleClose();
    } else {
      alert("The start date must be before the end date");
    }
  };

  return (
    <div hidden={isHidden}>
      <div className={style.modal}>
        <div className={style.popup}>
          <div className={style.popup__header}>
            <strong>Create trip</strong>
            <button className={style.popup__close} onClick={handleClose}>
              ×
            </button>
          </div>
          <form autoComplete="off" onSubmit={handleOnSubmit}>
            <div className={style.popup__form}>
              <label className={style.select_city}>
                <p>City</p>
                <select
                  name="selectedCity"
                  value={selectedCity}
                  onChange={handleSelectCity}
                  required
                >
                  <option value="" disabled hidden>
                    Please select a city
                  </option>
                  {data.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label className={style.select_date}>
                <p>Start date</p>
                <input
                  name="startDate"
                  type="date"
                  min={minDate.toISOString().split("T")[0]}
                  max={maxDate.toISOString().split("T")[0]}
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
              </label>
              <label className={style.select_date}>
                <p>End date</p>
                <input
                  name="endDate"
                  type="date"
                  min={minDate.toISOString().split("T")[0]}
                  max={maxDate.toISOString().split("T")[0]}
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                />
              </label>
            </div>
            <div className={style.popup__buttons}>
              <button type="button" onClick={handleClose}>
                Close
              </button>
              <button className={style.submit} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { TripModal };
