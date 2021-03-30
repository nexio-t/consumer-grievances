/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../components/SearchInput";
import DataCard from '../components/DataCard'
import Typography from "@material-ui/core/Typography";
// import Container from '../containers/Container';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    margin: '10px'

  }
}));


const prepRobocallData = async (data, meta, inputValue) => {

    console.log("prepRoboCall data is: ", data); 
    console.log("prepRobocall meta is: ", meta); 

    const totalCalls = meta['record-total']; 
    console.log("totalCalls is: ", totalCalls); 
    let statePopulation = null; 

    console.log("inputValue55 is: ", inputValue); 
    
    await data.map(stateData => {

      console.log("stateData is: ", stateData); 

      for (const x in stateData) {
        console.log("x is: ", x);
        console.log("stateData[x] is: ", stateData[x]); 
        if (x === 'State') {
          console.log("stateData[x].toLowerCase() is: ", stateData[x].toLowerCase()); 
          if (stateData[x].toLowerCase() === inputValue.toLowerCase()) {
            console.log('the state matches!'); 
            return statePopulation = stateData['Population']
          }
        }

        }
      
     })

     if (statePopulation !== null) {

      console.log("statePOP is: ", statePopulation); 

      const callsPerThousand = (totalCalls/(statePopulation / 1000)).toFixed(1)
      console.log("callsPerThousand is: ", callsPerThousand); 

      console.log("typeof callsPerthousand", typeof callsPerThousand); 
      return callsPerThousand; 
     }

    // map over data

}


export default function GridLayout() {
  const classes = useStyles();



  const searchState = async (inputValue) => {
    console.log("searchState called");
    console.log("inputValue is: ", inputValue);
    setsearchedState(inputValue)
  
    try {
      const fetchRobocalls = await axios.get(
        `/fetchRobocallComplaints/${inputValue}`
      );
      const fetchPopData = await axios.get(
        '/fetchPopulationData'
      );

      if (fetchRobocalls['status'] === 200 && fetchPopData['status'] === 200) {
        const { data: { data } } = fetchPopData; 
        const { data: { meta } } = fetchRobocalls; 

        const callsPerThousand = await prepRobocallData(data, meta, inputValue); 
        const totalCalls = meta['record-total']; 

        if (callsPerThousand && totalCalls) {
          setcallsPer1000(callsPerThousand); 
          settotalCalls(totalCalls); 
        }
      

      }

      console.log("fetchPopData is: ", fetchPopData); 
      console.log("fetchRobocalls is: ", fetchRobocalls);
    } catch (err) {
      console.log("request error is: ", err);
      throw new Error();
    }
  
  };

  const [searchedState, setsearchedState] = React.useState('');
  const [callsPer1000, setcallsPer1000] = React.useState(0); 
  const [totalCalls, settotalCalls] = React.useState(0); 


  return (
    <Container>
         <Grid justify="center" container spacing={4}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <SearchInput
              searchState={searchState}
              fullOptions={fullStateNames}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
             {searchedState} Consumer Complaints
            </Typography>
          </Paper>
        </Grid>
        <Grid  item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              {searchedState} Robocalls
            </Typography>

            <Grid item container spacing={2} direction={'row'}>
                <Grid  xs={12} md={6}>
                  <DataCard data={totalCalls} m={2} title={"Total calls"}/>
                </Grid>
                <Grid  xs={12} md={6}>
                  <DataCard data={callsPer1000} title={"Calls / 1000"}/>
                </Grid>
            </Grid>

           
            
            
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
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
  { name: "VI", full: "U.S. Virgin Islands" },
];
