import { TripDto } from "../../../../DTOs/tripDto";
import { tripsService } from "../../../../services/services";
import { useStoreDispatch } from "../../../../store/store";
import { selectTrip } from "../../../../store/trips";
import { TripCard } from "../trip-card/trip-card";
import { TripModal } from "../trip-modal/trip-modal";
import style from "./trips-list.module.css";
import { useRef, useState } from "react";

type Props = {
  trips: TripDto[];
};

const SCROLL = 200;

const TripsList = ({ trips }: Props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState("");
  const dispatch = useStoreDispatch();

  const handleTripCardClick = (id: string) => {
    const selectedTrip = tripsService.findById(id, trips);
    if (selectedTrip) {
      dispatch(selectTrip(selectedTrip));
    }
    setSelected(id);
  };

  const handleScroll = (scrollAmount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  const [isHidden, setIsHidden] = useState(true);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div className={style.container}>
        <div ref={containerRef} className={style.scrollable}>
          <ul className={style.content_box}>
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={handleTripCardClick}
                isSelected={selected === trip.id}
              />
            ))}
            <li className={style.add_trip}>
              <div onClick={toggleIsHidden}>
                <p>+</p>
                <p>Add trip</p>
              </div>
            </li>
          </ul>
        </div>
        <div className={style.action_buttons}>
          <button
            onClick={() => {
              handleScroll(-SCROLL);
            }}
          >
            Scroll Left
          </button>
          <button
            onClick={() => {
              handleScroll(SCROLL);
            }}
          >
            Scroll Right
          </button>
        </div>
      </div>
      <TripModal isHidden={isHidden} toggleIsHidden={toggleIsHidden} />
    </>
  );
};

export { TripsList };
