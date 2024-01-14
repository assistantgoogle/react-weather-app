import './App.css';
import TopButtons from './components/TopButtons';
import Input from './components/Input';
import TimeandLocation from './components/TimeandLocation';
import TempandDetail from './components/TempandDetail';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './Services/WeatherService'; // Correct import statement
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        

        // Check if data is not undefined before updating state
        if (data) {
          setWeather(data);
        } else {
          console.error("Received undefined data from API.");
        }
      } catch (error) {
        console.error("Error fetching or formatting weather data:", error);
      }
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-auto shadow-xl shadow-gray-400">
      <TopButtons />
      <Input />
      
      <TimeandLocation />
      <TempandDetail />

      <Forecast title="hourly forecast" />
      <Forecast title="daily forecast" />
    </div>
  );
}

export default App;
