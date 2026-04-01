import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position:'relative' 
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    padding: 10,
    color: "#0D0D39",
  },
  tableContainer: {
    maxHeight:460
  },
  userTableContainer: {
    maxHeight:390
  },
  tableHead: {
    border: "none",
    borderTop: "1px solid #e3ebf6",
    borderBottom: "1px solid #e3ebf6",
    fontWeight: "bold",
    color: "#000c",
    textTransform: "capitalize",
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  },
  tableCell: {
    border: "none",
    opacity: 0.9,
    fontSize: 12,
    color: "#000",
    textTransform: "capitalize",
  },
  actionCell: {
    opacity:1,
    display:'flex',
    alignItems:'center'
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  actionIcon:{
    fontSize:20,
    // marginLeft:10,
    marginLeft:10,
  }
}));
