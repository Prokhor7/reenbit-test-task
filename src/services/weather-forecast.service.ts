import { ForecastsDto } from "../DTOs/forecastDto";
import { TripDto } from "../DTOs/tripDto";
import { API } from "../common/enums/api.enum";

class WeatherForecast {
  public getToday(trip: TripDto): Promise<ForecastsDto> {
    return fetch(API.TODAY.replace("[city]", trip.city))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${trip.city}`);
        }
        return response.json();
      })
      .then((data: ForecastsDto) => data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  public getForecast(trip: TripDto): Promise<ForecastsDto> {
    return fetch(
      API.FORECAST.replace("[city]", trip.city)
        .replace("[date1]", trip.startDate)
        .replace("[date2]", trip.endDate)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data for ${trip.city}(${trip.startDate} - ${trip.endDate})`
          );
        }
        return response.json();
      })
      .then((data: ForecastsDto) => data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export { WeatherForecast };
