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
}));

const searchState = async (inputValue) => {
  console.log("searchState called");
  console.log("inputValue is: ", inputValue);

  try {
    const fetchStateResults = await axios.get(
      `/fetchRobocallComplaints/${inputValue}`
    );

    console.log("fetchStateResults is: ", fetchStateResults);
  } catch (err) {
    console.log("request error is: ", err);
    throw new Error();
  }

};

export default function GridLayout() {
  const classes = useStyles();

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
            <Typography variant="h4" gutterBottom>
              Consumer Complaints
            </Typography>
          </Paper>
        </Grid>
        <Grid  item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Robocalls
            </Typography>

            <Grid item container direction={'row'}>
                <Grid xs={12} md={6}>
                  <DataCard title={"Total Calls"}/>
                </Grid>
                <Grid xs={12} md={6}>
                  <DataCard title={"Calls / 1000"}/>
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
