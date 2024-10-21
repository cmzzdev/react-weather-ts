import { object, string, number, array } from "valibot";

export const ValibotWeatherSchema = object({
  base: string(),
  name: string(),
  coord: object({
    lat: number(),
    lon: number(),
  }),
  main: object({
    temp: number(),
    feels_like: number(),
    temp_min: number(),
    temp_max: number(),
    pressure: number(),
    humidity: number(),
    sea_level: number(),
    grnd_level: number(),
  }),
  weather: array(
    object({
      id: number(),
      main: string(),
      description: string(),
      icon: string(),
    })
  ),
});
