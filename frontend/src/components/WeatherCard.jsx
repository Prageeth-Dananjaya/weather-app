import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Snowflake,
  Wind,
  CloudLightning,
} from "lucide-react";

const WeatherCard = ({ data }) => {
  // Map weather conditions to icons
  const getWeatherIcon = (desc) => {
    const d = desc?.toLowerCase() || "";
    if (d.includes("clear")) return <Sun size={24} />;
    if (d.includes("rain")) return <CloudRain size={24} />;
    if (d.includes("cloud")) return <Cloud size={24} />;
    if (d.includes("snow")) return <Snowflake size={24} />;
    if (d.includes("storm") || d.includes("thunder"))
      return <CloudLightning size={24} />;
    return <CloudSun size={24} />;
  };

  // Map weather to background colors
  const getCardColor = (desc) => {
    const d = desc?.toLowerCase() || "";
    if (d.includes("clear")) return "bg-yellow-500";
    if (d.includes("rain")) return "bg-blue-600";
    if (d.includes("cloud")) return "bg-gray-500";
    if (d.includes("snow")) return "bg-cyan-400";
    if (d.includes("storm") || d.includes("thunder")) return "bg-purple-600";
    return "bg-blue-500";
  };

  const cardColor = getCardColor(data.description);
  const weatherIcon = getWeatherIcon(data.description);

  return (
    <div className="text-white w-85 rounded-lg shadow-lg transition transform hover:scale-105 border-2">
      {/* Top section */}
      <div
        className={`${cardColor} flex items-center justify-between p-5 rounded-t-lg`}
      >
        <div className="flex flex-col items-center">
          <p className="font-bold">
            {data.name}, {data.country}
          </p>
          <p className="text-xs mb-4">{data.time}</p>
          <div className="flex gap-2 items-center">
            {weatherIcon}
            <p className="capitalize">{data.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{data.temp}°C</p>
          <div className="text-sm">
            <p>Temp Min: {data.tempMin}°C</p>
            <p>Temp Max: {data.tempMax}°C</p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-gray-700 flex p-3 text-xs justify-between items-center rounded-b-lg">
        <div className="flex flex-col gap-1">
          <p>Pressure: {data.pressure} hPa</p>
          <p>Humidity: {data.humidity}%</p>
          <p>Visibility: {data.visibility} km</p>
        </div>
        <div className="flex flex-col items-center text-xs">
          <Wind size={12} />
          {data.windSpeed} m/s {data.windDeg}°
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <p>Sunrise: {data.sunrise}</p>
          <p>Sunset: {data.sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;