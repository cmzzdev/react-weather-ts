import { WeatherDataType, Weather } from "../types";

function isCoord(obj: unknown): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "lat" in obj &&
    typeof obj.lat === "number" &&
    "lon" in obj &&
    typeof obj.lon === "number"
  );
}

function isWeather(obj: unknown): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "number" &&
    "main" in obj &&
    typeof obj.main === "string" &&
    "description" in obj &&
    typeof obj.description === "string" &&
    "icon" in obj &&
    typeof obj.icon === "string"
  );
}

function isMain(obj: unknown): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "temp" in obj &&
    typeof obj.temp === "number" &&
    "feels_like" in obj &&
    typeof obj.feels_like === "number" &&
    "temp_min" in obj &&
    typeof obj.temp_min === "number" &&
    "temp_max" in obj &&
    typeof obj.temp_max === "number" &&
    "pressure" in obj &&
    typeof obj.pressure === "number" &&
    "humidity" in obj &&
    typeof obj.humidity === "number" &&
    "sea_level" in obj &&
    typeof obj.sea_level === "number" &&
    "grnd_level" in obj &&
    typeof obj.grnd_level === "number"
  );
}

// Type Guard or Assertion

export const isWeatherResponse = (weather: unknown): weather is Weather => {
  return (
    Boolean(weather) &&
    typeof (weather as WeatherDataType).base === "string" &&
    typeof (weather as WeatherDataType).name === "string" &&
    isCoord((weather as WeatherDataType).coord) &&
    isWeather((weather as WeatherDataType).weather[0]) &&
    isMain((weather as WeatherDataType).main)
  );
};
