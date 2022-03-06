import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [background, setBackground] = useState("");
  const apiKey = "6e9d4f293b4ca6125a76f18e2ec4cf22";

  const apiCall = async (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value;
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const req = axios.get(baseUrl);
    const res = await req;

    setWeather({
      weatherType: res.data.weather[0].main,
      weatherDescription: res.data.weather[0].description,
      weatherTemp: res.data.main.temp,
      weatherHumidity: res.data.main.humidity,
      weatherFeels: res.data.main.feels_like,
      weatherWind: res.data.wind.speed,
      weatherCity: res.data.name,
    });

    setCity(res.data.name);
    setBackground(res.data.weather[0].main);
  };

  const WeatherBackground = () => {
    if (background === "") {
      return (
        <video autoPlay loop muted className="video">
          <source src={"./background/background.mp4"} type="video/mp4" />
        </video>
      );
    } else {
      return (
        <video autoPlay loop muted className="video">
          <source
            src={`./background/background${background}.mp4`}
            type="video/mp4"
          />
        </video>
      );
    }
  };

  const Weath = () => {
    return (
      <div className="weather_description">
        <div>
          <h2>
            The temperature in {city} is {Math.round(weather.weatherTemp)}°C
          </h2>
          <hr></hr>
          <div>Weather: {weather.weatherDescription}</div>
          <div>Wind speed: {Math.round(weather.weatherWind * 1.852)} km/h</div>
          <div>Feels like: {Math.round(weather.weatherFeels)} °C</div>
          <div className="weather_humidity">
            Humidity: {weather.weatherHumidity} %
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="weather_container">
        {<WeatherBackground />}
        <form onSubmit={apiCall} className="weather">
          <input
            type="text"
            name="location"
            className="weather_search"
            placeholder="Enter city name"
          />
          <button className="weather_button">Check the weather</button>
        </form>
      </div>
      {weather && <Weath />}
      {/*На всякий случай альтернативный вариант {weather ? <Weath /> : ""} */}
    </>
  );
}
