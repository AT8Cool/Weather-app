import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = "{Your OPEN WEATHER API KEY}";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp} °C</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.main && data.wind && (
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              <p className="bold">{data.main.feels_like} °C</p>
            </div>

            <div className="humidity">
              <p>Humidity</p>
              <p className="bold">{data.main.humidity} %</p>
            </div>

            <div className="wind">
              <p>Wind Speed</p>
              <p className="bold">{data.wind.speed} KMPH</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
