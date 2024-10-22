import axios from "axios";
import { parse } from "valibot";
import { SearchType, WeatherDataType } from "../types";
import { isWeatherResponse } from "../guards/weather.guard";
import { ZodWeatherSchema } from "../zod/zodweather.schema";
import { ValibotWeatherSchema } from "../valibot/valibotweather.schema";
import { useMemo, useState } from "react";

// export type ZodWeatherType = z.infer<typeof ZodWeatherSchema>;
// type ValibotWeatherType = InferOutput<typeof ValibotWeatherSchema>;

const initialStateWeather: WeatherDataType = {
  coord: {
    lon: 0,
    lat: 0,
  },
  base: "",
  name: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
};

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherDataType>(initialStateWeather);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const geoBaseUri = import.meta.env.VITE_GEO_BASE_URI;
    const weatherBaseUri = import.meta.env.VITE_WEATHER_BASE_URI;
    setNotFound(false);
    setLoading(true);
    setWeather(initialStateWeather);
    try {
      const geoUrl = `${geoBaseUri}q=${search.city},${search.country}&appid=${apiKey}`;
      const { data } = await axios.get(geoUrl);

      // Check if exist
      if (!data[0]) {
        setNotFound(true);
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;
      const weatherUrl = `${weatherBaseUri}lat=${lat}&lon=${lon}&appid=${apiKey}`;

      // Diferent cases to validate json response:

      // Cast Type
      const { data: weatherResult } = await axios.get<WeatherDataType>(
        weatherUrl
      );

      // Type Guard validation
      const result = isWeatherResponse(weatherResult);
      console.log("isValidRespone: ", result);

      // Valibot validation
      const valibotResult = parse(ValibotWeatherSchema, weatherResult);
      console.log("valibotResult: ", valibotResult);

      // Zod validation
      const ZodResult = ZodWeatherSchema.safeParse(weatherResult);
      console.log("isZodValidResponse: ", ZodResult);

      if (ZodResult.success) {
        setWeather(ZodResult.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
}
