import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159),
//   createData('Ice cream sandwich', 237),
//   createData('Eclair', 262),
//   createData('Cupcake', 305 ),
//   createData('Gingerbread', 356),
// ];

export default function DataTable({data}) {


  console.log("DataTables data is: ", data); 

//   createTableRows(data); 

//   console.log("rows? is: ", rows);

  const formattedTableData = data.map(item => { 
      return {...item, doc_count: item.doc_count.toLocaleString()}
    }); 
  console.log("formmattedTableData is: ", formattedTableData); 

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Complaint Category</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedTableData.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
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