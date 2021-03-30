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
import DataCard from "../components/DataCard";
import Typography from "@material-ui/core/Typography";
// import Container from '../containers/Container';
import Container from "@material-ui/core/Container";
import DataTable from "../components/DataTable";
import HideAppBar from "../components/HideAppBar";
import DenseAppBar from "../components/DenseAppBar";
import ConsumerGrievances from "../assets/ConsumerGrievances_copy.png";
import LoadingBar from "../components/LoadingBar";

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
    margin: "10px",
  },
  image: {
    margin: "40px 30px 50px 30px",
    maxWidth: "800px",
  },
}));

const prepRobocallData = async (data, meta, inputValue) => {
  const totalCalls = meta["record-total"];
  let statePopulation = null;

  await data.map((stateData) => {
    for (const x in stateData) {
      if (x === "State") {
        if (stateData[x].toLowerCase() === inputValue.toLowerCase()) {
          return (statePopulation = stateData["Population"]);
        }
      }
    }
  });

  if (statePopulation !== null) {
    const callsPerThousand = (totalCalls / (statePopulation / 1000)).toFixed(1);
    return callsPerThousand;
  }
};

const renderContent = (loading, searchedState, totalComplaints, complaintCategories, totalCalls, callsPer1000, classes) => {

  console.log("renderContent loading variable is: ", loading); 
  if (loading) {
    return <Grid item xs={10} md={8} lg={6}>
    <LoadingBar></LoadingBar>
  </Grid> 
  }
    
  return <div>
  <Grid item xs={12}>
<Paper className={classes.paper}>
  <Typography variant="h5" gutterBottom>
    {searchedState} Consumer Complaints
  </Typography>

  <Grid item container justify="center" spacing={2} direction={"row"}>
    <Grid xs={12} md={6}>
      <DataCard
        data={totalComplaints}
        m={2}
        title={"Total complaints"}
      />
    </Grid>

    <Grid xs={12} md={6}>
      <DataTable data={complaintCategories} />
    </Grid>
  </Grid>
</Paper>
</Grid>
<Grid item xs={12}>
<Paper className={classes.paper}>
  <Typography variant="h5" gutterBottom>
    {searchedState} Robocalls
  </Typography>

  <Grid item container spacing={2} direction={"row"}>
    <Grid xs={12} md={6}>
      <DataCard data={totalCalls} m={2} title={"Total calls"} />
    </Grid>
    <Grid xs={12} md={6}>
      <DataCard data={callsPer1000} title={"Calls / 1000"} />
    </Grid>
  </Grid>
</Paper>
</Grid>

</div> 




}

