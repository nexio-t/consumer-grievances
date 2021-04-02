import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DataCard from "./DataCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "0px 0px 30px 0px",
  },
  cardTitle: {
    marginBottom: "20px",
    fontFamily: "'Oswald', sans-serif;",
    fontSize: 30,
    fontWeight: 500,
  },
}));

export default function DataSection({
  SectionTitle,
  typeOne,
  typeTwo,
  cardDataOne,
  cardDataTwo,
  subTitleOne,
  subTitleTwo,
  cardTitleOne,
  cardTitleTwo,
  tableData,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.cardTitle} variant="h5" gutterBottom>
        {SectionTitle}
      </Typography>
      <Grid item container direction={"row"}>
        <Grid item xs={12} md={6}>
          <DataCard
            type={typeOne}
            data={cardDataOne}
            m={2}
            subtitle={subTitleOne}
            title={cardTitleOne}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {tableData ? (
            <DataTable data={tableData} />
          ) : (
            <DataCard
              type={typeTwo}
              data={cardDataTwo}
              subtitle={subTitleTwo}
              title={cardTitleTwo}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}