import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

function Index(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    onRequestSort,
    selection = false,
    numSelected,
    rowCount,
    selectionIndex = 0,
    topRef,
    type
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = props.columns;
  // const rows= props.rows;
  return (
    <TableHead ref={topRef}>
      <TableRow>

        {headCells.map((headCell, index) => {
          let width1 = headCell.label.length > 8 ? "10%" : "7%";
          width1 = headCell.label.toLowerCase() === 'status' ? '9%' : headCell.id === 'dropdown' ? '1%' : headCell.id === 'file' ? '15%' : width1
          return (
            <TableCell
              key={headCell.id + index}
              // align={headCell.numeric ? "center" : "center"}
              // padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
              className={classes.tableHead}
              style={{width: width1, backgroundColor: '#EF892C',color:"#fff"}}
            >
              {/* <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
              > */}
              {(index === selectionIndex && selection) ?
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{'aria-label': 'select all desserts'}}
                  style={{width: '5%'}}
                /> : headCell.label
              }
              {/* </TableSortLabel> */}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );

}

export default Index;