export default function GridLayout() {
  const classes = useStyles();

  const searchState = async (inputValue) => {

    setLoading(true); 
    console.log("searchState called");
    console.log("inputValue is: ", inputValue);
    setsearchedState(inputValue);

    try {
      const fetchRobocalls = await axios.get(
        `/fetchRobocallComplaints/${inputValue}`
      );
      const fetchPopData = await axios.get("/fetchPopulationData");

      console.log("fetchConsumerComplaints");
      // const fetchConsumerComplaints
      let abbr = "";
      const stateAbbr = fullStateNames.map((state) => {
        for (const x in state) {
          if (state[x] === inputValue) return (abbr = state["abbr"]);
        }
      });

      console.log("stateAbbr is: ", abbr);

      const fetchConsumerComplaints = await axios.get(
        `/fetchConsumerComplaints/${abbr}`
      );

      console.log("fetchConsumerComplaints", fetchConsumerComplaints);

      if (fetchConsumerComplaints['status'] ===200) {

        const {
          data: {
            aggregations: {
              product: {
                product: { buckets },
              },
            },
          },
        } = fetchConsumerComplaints;
        const {
          data: {
            aggregations: {
              product: { doc_count },
            },
          },
        } = fetchConsumerComplaints;
  
        console.log("buckets is: ", buckets);
        console.log("doc_count is: ", doc_count);
  
        if (doc_count && buckets) {
          setcomplaintCategories(buckets);
          settotalComplaints(doc_count);
          setLoading(false)
        } else {

          setLoading(false)
          console.log("no data to display for fetchConsumer complaints"); 
        }

      }

     

      if (fetchRobocalls["status"] === 200 && fetchPopData["status"] === 200) {
        const {
          data: { data },
        } = fetchPopData;
        const {
          data: { meta },
        } = fetchRobocalls;

        const callsPerThousand = await prepRobocallData(data, meta, inputValue);
        const totalCalls = meta["record-total"];

        if (callsPerThousand && totalCalls) {
          setcallsPer1000(callsPerThousand);
          settotalCalls(totalCalls);
          setLoading(false); 
        }
      } else {

        setLoading(false)
        console.log("no data to display for robocalls"); 
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
  const [totalComplaints, settotalComplaints] = React.useState([]);
  const [complaintCategories, setcomplaintCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  console.log("totalComplaints is: ", totalComplaints);
  console.log("searchedState is: ", searchedState); 

  return (
    <Container>
      <HideAppBar></HideAppBar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: '100vh' }}
      >
        <Paper justify="center" className={classes.image} variant="outlined">
          <img width={"100%"} src={ConsumerGrievances} />
        </Paper>
      </Grid>

      <Grid justify="center" container spacing={4}>
        <Grid item xs={10} md={8} lg={6}>
          <Paper className={classes.paper}>
            <SearchInput
              searchState={searchState}
              fullOptions={fullStateNames}
            />
          </Paper>
        </Grid>
        {/* {console.log("searchedState render is; ", searchedState)} */}
        { searchedState ? renderContent(loading, searchedState, totalComplaints, complaintCategories, totalCalls, callsPer1000, classes) : null}
        {/* {renderContent(loading)} */}

        

       
        {/* <Grid item xs={3}>
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
        </Grid> */}
      </Grid>
    </Container>
  );
}

//
const fullStateNames = [
  { abbr: "AK", full: "Alaska" },
  { abbr: "AL", full: "Alabama" },
  { abbr: "AR", full: "Arkansas" },
  { abbr: "AZ", full: "Arizona" },
  { abbr: "CA", full: "California" },
  { abbr: "CO", full: "Colorado" },
  { abbr: "CT", full: "Connecticut" },
  { abbr: "DC", full: "Washington D.C." },
  { abbr: "DE", full: "Delaware" },
  { abbr: "FL", full: "Florida" },
  { abbr: "GA", full: "Georgia" },
  { abbr: "HI", full: "Hawaii" },
  { abbr: "IA", full: "Iowa" },
  { abbr: "ID", full: "Idaho" },
  { abbr: "IL", full: "Illinois" },
  { abbr: "IN", full: "Indiana" },
  { abbr: "KS", full: "Kansas" },
  { abbr: "KY", full: "Kentucky" },
  { abbr: "LA", full: "Louisiana" },
  { abbr: "MA", full: "Massachusetts" },
  { abbr: "MD", full: "Maryland" },
  { abbr: "ME", full: "Maine" },
  { abbr: "MI", full: "Michigan" },
  { abbr: "MN", full: "Minnesota" },
  { abbr: "MO", full: "Missouri" },
  { abbr: "MS", full: "Mississippi" },
  { abbr: "MT", full: "Montana" },
  { abbr: "NC", full: "North Carolina" },
  { abbr: "ND", full: "North Dakota" },
  { abbr: "NE", full: "Nebraska" },
  { abbr: "NH", full: "New Hampshire" },
  { abbr: "NJ", full: "New Jersey" },
  { abbr: "NM", full: "New Mexico" },
  { abbr: "NV", full: "Nevada" },
  { abbr: "NY", full: "New York" },
  { abbr: "OH", full: "Ohio" },
  { abbr: "OK", full: "Oklahoma" },
  { abbr: "OR", full: "Oregon" },
  { abbr: "PA", full: "Pennsylvania" },
  { abbr: "RI", full: "Rhode Island" },
  { abbr: "SC", full: "South Carolina" },
  { abbr: "SD", full: "South Dakota" },
  { abbr: "TN", full: "Tennessee" },
  { abbr: "TX", full: "Texas" },
  { abbr: "UT", full: "Utah" },
  { abbr: "VA", full: "Virginia" },
  { abbr: "VT", full: "Vermont" },
  { abbr: "WA", full: "Washington" },
  { abbr: "WI", full: "Wisconsin" },
  { abbr: "WV", full: "West Virginia" },
  { abbr: "WY", full: "Wyoming" },
  { abbr: "PR", full: "Puerto Rico" },
  { abbr: "AS", full: "American Samoa" },
  { abbr: "GU", full: "Guam" },
  { abbr: "MP", full: "Northern Mariana Islands" },
  { abbr: "VI", full: "U.S. Virgin Islands" },
];
