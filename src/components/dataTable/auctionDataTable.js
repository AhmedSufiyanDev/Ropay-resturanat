import React, {useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper"; 
import {withRouter} from "react-router-dom";
import {useStyles} from "./dataTableStyle";
import Pagination from './pagination'
import EmptyRows from "./emptyRowSpace"; 
import TableHeading from './tableHeading';
import TableCell from './tableCell'
import Button from '@material-ui/core/Button';
import Countdown, { zeroPad } from "react-countdown";

const currDate= Date.now(); 
function EnhancedTable(props) {
  const {data, pagination, parentClasses, openModal, ids} = props;
  
  const {rows, column} = data;
  let {totalRows, pageNo, onPageChange, pageSize, onPageSizeChange} = pagination;
  let headCells = column;
  
  const classes = useStyles();
  const [order, ] = useState("asc");
  const [orderBy,] = useState(""); 
  const emptyRows = pageSize - Math.min(pageSize, totalRows - (pageNo) * pageSize);
  const handleChangePage = (event, newPage) => onPageChange(newPage + 1)
  const changePageSizeHandler = ({target: {value}}) => onPageSizeChange(value)

  const histDetail = (row) => {
    props.history.push({pathname: `/`, state: row});
  }

  function BtnText(props){ 
    if(ids && ids.includes(props.rowId))
      return "UPDATE BID"; 
    else 
      return "BID NOW";
  }

  function ExpText(props){
    if(!props.row?.expiryDate) return "--";
    else  return "Expired!"; 
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={`${classes.table}`+ ' datatable-body'} stickyHeader aria-label="sticky table">
            <TableHeading
              classes={classes}
              order={order}
              orderBy={orderBy} 
              rowCount={rows?.length || 0}
              columns={headCells}
              rows={rows}
            />
            <TableBody>
              {  
                (rows || []).map((row, index) => { 
                  let remTime=0; 
                  if(row?.expiryDate){
                    remTime=new Date(row?.expiryDate).getTime();
                    let currTime= new Date().getTime();
                    remTime=remTime-currTime;
                    remTime=(remTime)<=0?0:remTime;
                  }
                  
                  return (
                    <TableRow hover key={row.id + index} className={"row-"+row.id}>
                      <TableCell value={row?.tagName} row={row}/> 
                      <TableCell value={row?.startingPrice} row={row}/>
                      <TableCell value={row?.minIncrement} row={row}/>
                      <TableCell value={row?.currentPrice} row={row}/>
                      <TableCell value={(row?.numberOfBids)?row?.numberOfBids:0} row={row}/> 
                      <TableCell children={<Countdown className={classes.clickTime} date={currDate + remTime}><span><ExpText row={row}/></span></Countdown>} row={row}/> 
                      {
                        (row.expiryDate != null && remTime == 0) ?
                          <TableCell value={'Bid Expired!'} row={row}/>
                        :
                          <TableCell  row={row} children={<Button className={parentClasses.bidBtn} onClick={ () => {openModal(); histDetail(row)} }><BtnText rowId={row.tagName}/></Button>}/> 
                      }
                    
                    </TableRow>
                  );
                })
              }
              {emptyRows > 0 && (
                <EmptyRows emptyRows={emptyRows} colSpan={7}/>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          rowsPerPageOptionList={[6, 10]}// to show rows change per page send array otherwise option will be hidden
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
