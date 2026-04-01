import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	nothingToShowContainer: {
		width: '100%',
		height: '40vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('md')]: {
			height: '30vh',
		},
		[theme.breakpoints.down('sm')]: {
			height: '20vh',
		},
		[theme.breakpoints.down('xs')]: {
			height: '20vh',
		},
	},
	nothingToShowText: {
		color: '#0D0D39',
		padding: '6% 14%',
		borderRadius: '35px',
		border: '2px dashed lightgray',
		textTransform: 'capitalize',
		opacity: '0.5'
	},
}));

function Index(props) {
	const classes = useStyles();
	const { text } = props;
	return (
		<div className={classes.nothingToShowContainer}>
			{/* <div className={classes.nothingToShowText}>{text}</div> */}
			<div className={classes.nothingToShowText}>{text ? text : "No Data"}</div>
		</div>
	);
}

export default Index;
