import { Trip } from "./trips.service";
import { WeatherForecast } from "./weather-forecast.service";

const tripsService = new Trip();
const weatherForecastService = new WeatherForecast();

export { tripsService, weatherForecastService };
