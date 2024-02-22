import { useEffect } from "react";
import { useAppSelector, useStoreDispatch } from "../../../../store/store";
import style from "./forecast-now.module.css";
import { getToday } from "../../../../store/forecast";
import { getDayOfWeek } from "../../../../common/helpers/date.helper";
import { getIconUrl } from "../../../../common/helpers/weather-icon.helper";

const ForecastNow = (): JSX.Element => {
  const selected = useAppSelector((state) => state.trips.currentTrip);
  const today = useAppSelector((state) => state.forecast.today);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (selected) {
      dispatch(getToday(selected));
    }
  }, [selected]);

  useEffect(() => {
    if (selected) {
      dispatch(getToday(selected));

      const intervalId = setInterval(() => {
        const now = new Date();
        const startDate = new Date(selected.startDate);

        if (startDate > now) {
          const difference = startDate.getTime() - now.getTime();
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          const daysElement = document.getElementById("days");
          const hoursElement = document.getElementById("hours");
          const minutesElement = document.getElementById("minutes");
          const secondsElement = document.getElementById("seconds");

          if (daysElement) daysElement.innerText = days.toString();
          if (hoursElement) hoursElement.innerText = hours.toString();
          if (minutesElement) minutesElement.innerText = minutes.toString();
          if (secondsElement) secondsElement.innerText = seconds.toString();
        } else {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selected]);

  return (
    <div className={style.forecast_container}>
      {selected && today ? (
        <>
          <div className={style.now}>
            <h2>
              <strong>{getDayOfWeek(today?.days[0].datetime)}</strong>
            </h2>
            <div className={style.icon_temp}>
              <img
                className={style.forecast_img}
                src={getIconUrl(today?.days[0].icon)}
                alt="weather icon"
              />
              <h1>{today?.days[0].temp}&deg;</h1>
            </div>
            <h3>{selected.city}</h3>
          </div>
          <div className={style.timer}>
            <div className={style.time_block}>
              <strong id="days"></strong>
              <p>DAYS</p>
            </div>
            <div className={style.time_block}>
              <strong id="hours"></strong>
              <p>HOURS</p>
            </div>
            <div className={style.time_block}>
              <strong id="minutes"></strong>
              <p>MINUTES</p>
            </div>
            <div className={style.time_block}>
              <strong id="seconds"></strong>
              <p>SECONDS</p>
            </div>
          </div>
        </>
      ) : (
        <strong>No trip selected</strong>
      )}
    </div>
  );
};

export { ForecastNow };
