/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  button: {
    padding: "10px",
  },
}));

export default function SearchInput({ searchState, fullOptions }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const onChange = (event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
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
          onChange={onChange}
          onInputChange={onInputChange}
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
