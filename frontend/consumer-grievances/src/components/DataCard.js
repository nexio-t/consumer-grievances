import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { colorDataRange } from '../helpers/CleanData'; 

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 237,
    margin: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DataCard({type, title, subtitle, state, data}) {
  
  const classes = useStyles();
  let displayData = data 
  let color; 

  color = colorDataRange(type, data)
  if (data > 999) displayData = data.toLocaleString()
  
  console.log("DataCard color is: ", color); 

  return (
    <Card style={{backgroundColor: color}} variant="outlined" className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {state}
        </Typography>

        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        <Typography variant="body1" component="h2">
          {subtitle}
        </Typography>

        
        <Typography className={classes.pos} color="textSecondary">
        </Typography>
        <Typography variant="h3" component="p">
          {displayData}
        </Typography>
      </CardContent>
      
    </Card>
  );
}