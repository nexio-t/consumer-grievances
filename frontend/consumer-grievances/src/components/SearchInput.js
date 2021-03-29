/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "10px",
  },
}));

export default function SearchInput({ searchState, fullOptions }) {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);

  const onChange = (event, newValue) => {
    console.log("newValue is: ", newValue);
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
  };

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const classes = useStyles();

  return (
    <div className={classes}>
      <Grid margin={2}>
        {" "}
        <Autocomplete
          fullWidth={true}
          id="combo-box-demo"
          options={fullOptions}
          getOptionLabel={(option) => option.full}
          onChange={(event, newValue) => {
            console.log("newValue is: ", newValue);
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select State" variant="outlined" />
          )}
        />
      </Grid>
      <Grid margin={2}>
        {" "}
        <div className={classes.button}>
          <Button
            width="100%"
            type="entrarbutton"
            variant="contained"
            color="primary"
            onClick={() => {
              searchState(inputValue);
            }}
          >
            {" "}
            Search
          </Button>
        </div>
      </Grid>
    </div>
  );
}
