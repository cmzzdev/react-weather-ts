import axios from "axios";
import { parse } from "valibot";
import { SearchType, DataType } from "../types";
import { isWeatherResponse } from "../guards/weather.guard";
import { ZodWeatherSchema } from "../zod/zodweather.schema";
import { ValibotWeatherSchema } from "../valibot/valibotweather.schema";

// type ZodWeatherType = z.infer<typeof ZodWeatherSchema>;
// type ValibotWeatherType = InferOutput<typeof ValibotWeatherSchema>;

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const geoBaseUri = import.meta.env.VITE_GEO_BASE_URI;
    const weatherBaseUri = import.meta.env.VITE_WEATHER_BASE_URI;
    try {
      const geoUrl = `${geoBaseUri}q=${search.city},${search.country}&appid=${apiKey}`;
      const { data } = await axios.get(geoUrl);
      const lat = data[0].lat;
      const lon = data[0].lon;
      const weatherUrl = `${weatherBaseUri}lat=${lat}&lon=${lon}&appid=${apiKey}`;

      // Diferent cases to validate json response:

      // Cast Type
      const { data: weatherResult } = await axios.get<DataType>(weatherUrl);

      // Type Guard validation
      const result = isWeatherResponse(weatherResult);
      console.log("isValidRespone: ", result);

      // Zod validation
      const ZodResult = ZodWeatherSchema.safeParse(weatherResult);
      console.log("isZodValidResponse: ", ZodResult);

      // Valibot validation
      const valibotResult = parse(ValibotWeatherSchema, weatherResult);
      console.log("valibotResult: ", valibotResult);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
