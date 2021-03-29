/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

export default function SearchInput({searchState, fullOptions}) {

    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState(null);


    const onChange = (event, newValue) => {
        console.log("newValue is: ", newValue);
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
      
      }
      
      const onInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
      }
    

    

  return (
    //   <div>
    //       random
    //   </div>

    <div >
 <Autocomplete
            id="combo-box-demo"
            options={fullOptions}
            getOptionLabel={(option) => option.full}
            style={{ width: 300 }}
            onChange={(event, newValue) => {
              console.log("newValue is: ", newValue);
              setOptions(newValue ? [newValue, ...options] : options);
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
          />
          <Button
            type="entrarbutton"
            fullWidth
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

</div>
    // <div >
    //       <Autocomplete
    //         id="combo-box-demo"
    //         options={options}
    //         getOptionLabel={(option) => option.full}
    //         style={{ width: 300 }}
    //         onChange={onChange()}
    //         onInputChange={onInputChange()}
    //         renderInput={(params) => (
    //           <TextField {...params} label="Combo box" variant="outlined" />
    //         )}
    //       />
    //       <Button
    //         type="entrarbutton"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         // className={classes.entrarbutton}
    //         onClick={() => {
    //           searchState(inputValue);
    //         }}
    //       >
    //         {" "}
    //         Search
    //       </Button>

    // </div>
  );
}

