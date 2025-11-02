import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import WeatherCard from "../components/WeatherCard";
import { CloudSun } from "lucide-react";
import Footer from "../components/Footer";

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const fetchWeather = async (cityName = "") => {
    try {
      setLoading(true);
      setError(null);
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.get(`${backend}/api/weather`, {
        headers: { Authorization: `Bearer ${token}` },
        params: cityName ? { city: cityName } : {},
      });
      setWeather(res.data);
    } catch (err) {
      console.error("Auth or API error:", err);
      setError("Failed to fetch weather data.");

      if (
        err.error === "consent_required" ||
        err.error === "login_required" ||
        err.error === "interaction_required"
      ) {
        loginWithRedirect({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: "read:weather",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchWeather();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 text-gray-800">
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4">
            Welcome to the Weather App
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to view real-time weather data for your favorite
            cities.
          </p>
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
          >
            Login with Auth0
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: "url('/images/weather-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between relative p-4 mb-4 bg-white rounded-lg shadow">
        <div className="flex-1 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <CloudSun className="text-cyan-700 w-10 h-10" />
            Weather App
          </h1>
        </div>

        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <main className="grow p-6 md:p-6">
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weather.map((w) => (
            <WeatherCard
              key={w.id}
              data={w}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-4"
            />
          ))}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Home;
