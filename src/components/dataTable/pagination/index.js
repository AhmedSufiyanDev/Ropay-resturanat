import React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import '../styles.scss'

function Index(props) {
  const {rowsPerPageOptionList, pageSize, onPageSizeChange, totalRowsInDb, pageNo, onPageChangeHandler} = props;
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptionList || [5]}
      component="div"
      count={totalRowsInDb}
      rowsPerPage={pageSize}
      onRowsPerPageChange={onPageSizeChange}
      page={pageNo}
      onPageChange={onPageChangeHandler}
    />
  );
}

export default Index;
