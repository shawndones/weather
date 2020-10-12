import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";

export default function LocationInput({ setSelectedCity }) {
  const localityRef = React.useRef("");
  const [localityValue, setLocalityValue] = React.useState("");
  // const { locality, setLocation } = React.useContext(LocationContext);
  const handleChange = (event) => {
    setLocalityValue(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedCity(localityRef.current.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="location-input-form"
      style={{ margin: "16px auto 32px", width: "50%" }}
    >
      {/* <p>Enter a city or zip code</p> */}
      <Grid
        container
        direction="row"
        justify="center"
        spacing={1}
        alignItems="center"
      >
        <Grid item xs={6}>
          <TextField
            id="locality"
            // helperText="Enter a City or Zip"
            autoComplete="off"
            label="Enter a City or Zip"
            value={localityValue}
            onChange={handleChange}
            inputRef={localityRef}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            className="btn btn-dark"
            disabled={!localityValue}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
