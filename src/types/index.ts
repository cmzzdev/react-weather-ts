export type SearchType = {
  city: string;
  country: string;
};

export type CountryType = {
  code: string;
  name: string;
};

export type DataType = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  name: string;
};

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
