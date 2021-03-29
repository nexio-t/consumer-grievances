/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

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

  return (
    <div>
      {/* <Grid  justify="flex-start" alignItems="center" container spacing={4}> */}
      {/* <Grid item xs={4}/> */}
        <Grid item >
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
        <Grid item >
          {" "}
          <Button
            //    fullWidth={true}
               width="100%"
            type="entrarbutton"
            variant="contained"
            color="primary"
            // className={classes.entrarbutton}
            onClick={() => {
              searchState(inputValue);
            }}
          >
            {" "}
            Search
          </Button>
        </Grid>
        {/* <Grid item xs={4}/> */}
      {/* </Grid> */}
    </div>
  );
}
