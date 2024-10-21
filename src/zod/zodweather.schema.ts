import { z } from "zod";

// Zod validation schema
export const ZodWeatherSchema = z.object({
  base: z.string(),
  name: z.string(),
  coord: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    sea_level: z.number(),
    grnd_level: z.number(),
  }),
  weather: z
    .object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
    .array(),
});
