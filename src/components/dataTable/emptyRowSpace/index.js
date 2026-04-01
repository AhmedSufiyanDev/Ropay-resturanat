import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {useStyles} from '../dataTableStyle'

function Index(props) {
  const classes = useStyles();
  const {emptyRows, colSpan = 2} = props;
  return (
    <TableRow style={{height: (30) * emptyRows}}>
      <TableCell className={classes.tableCell} colSpan={colSpan}/>
    </TableRow>
  );
}

export default Index;
