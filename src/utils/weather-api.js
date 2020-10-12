const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;
const api = "https://api.openweathermap.org/data/2.5/";

// console.log(APIKEY);

export function fetchOneCall(lat, lng) {
  return fetch(
    `${api}/onecall?lat=${lat}&lon=${lng}&appid=${APIKEY}`
  ).then((res) => res.json());
}

export function getWeather(selectedCity) {
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
// export function currentWeather(lat, lon, part) {
//   // const data =
// }

// var currentWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${APIKEY}`)
// .then(response => response.json());
// var forecastWeather = fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip},us&appid=${APIKEY}`)
// .then(response => response.json());
// var combinedData = {"currentWeather":{},"forecastWeather":{}};
// Promise.all([currentWeather, forecastWeather])
//   .then(data => {
//     combinedData["currentWeather"] = data[0];
//     combinedData["forecastWeather"] = data[1];
//     return combinedData;
//   }).then(combinedData => {
//     // console.log(combinedData["currentWeather"]);
//     // console.log(combinedData["forecastWeather"]);
//     const { weather, main } = combinedData["currentWeather"];
//     const { temp } = main;
//     const { list } = combinedData["forecastWeather"];

//     this.setState({
//       currentTemp: temp,
//       weather: weather[0],
//       forecast: list
//     })
//   });
// }

// getHighsLows = (list) => {

//   // let listKeys = Object.keys(list);
//   let listValues = Object.values(list);

//   // console.log(listValues);
//   let prevDay;
//   let dayTemps = [];
//   let i = 0;

//   for(const value of listValues) {
//     // console.log(previousDate + value.dt_txt);
//     let nowDay = new Date(value.dt_txt);
//     // console.log(nowDay);
//     nowDay = moment(nowDay).format('dddd');

//     // let nowMonth = nowDay.getDate();
//     // console.log(nowDay)
//     // console.log(value.dt_txt);
//     // console.log(prevDay);
//     if((nowDay === prevDay) || (i === 0) ) {

//       dayTemps.push(value.main.temp);
//         // console.log(value.main.temp);
//       // console.log(dayTemps);

//     } else {
//         // Stop interation and find low and high temp for this day
//         // console.log(nowDay);
//         // console.log(Math.max(...dayTemps));
//         // console.log(Math.floor(...dayTemps));

//         // Reset for new day
//         dayTemps = [];
//         i = 0;
//     }

//     // const dates = [];
//   //  dates.push = value.dt_txt;
//   prevDay = new Date(value.dt_txt);
//   prevDay = nowDay;
//    i++;
//   }

// }

// getDailyWeather = (data) => {

//   let dailyWeather = []

//   let yesterday;
//   let i = 0;

//   let dailyWeatherDays = data.map(item => {

//     let today = new Date(item.dt_txt);
//     today = moment(today).format('dddd');

//     if(yesterday !== today) {
//       if(i === 0) {
//         yesterday = today
//       }
//       return today

//     } else {
//       return null
//     }

//   });

//   console.log(dailyWeatherDays)
//   return dailyWeather;
// }
