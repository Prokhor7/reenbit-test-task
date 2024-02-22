import { ForecastDto } from "../../../../DTOs/forecastDto";
import { getDateString } from "../../../../common/helpers/date.helper";
import { getIconUrl } from "../../../../common/helpers/weather-icon.helper";
import style from "./forecast-item.module.css";

type Props = {
  forecast: ForecastDto;
};

const ForecastItem = ({ forecast }: Props): JSX.Element => {
  return (
    <li className={style.forecast}>
      <p className={style.day}>{getDateString(forecast.datetime)}</p>
      <img className={style.forecast_img} src={getIconUrl(forecast.icon)} alt="weather icon"/>
      <p>{forecast.tempmin}&deg;/{forecast.tempmax}&deg;</p>
    </li>
  );
};

export { ForecastItem };
