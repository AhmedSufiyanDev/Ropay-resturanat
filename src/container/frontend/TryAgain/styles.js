import { makeStyles } from "@material-ui/core";
export 
const useStyles = makeStyles((theme) => ({
    root: {
        // display:'flex',
        // width: '100%',
        // height: 100,
        // background: '#FFFFFF',
        // borderRadius: 19,
        // flexGrow:1,
      '& .MuiInput-underline:after': {
            borderBottomColor: ' 1px solid #1B6BC5',
            borderRadius:'0.927px solid #1B6BC5;',
        },
      '& .MuiPaper-rounded': {
            borderRadius:'20px',
        },
    },
    centralize:{
      justifyContent: 'center'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));