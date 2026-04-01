import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // justifyContent: 'flex-end',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    loadingContainer:{
        margin:"0 auto"
    }
}));

export default function Loader(props) {
    const classes = useStyles();
    return (
        <div className={classes.loadingContainer}>
            <div className={classes.root} style={{justifyContent:'center'}}>
                <CircularProgress size={props?.size ? props.size : 40} className={props.className ? props.className : ''}  />
            </div>
        </div>
    );
}
