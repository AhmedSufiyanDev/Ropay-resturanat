import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 160,
    [theme.breakpoints.down('md')]: {
      "& img": {
        width: '50px'
      }
    },
  },
  rootCart: {
    display: 'flex',
    alignItems: 'center',
    // width: '100%',cC
    height: 100,
    background: '#FFFFFF',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 0),
    width: '340px !important',
    //height: '343px', //226px
    borderRadius: '20px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      margin: '0px 20px',
    },
  },
}));
