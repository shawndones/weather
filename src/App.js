import React from "react";
import "./App.css";
import CurrentConditions from "./components/CurrentConditions";
import Loading from "./components/Loading";

import "weather-icons/css/weather-icons.css";
import LocationInput from "./components/LocationInput";
import { fetchOneCall, getWeather } from "./utils/weather-api";

const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
const api = "https://api.openweathermap.org/data/2.5/";

function weatherReducer(state, action) {
  // if (action.data.cod !== 200) {
  //   return {
  //     ...state,
  //     error: action.data.message,
  //   };
  // } else
  if (action.type === "success") {
    console.log(action.selectedCity);
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
  const [selectedCity, setSelectedCity] = React.useState("");
  const [lat, setLat] = React.useState("37.09024");
  const [lng, setLng] = React.useState("-95.712891");

  // const selectedCity = "40107";
  //setup useReducer
  const [state, dispatch] = React.useReducer(weatherReducer, { error: null });

  React.useEffect(() => {
    // get lat and lng from selectedcity

    // if selectedCity=undefined then use geolocation.

    if ("geolocation" in navigator) {
      // console.log("position available");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Lat is: ", position.coords.latitude);
        console.log("Lng is: ", position.coords.longitude);
      });
      // console.log();
    } else {
      // if !geolocation then show a message
      console.log(
        "Auto location not available. Please enter a zip code or city."
      );
    }

    fetchOneCall(lat, lng, selectedCity)
      .then((data) => {
        // console.log(selectedCity);
        dispatch({ type: "success", selectedCity, data });
      })
      .catch((error) => dispatch({ type: "error", error }));

    // getWeather(selectedCity)
    //   .then((data) => dispatch({ type: "success", selectedCity, data }))
    //   .catch((error) => dispatch({ type: "error", error }));
  }, [selectedCity, lat, lng]);

  const isLoading = () => !state[selectedCity] && state.error === null;
  // console.log(state[selectedCity]);
  return (
    <div className="App">
      <h1>Hello Weather</h1>
      <LocationInput setSelectedCity={setSelectedCity} />
      {isLoading() && <Loading text="Gettin weather data" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[selectedCity] && (
        <CurrentConditions city={selectedCity} data={state[selectedCity]} />
      )}
    </div>
  );
}

export default App;
