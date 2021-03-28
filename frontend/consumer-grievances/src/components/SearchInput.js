/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import React, { useState } from "react";
import TextField from '@material-ui/core/TextField'; 
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import axios from 'axios'; 

const searchState = async (inputValue) => {

  console.log("searchState called");
  console.log("inputValue is: ", inputValue); 
  
  try {

    const fetchStateResults = await axios.get(`/fetchRobocallComplaints/${inputValue}`)

    console.log("fetchStateResults is: ", fetchStateResults); 

  } catch(err) {
    console.log("request error is: ", err); 
    throw new Error()
  }

  // axios.post(`http://localhost:3001/usuario/`).then((sucess)=>{
  //     if(sucess){
  //       alert("Usuário criado com Sucesso!")
  //     }
  //   }
  // );

}


export default function SearchInput() {

// https://material-ui.com/components/autocomplete/

const [value, setValue] = React.useState(null);
const [inputValue, setInputValue] = React.useState('');
const [options, setOptions] = React.useState([]);

console.log("value is: ", value);  
console.log("inputValue is: ", inputValue); 


  // To do: Add some kind of container 
  // To do: add button 
  return (
    <Container component="main" maxWidth="xs">

    <Autocomplete
      id="combo-box-demo"
      options={fullStateNames}
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
  > Search
    </Button>
        </Container>

  );
}

//
const fullStateNames = [
    { name: "AK", full: "Alaska" },
    { name: "AL", full: "Alabama" },
    { name: "AR", full: "Arkansas" },
    { name: "AZ", full: "Arizona" },
    { name: "CA", full: "California" },
    { name: "CO", full: "Colorado" },
    { name: "CT", full: "Connecticut" },
    { name: "DC", full: "Washington D.C." },
    { name: "DE", full: "Delaware" },
    { name: "FL", full: "Florida" },
    { name: "GA", full: "Georgia" },
    { name: "HI", full: "Hawaii" },
    { name: "IA", full: "Iowa" },
    { name: "ID", full: "Idaho" },
    { name: "IL", full: "Illinois" },
    { name: "IN", full: "Indiana" },
    { name: "KS", full: "Kansas" },
    { name: "KY", full: "Kentucky" },
    { name: "LA", full: "Louisiana" },
    { name: "MA", full: "Massachusetts" },
    { name: "MD", full: "Maryland" },
    { name: "ME", full: "Maine" },
    { name: "MI", full: "Michigan" },
    { name: "MN", full: "Minnesota" },
    { name: "MO", full: "Missouri" },
    { name: "MS", full: "Mississippi" },
    { name: "MT", full: "Montana" },
    { name: "NC", full: "North Carolina" },
    { name: "ND", full: "North Dakota" },
    { name: "NE", full: "Nebraska" },
    { name: "NH", full: "New Hampshire" },
    { name: "NJ", full: "New Jersey" },
    { name: "NM", full: "New Mexico" },
    { name: "NV", full: "Nevada" },
    { name: "NY", full: "New York" },
    { name: "OH", full: "Ohio" },
    { name: "OK", full: "Oklahoma" },
    { name: "OR", full: "Oregon" },
    { name: "PA", full: "Pennsylvania" },
    { name: "RI", full: "Rhode Island" },
    { name: "SC", full: "South Carolina" },
    { name: "SD", full: "South Dakota" },
    { name: "TN", full: "Tennessee" },
    { name: "TX", full: "Texas" },
    { name: "UT", full: "Utah" },
    { name: "VA", full: "Virginia" },
    { name: "VT", full: "Vermont" },
    { name: "WA", full: "Washington" },
    { name: "WI", full: "Wisconsin" },
    { name: "WV", full: "West Virginia" },
    { name: "WY", full: "Wyoming" },
    { name: "PR", full: "Puerto Rico" },
    { name: "AS", full: "American Samoa" },
    { name: "GU", full: "Guam" },
    { name: "MP", full: "Northern Mariana Islands" },
    { name: "VI", full: "U.S. Virgin Islands" }
  ];

