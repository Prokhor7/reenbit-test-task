export type ForecastDto = {
  datetime: string;
  temp: number;
  tempmin: number;
  tempmax: number;
  icon: string;
};

export type ForecastsDto = {
  days: ForecastDto[];
};
