import { TripDto } from "../../../../DTOs/tripDto";
import { getPathToCityImg } from "../../../../common/helpers/city-img.helper";
import { getDate } from "../../../../common/helpers/date.helper";
import style from "./trip-card.module.css";

type Props = {
  trip: TripDto;
  onClick: (id: string) => void;
  isSelected: boolean;
};

const TripCard = ({ trip, onClick, isSelected }: Props): JSX.Element => {
  const handleCardClick = () => {
    onClick(trip.id);
  };

  return (
    <li className={style.trip_card} onClick={handleCardClick}>
      <img className={style.city_img} src={getPathToCityImg(trip.city)} />
      <div className={`${style.info} ${isSelected ? style.selected : ""}`}>
        <strong>{trip.city}</strong>
        <p>
          {getDate(trip.startDate)} - {getDate(trip.endDate)}
        </p>
      </div>
    </li>
  );
};

export { TripCard };
