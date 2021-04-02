/* eslint-disable no-use-before-define */
// eslint-disable-next-line
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../components/SearchInput";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import HideAppBar from "../components/HideAppBar";
import ConsumerGrievances from "../assets/ConsumerGrievances_copy.png";
import LoadingBar from "../components/LoadingBar";
import { findStatePopulation, convertToThousands } from "../helpers/CleanData";
import { fullStateNames } from "../data/data";
import api from "../api/api";
import ColorKey from "../components/ColorKey";
import DataSection from "../components/DataSection";

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
  error: {
    marginBottom: "20px",
    fontFamily: "'Oswald', sans-serif;",
    fontSize: 25,
    fontWeight: 500,
  },
}));

const renderContent = (
  loading,
  generalError,
  generalError2,
  generalError3,
  searchedState,
  totalComplaints,
  complaintCategories,
  totalCalls,
  callsPer1000,
  classes
) => {
  
  if (loading) {
    return (
      <Grid item xs={10} md={8} lg={6}>
        <LoadingBar></LoadingBar>
      </Grid>
    );
  }

  if (generalError) {
    return (
      <Grid
        container
        justify="center"
        direction={"row"}
        item
        xs={10}
        md={8}
        lg={6}
      >
        <Typography
          className={classes.error}
          gutterBottom
          direction={"row"}
        >
          Uh-oh! Unable to fetch {searchedState}'s Report Card. Please try
          again!
        </Typography>
      </Grid>
    );
  }
  
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

        {generalError2 ? (
          <Grid container justify="center" direction={"row"} item>
            <Typography
              className={classes.error}
              gutterBottom
              direction={"row"}
            >
              Uh-oh! Unable to fetch {searchedState}'s Financial Complaints.
              Robocall complaints are still available though!
            </Typography>
          </Grid>
        ) : (          <DataSection
              SectionTitle={"Financial Consumer Complaints"}
              typeOne={"finance"}
              cardDataOne={totalComplaints}
              subTitleOne={"per thousand inhabitants in 2020"}
              cardTitleOne={"Complaints / 1000"}
              tableData={complaintCategories}
          />
        )}

        {generalError3 ? (
          <Grid container justify="center" direction={"row"} item>
            <Typography
              className={classes.error}
              gutterBottom
              direction={"row"}
            >
              Uh-oh! Unable to fetch {searchedState}'s Robocall Complaints.
              Financial complaints are still available though!
            </Typography>
          </Grid>
        ) : (
          <DataSection
            SectionTitle={"Robocall Complaints"}
            typeOne={"totalRobocalls"}
            typeTwo={"robocalls"}
            cardDataOne={totalCalls}
            cardDataTwo={callsPer1000}
            subTitleOne={"in 2020"}
            subTitleTwo={"per thousand inhabitants in 2020"}
            cardTitleOne={"Total complaints"}
            cardTitleTwo={"Complaints / 1000"}
            tableData={null}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <ColorKey />
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
  settotalCalls,
  setgeneralError,
  setgeneralError2,
  setgeneralError3
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

    const [
      fetchPopData,
      fetchRobocalls,
      fetchConsumerComplaints,
    ] = await Promise.all([
      api.getPopulationData(),
      api.getRobocallData(searchedState),
      api.getConsumerComplaintData(abbr),
    ]);

    if (fetchPopData["status"] === 200) {
      const {
        data: { data },
      } = fetchPopData;
      statePopulation = await findStatePopulation(data, searchedState);
    } else {
      setgeneralError(true);
    }

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
        settotalComplaints(convertedData);
        setLoading(false);
      } else {
        setgeneralError2(true);
        setLoading(false);
      }
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
      } else {
        setgeneralError3(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
  }
};

export default function GridLayout() {
  const classes = useStyles();
  const [searchedState, setsearchedState] = useState(null);
  const [callsPer1000, setcallsPer1000] = useState(0);
  const [totalCalls, settotalCalls] = useState(0);
  const [totalComplaints, settotalComplaints] = useState([]);
  const [complaintCategories, setcomplaintCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalError, setgeneralError] = useState(false);
  const [generalError2, setgeneralError2] = useState(false);
  const [generalError3, setgeneralError3] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (searchedState !== null) {
        fetchStateData(
          searchedState,
          setcomplaintCategories,
          settotalComplaints,
          setLoading,
          setcallsPer1000,
          settotalCalls,
          setgeneralError,
          setgeneralError2,
          setgeneralError3
        );
      }
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
          <img
            width={"100%"}
            src={ConsumerGrievances}
            alt="logo of consumer grievances"
          />
        </Paper>
      </Grid>

      <Grid justify="center" container>
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
              generalError,
              generalError2,
              generalError3,
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