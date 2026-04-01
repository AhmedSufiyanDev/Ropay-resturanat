import React, {useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import {withRouter} from "react-router-dom";
import {useStyles} from "./dataTableStyle";
import Pagination from './pagination'
import EmptyRows from "./emptyRowSpace";
import {getDateFromDateTime, getTwoStatusColor} from './../../services/utils';
import TableHeading from './tableHeading';
import TableCell from './tableCell'
import './styles.scss'
import {Status} from "../index";

function EnhancedTable(props) {
  const {data, pagination} = props;
  const {rows, column,} = data;
  let {totalRows, pageNo, onPageChange, pageSize, onPageSizeChange} = pagination;

  let headCells = column;
  const classes = useStyles();
  const [order, ] = useState("asc");
  const [orderBy,] = useState("");
  const emptyRows = pageSize - Math.min(pageSize, totalRows - (pageNo) * pageSize);
  const handleChangePage = (event, newPage) => onPageChange(newPage + 1)
  const changePageSizeHandler = ({target: {value}}) => onPageSizeChange(value)
  const detail = (row) => {
    props.history.push({pathname: `/users/${row.id}`,state: {currentUser:row}});
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={[classes.table, ' datatable-body']}
            stickyHeader aria-label="sticky table"
          >
            <TableHeading
              classes={classes}
              order={order}
              orderBy={orderBy}
              // onRequestSort={handleRequestSort}
              rowCount={rows?.length || 0}
              columns={headCells}
              rows={rows}
            />
            <TableBody>
              {
                //stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                (rows || []).map((row, index) => {

                  let status = getTwoStatusColor(row.status);
                  let {statusText, statusColor} = status

                  return (
                    <TableRow hover key={row.id + index} className='cursor-pointer'>
                      <TableCell value={row?.id} row={row}/>
                      <TableCell value={row?.name} row={row}/>
                      <TableCell className={'text-lowercase'} value={row?.email} row={row}/>
                      <TableCell value={row?.address} row={row}/>
                      <TableCell value={row?.mobile} row={row}/>
                      <TableCell children={
                        <Status statusText={statusText} textColor={statusColor}
                                statusColor={statusColor}/>}
                      />
                      <TableCell value={getDateFromDateTime(row.created_at)} row={row}/>
                      <TableCell children={<EditIcon titleAccess='Edit' onClick={() => detail(row)}/>}/>
                    </TableRow>
                  );
                })
              }
              {emptyRows > 0 && (
                <EmptyRows emptyRows={emptyRows} colSpan={6}/>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          rowsPerPageOptionList={[5, 10]}// to show rows change per page send array otherwise option will be hidden
          component="div"
          totalRowsInDb={totalRows}
          pageSize={pageSize}
          onPageSizeChange={changePageSizeHandler}
          pageNo={pageNo}
          onPageChangeHandler={handleChangePage}
        />
      </Paper>
    </div>
  );
}

export default withRouter(
  (EnhancedTable)
);
