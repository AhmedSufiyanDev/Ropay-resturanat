import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {useStyles} from "../dataTableStyle";

function Index(props) {
  const {row={}, value, className = '', onClick, children, styles, title} = props;
  const classes = useStyles();
  return (
    children ?
      <TableCell className={[classes.tableCell, className]} style={styles} title={title}
                 onClick={(e) => onClick && onClick(e)}>{props.children}</TableCell> :
      (<TableCell
        style={styles}
        title={title}
        className={[classes.tableCell, className]}
        onClick={() => {
          onClick && onClick(row)
        }}
      >
        {value}
      </TableCell>)
  );
}

export default Index;
