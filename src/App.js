import React from "react";
import "./App.css";
import CurrentConditions from "./components/CurrentConditions";
import Loading from "./components/Loading";

import "weather-icons/css/weather-icons.css";
import LocationInput from "./components/LocationInput";

const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
const api = "https://api.openweathermap.org/data/2.5/";

function getWeather(selectedCity) {
  // if zip code convert to lat long
  // if city and state, convert to lat long

  // `${api}/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`

  return fetch(`${api}/weather?q=${selectedCity},us&appid=${APIKEY}`)
    .then((res) => res.json())
    .then((data) => {
      // if (!data.items) {
      //   throw new Error(data.message);
      // }

      return data;
    });
}

function weatherReducer(state, action) {
  if (action.data.cod !== 200) {
    return {
      ...state,
      error: action.data.message,
    };
  } else if (action.type === "success") {
    return {
      ...state,
      [action.selectedCity]: action.data,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.data.message,
    };
  } else {
    throw new Error(`The action type is not supported`);
  }
}

function App() {
  // initialize city state
  const [selectedCity, setSelectedCity] = React.useState("40107");
  // const selectedCity = "40107";
  //setup useReducer
  const [state, dispatch] = React.useReducer(weatherReducer, { error: null });

  React.useEffect(() => {
    // get lat and lng from selectedcity

    getWeather(selectedCity)
      .then((data) => dispatch({ type: "success", selectedCity, data }))
      .catch((error) => dispatch({ type: "error", error }));
  }, [selectedCity]);

  const isLoading = () => !state[selectedCity] && state.error === null;
  return (
    <div className="App">
      <h1>Hello Weather</h1>
      <LocationInput setSelectedCity={setSelectedCity} />
      {isLoading() && <Loading text="Gettin weather data" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[selectedCity] && <CurrentConditions data={state[selectedCity]} />}
    </div>
  );
}

export default App;
