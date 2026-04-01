import { makeStyles } from '@material-ui/core/styles';
import theme from '../scss/ThemeStyles.scss';
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
    // width: '100%',
    height: 100,
    background: '#FFFFFF',
  },
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    outline: 'none',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(0, 4, 3),
    width: '480px !important',
    //height: '343px', //226px
    borderRadius: '20px',
    boxSizing: 'border-box',
  },
  button1: {
    position: 'absolute',
    width: '390.23px',
    height: '40.1px',
    left: '6.15px',
    top: '70px',
    background: '#0E97FF',
    color: '#0E97FF',
    borderRadius: "10px",
  },
  loginModalbtn: {
    width: '390.23px',
    height: '40.1px',
    left: '6.15px',
    marginTop: '10px !important',
    marginBottom: '10px !important',
    background: '#0E97FF',
    color: '#0E97FF',
    borderRadius: "10px",
  },
  GridBox: {
    position: 'absolute',
    width: '195px',
    height: ' 18px',
    left: '140px',
    bottom: '20px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    color: '#5F5F5F'
  },
  forgottenPin: {
    position: 'absolute',
    width: '85px',
    height: '18px',
    left: '320px',
    top: '260px',
    whiteSpace: 'nowrap',
    color: '#5F5F5F',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  Checkbox: {
    position: 'absolute',
    width: '111px',
    height: '20px',
    left: '35px',
    top: '260px',
    whiteSpace: 'nowrap',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '2px',
    lineHeight: '10px',
    color: '#5F5F5F',
  },
  modalPos: {
    top: `10%`,
    left: `35%`,
    transform: `translate(-20%, -35%%)`,
    position: 'absolute',
    width: 400,
    minHeight: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loginForm: {
    "& .MuiFormControl-fullWidth": {
      marginTop: '10px'
    }
  },
  registerForm: {
    "& .MuiFormControl-fullWidth": {
      marginTop: '10px'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 12,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  },
  inputRoot: {
    color: 'inherit',
    border: '1px solid #E8E8E8',
    // border: '1px solid var(--Color-3-CW-Grey-L2, #E8E8E8)',
    // background: 'var(--Color-1-CW1-White-N, #FFF)',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));
