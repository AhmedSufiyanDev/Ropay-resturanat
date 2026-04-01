import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({

  root: {
    width: '100%',
    border: '1px solid lightgray',
    borderRadius: 5,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0
  },
  header: {
  }
}));

export default function SimpleAccordion(props) {
  const {title, children} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true} onChange={(d, open) => {
        console.log(open)
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{border: '1px solid red'}}
          className='text-capitalize'
        >
          <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
