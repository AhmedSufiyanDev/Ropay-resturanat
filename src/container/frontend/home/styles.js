import { makeStyles } from '@material-ui/core/styles';
import { batch } from 'react-redux';
// import {banner1} from "../../../assets/images/banner/index"; 
export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 100,
        background: '#FFFFFF',
        borderRadius: 19,
        '&.MuiGrid-spacing-xs-6': {
            //width: 'calc(100% + 48px)',
            margin: '-24px',
        },
    },
    rootTab: {
        '& .Mui-selected': {
            // backgroundColor: '#fff; !important',
            color: '#1B6BC5 !important',    
            fontWeight: '500 !important',
            fontSize: '16px',
            padding:'0px 0px 0px',
            // position:'absolute',
            // marginRight: '18px',
        },
    },
    rootMenu: {
        display: 'flex',
        height: 100,
      alignItems:'center',
      
    },
    tabSlider: {
        "& .MuiTab-root": {
            padding: '6px 12px',
            textTransform: 'none'
        },
        "& .MuiTabs-indicator": {
            // backgroundColor: "#0065D1",
            // height: '4px',
            // width: '25px !important',
            // top: '38px',
            // margin:'0px',
            // top: 45px;
            width: '36px !important',
            height: '3px',
            margin: '0px',
            backgroundColor: '#0065D1',
            borderRadius: '20px',
        },
        "& .MuiTab-root.Mui-selected": {
            padding: '6px 12px 6px 0px',
            marginLeft: '12px',
            color: '#404B63'
        },
       


    },
    tabsReverse: {
        "& .MuiTabs-flexContainer": {
            flexDirection: 'row-reverse'
        }
    },
    colorBar: {
        '&.MuiAppBar-colorPrimary': {
            background: 'transparent ',
            // background:'#FFFFFF !important',
            color: 'black',
            marginTop: '0px !important',
        }
    },
    cardPad: {
        '&.MuiCardContent-root': {
            padding: 4,
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: 'none',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 4, 3),
        width: '600px !important',
        height: '600px', //226px
        borderRadius: '20px',
        boxSizing: 'border-box',
    },
    placeholder: {
        height: 64, // Adjust this to match the height of your AppBar
    },
    sticky: {
        position: 'fixed',
        top: 61,// 70
        width: '100%',
        zIndex: 44,
        margin: '0 !important',
        background: 'rgba(255, 255, 255, 0.50)',
        backdropFilter: 'blur(10px)',
        // background: '#FFFFFF !important',//theme.palette.background.paper, // Ensure the background matches the rest of your UI
    },
    stickyCart:{
        top: '456px !important',//70px !important
        zIndex: 44,
        position: 'fixed !important',   
    }
    // stickyActive: {
    //     position: 'sticky',
    //     top: 0,
    //     zIndex: 1000,
    //     backgroundColor: theme.palette.background.paper,
    // },
   
}));    
