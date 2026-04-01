import { alpha, makeStyles } from '@material-ui/core/styles';

export const generalStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paddingTop6: {
        paddingTop: "6px"
    },
    padding10: {
        padding: "10px"
    },
    opacity0_5: {
        opacity: '0.5'
    },
    displayFlex: {
        display: "-ms-flexbox!important",
        display: "flex!important"
    },
    marginTop15: {
        marginTop: '-15px'
    },
    marginBottom90: {
        marginBottom: '90px !important'
    },
    marRightAuto: {
        marginRight: "auto !important"
    },
    marBottom50: {
        marginBottom: "50px"
    },
    marBottom40: {
        marginBottom: "40px"
    },
    marBottom30: {
        marginBottom: "30px"
    },
    paddingBottom60: {
        paddingBottom: "60px !important"
    },
    fullWidth: {
        width: "100%"
    },
    minHeight400: {
        minHeight: "400px",
    },
    colorInherit: {
        color: 'inherit',
    },
    centerALign: {
        margin: "0 auto",
        textAlign: "center",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    margin0: {
        margin: "0px"
    },
    height55: {
        height: "55px"
    },
    fontW500: {
        fontWeight: "500 !important"
    },
    displayNone: {
        display: "none"
    },
    padLeftRight15: {
        paddingLeft: "15px !important",
        paddingRight: "15px !important",
    },
    posRelative: {
        position: "relative"
    },
    textRed: {
        color: 'red'
    },
    switchText: {
        color: 'red',
        fontWeight: '700'
    },
    errorMsg: {
        "top": "0px",
        "color": "red",
        "right": "5px",
        "position": "relative",
        "fontSize": "12px",
        "textAlign": "right",
        "margin": "-16px 0px 0px"
    },
    "hoverIt": {
        "&:hover": {
            cursor: 'pointer',
        },
    }
}));