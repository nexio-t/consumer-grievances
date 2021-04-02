// import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    margin: '10px',
    fontFamily: "'Oswald', sans-serif;",
    fontSize: 50,
    fontWeight: 800
  },
  tableTitle: {
    fontFamily: "'Oswald', sans-serif;",
    fontSize: 18,
    fontWeight: 800
  }
});

export default function DataTable({data}) {

  const formattedTableData = data.map(item => { 
      return {...item, doc_count: item.doc_count.toLocaleString()}
    }); 

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow  >
            <StyledTableCell className={classes.tableTitle}>Complaint Category</StyledTableCell>
            <StyledTableCell className={classes.tableTitle}  align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedTableData.map((row) => (
            <TableRow key={row.key}>
              <TableCell  className={classes.tableRow}  component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.doc_count}</TableCell>
    
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}