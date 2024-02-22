import { TripDto } from "../DTOs/tripDto";
import { v4 as uuidv4 } from "uuid";

class Trip {
  private sortByStartDate = (a: TripDto, b: TripDto): number => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();

    return dateA - dateB;
  };

  public sortTrips = (trips: TripDto[]): TripDto[] => {
    const sortedTrips = [...trips];
    sortedTrips.sort(this.sortByStartDate);
    localStorage.setItem("trips-store", JSON.stringify(sortedTrips));

    return sortedTrips;
  };

  public create = ({
    city,
    startDate,
    endDate,
  }: {
    city: string;
    startDate: string;
    endDate: string;
  }): TripDto => {
    const newTrip: TripDto = {
      id: uuidv4(),
      city,
      startDate,
      endDate,
    };

    return newTrip;
  };

  public findById = (id: string, trips: TripDto[]): TripDto | null => {
    return trips.find((trip) => trip.id === id) || null;
  };

  public searchByCity = (city: string, trips: TripDto[]): TripDto[] => {
    const filteredTrips = trips.filter((trip) =>
      trip.city.toLowerCase().includes(city.toLowerCase())
    );
    return filteredTrips;
  };
}

export { Trip };
