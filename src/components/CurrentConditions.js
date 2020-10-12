import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import { fetchOneCall } from "../utils/weather-api";
import { getWeatherIcon, tempConvert } from "../utils/helpers";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 16,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    boxSizing: "border-box",
    color: "white",
    textAlign: "left",
    padding: "30px",
    maxWidth: "90%",
    margin: "0 auto",
  },
  icon: {},
  locality: {},
  time: {
    display: "block",
  },
  currentTemp: {
    fontSize: "6rem",
    margin: "0",
  },
  conditions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
// console.log(fetchOneCall());

function MinMaxTemp({ min, max }) {
  return (
    <h3 style={{ margin: "0" }}>
      <span>Low {min}&deg;</span> / <span>High {max}&deg;</span>
    </h3>
  );
}

export default function CurrentConditions({ city, data }) {
  const classes = useStyles();
  console.log(data);

  let { temp } = data.current;
  let { max, min } = data.daily[0].temp;
  let { main, id } = data.current.weather[0];
  console.log("Hello");
  // Convert Temp to f
  temp = tempConvert(temp);
  let temp_max = tempConvert(max);
  let temp_min = tempConvert(min);

  id = getWeatherIcon(id);

  return (
    <Box className={classes.root}>
      <h2 style={{ margin: "0" }}>
        Current Conditions in {city}
        {/* <small className={classes.time}>as of 7:30pm EDT</small> */}
      </h2>
      <div className={classes.conditions}>
        <div>
          <h3 className={classes.currentTemp}>{temp}&deg;</h3>
          <h3 className="weather-description" style={{ margin: "0" }}>
            {main}
          </h3>
        </div>
        <div style={{ textAlign: "center" }}>
          <i
            className={`wi ${id}`}
            style={{ fontSize: "4rem", margin: "29px 0 19px" }}
          ></i>
          <MinMaxTemp min={temp_min} max={temp_max} />
        </div>
      </div>

      {/* <p>15% Chance of rain through 8pm</p> */}
    </Box>
  );
}
