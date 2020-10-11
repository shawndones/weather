export function tempConvert(temp) {
  temp = ((temp - 273.15) * 9) / 5 + 32;
  return Math.floor(temp);
}

export function getWeatherIcon(rangeId) {
  // add night and day icons
  const weatherIcons = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-rain",
    Snow: "wi-snow",
    Clear: "wi-day-sunny",
    Clouds: "wi-cloudy",
    Smoke: "wi-smoke",
    Fog: "wi-fog",
    Tornado: "wi-tornado",
  };

  let wi = "";
  switch (true) {
    case rangeId >= 200 && rangeId <= 232:
      wi = weatherIcons.Thunderstorm;
      break;
    case rangeId >= 300 && rangeId <= 321:
      wi = weatherIcons.Drizzle;
      break;
    case rangeId >= 500 && rangeId <= 531:
      wi = weatherIcons.Rain;
      break;
    case rangeId >= 600 && rangeId <= 622:
      wi = weatherIcons.Snow;
      break;
    case rangeId === 800:
      wi = weatherIcons.Clear;
      break;
    case rangeId >= 801 && rangeId <= 804:
      wi = weatherIcons.Clouds;
      break;
    default:
      wi = "wi-na";
  }

  return wi;
}
