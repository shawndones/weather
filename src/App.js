import React from "react";
import "./App.css";
import Geocode from "react-geocode";
import CurrentConditions from "./components/CurrentConditions";
import Loading from "./components/Loading";

const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
const api = "https://api.openweathermap.org/data/2.5/";

const GEOAPIKEY = process.env.REACT_APP_GEOCODE_APIKEY;

Geocode.setApiKey(GEOAPIKEY);
Geocode.setLanguage("us");
Geocode.enableDebug();

function getWeather(lat, lng) {
  // `${api}/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`
  // `${api}/weather?q=${selectedCity},us&appid=${APIKEY}`
  return fetch(`${api}/onecall?lat=${lat}&lon=${lng}&appid=${APIKEY}`)
    .then((res) => res.json())
    .then((data) => {
      // if (!data.items) {
      //   throw new Error(data.message);
      // }

      return data;
    });
}

function weatherReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      [action.selectedCity]: action.data,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error.message,
    };
  } else {
    throw new Error(`The action type is not supported`);
  }
}

function App() {
  // initialize city state
  const [selectedCity, setSelectedCity] = React.useState("Boston, KY");

  const [locationData, setLocationData] = React.useState({ lat: 0, lng: 0 });
  //setup useReducer
  const [state, dispatch] = React.useReducer(weatherReducer, { error: null });

  React.useEffect(() => {
    setSelectedCity("Boston, KY");
    Geocode.fromAddress(selectedCity).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLocationData({ lat, lng });
      },
      (error) => {
        console.error(error);
      }
    );

    let { lat, lng } = locationData;

    getWeather(lat, lng)
      .then((data) =>
        dispatch({ type: "success", selectedCity, lat, lng, data })
      )
      .catch((error) => dispatch({ type: "error", error }));
  }, [selectedCity]);

  const isLoading = () => !state[selectedCity] && state.error === null;

  return (
    <div className="App">
      <h1>Weather App</h1>
      {isLoading() && <Loading text="Gettin weather data" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[selectedCity] && <CurrentConditions data={state[selectedCity]} />}
    </div>
  );
}

export default App;
