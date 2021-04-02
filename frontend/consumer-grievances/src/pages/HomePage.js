/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import { useState, useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../components/SearchInput";
import DataCard from "../components/DataCard";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DataTable from "../components/DataTable";
import HideAppBar from "../components/HideAppBar";
import ConsumerGrievances from "../assets/ConsumerGrievances_copy.png";
import LoadingBar from "../components/LoadingBar";
import { findStatePopulation, convertToThousands } from "../helpers/CleanData";
import { fullStateNames } from "../data/data";
import api from "../api/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "0px 0px 30px 0px",
  },
  card: {
    margin: "10px",
  },
  image: {
    margin: "40px 30px 50px 30px",
    maxWidth: "800px",
  },
  typography: {
    marginBottom: "20px",
    fontFamily: "'Oswald', sans-serif;",
    fontSize: 40,
    fontWeight: 800,
  },
  cardTitle: {
    marginBottom: "20px",
    fontFamily: "'Oswald', sans-serif;",
    fontSize: 30,
    fontWeight: 500,
  },
}));

const renderContent = (
  loading,
  searchedState,
  totalComplaints,
  complaintCategories,
  totalCalls,
  callsPer1000,
  classes
) => {
  console.log('renderContent called'); 
  if (loading) {
    return (
      <Grid item xs={10} md={8} lg={6}>
        <LoadingBar></LoadingBar>
      </Grid>
    );
  }
  // you can implemenet ternarys here based on the general errors below
  return (
    <div>
      <Grid item xs={12}>
        <Grid item container justify="center" direction={"row"}>
          <Typography
            className={classes.typography}
            variant="h5"
            gutterBottom
            direction={"row"}
          >
            {searchedState}'s Report Card
          </Typography>
        </Grid>
{/* 
        {generalError
          ? <div>General Error</div>
          : null} */}

        <Paper className={classes.paper}>
          <Typography className={classes.cardTitle} variant="h5" gutterBottom>
            Financial Consumer Complaints
          </Typography>

          <Grid item container justify="center" direction={"row"}>
            <Grid xs={12} md={6}>
              <DataCard
                type={"finance"}
                data={totalComplaints}
                m={2}
                title={"Complaints / 1000"}
                subtitle={"per thousand inhabitants in 2020"}
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
          <Typography className={classes.cardTitle} variant="h5" gutterBottom>
            Robocall Complaints
          </Typography>

          <Grid item container direction={"row"}>
            <Grid xs={12} md={6}>
              <DataCard
                type={"totalRobocalls"}
                data={totalCalls}
                m={2}
                subtitle={"in 2020"}
                title={"Total complaints"}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <DataCard
                type={"robocalls"}
                data={callsPer1000}
                subtitle={"per thousand inhabitants in 2020"}
                title={"Complaints / 1000"}
              />
            </Grid>
          </Grid>
        </Paper>

        <Grid
          justify="center"
          style={{ marginBottom: "50px" }}
          item
          container
          direction={"row"}
        >
          <div>
            <Box
              borderRadius={10}
              style={{ backgroundColor: "#ffea98" }}
              component="div"
              display="inline"
              p={1}
              m={1}
              bgcolor="background.paper"
            >
              Low
            </Box>
            <Box
              borderRadius={10}
              style={{ backgroundColor: "#ffb199" }}
              component="div"
              display="inline"
              p={1}
              m={1}
              bgcolor="background.paper"
            >
              Moderate
            </Box>
            <Box
              borderRadius={10}
              style={{ backgroundColor: "#ff8a80" }}
              component="div"
              display="inline"
              p={1}
              m={1}
              bgcolor="background.paper"
            >
              High
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const fetchStateData = async (
  searchedState,
  setcomplaintCategories,
  settotalComplaints,
  setLoading,
  setcallsPer1000,
  settotalCalls
) => {
  try {

    let statePopulation = null;
    let abbr;
    

    if (searchedState === undefined) return setLoading(false);  

    fullStateNames.map((state) => {
      for (const x in state) {
        if (state[x] === searchedState) return (abbr = state["abbr"]);
      }
    });

    const [fetchPopData, fetchRobocalls, fetchConsumerComplaints] = await Promise.all([
      api.getPopulationData(),
      api.getRobocallData(searchedState),
      api.getConsumerComplaintData(abbr)
    ]);

    console.log("fetchPopData is: ", fetchPopData); 
    // if (true )
    if (fetchPopData["status"] === 200) {
      const {
        data: { data },
      } = fetchPopData;
      statePopulation = await findStatePopulation(data, searchedState);
    } else {
      console.log("TO DO: SET GENERAL ERROR HERE");
      setLoading(false) 
    }

    // TODO: statePopulation is optional here, if request didn't fail then potentially still go through consumer complaints 
    if (fetchConsumerComplaints["status"] === 200 && statePopulation !== null) {
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

      const convertedData = convertToThousands(doc_count, statePopulation);

      if (doc_count && buckets) {
        setcomplaintCategories(buckets);
        // Rename this variable
        settotalComplaints(convertedData);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("no data to display for fetchConsumer complaints");
      }
    } else {
      console.log("SET CONSUMER COMPLAINTS ERROR");
    }

    if (fetchRobocalls["status"] === 200 && statePopulation !== null) {
      const totalRobocalls = fetchRobocalls.data.meta["record-total"];
      const callsPerThousand = convertToThousands(
        totalRobocalls,
        statePopulation
      );

      if (callsPerThousand && totalRobocalls) {
        setcallsPer1000(callsPerThousand);
        settotalCalls(totalRobocalls);
        setLoading(false);
      }
    } else {
      setLoading(false);
      console.log("SET ROBOCALLS ERROR");
    }
  } catch (err) {
    console.log("request error is: ", err);
    console.error(err);
  }
};

export default function GridLayout() {
  const classes = useStyles();
  const [searchedState, setsearchedState] = useState("");
  const [callsPer1000, setcallsPer1000] = useState(0);
  const [totalCalls, settotalCalls] = useState(0);
  const [totalComplaints, settotalComplaints] = useState([]);
  const [complaintCategories, setcomplaintCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [generalError, setgeneralError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchStateData(
        searchedState,
        setcomplaintCategories,
        settotalComplaints,
        setLoading,
        setcallsPer1000,
        settotalCalls
      );
    }
  }, [searchedState]);

  const searchState = async (inputValue) => {
    setLoading(true);
    setsearchedState(inputValue);
  };

  return (
    <Container>
      <HideAppBar />
      <Grid container direction="column" alignItems="center" justify="center">
        <Paper justify="center" className={classes.image} variant="outlined">
          <img width={"100%"} src={ConsumerGrievances} alt="logo of consumer grievances" />
        </Paper>
      </Grid>

      <Grid justify="center" container >
        <Grid item xs={10} md={8} lg={6}>
          <Paper className={classes.paper}>
            <SearchInput
              func={setsearchedState}
              searchState={searchState}
              fullOptions={fullStateNames}
            />
          </Paper>
        </Grid>
        {searchedState
          ? renderContent(
            loading,
            searchedState,
            totalComplaints,
            complaintCategories,
            totalCalls,
            callsPer1000,
            classes
          )
          : null}
      </Grid>
    </Container>
  );
}