import React from 'react';
import {Alert} from "@material-ui/lab";
import {Snackbar} from '@material-ui/core'
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="left"/>;
}

function Index(props) {
  const {type, message=''} = props;
  console.log(message,type)
  const [open, setOpen] = React.useState(true);

  const closeSnackbar = () => {
    setOpen(false);
    // close();
  }

  return (
    <Snackbar
      autoHideDuration={5000}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={open}
      onClose={closeSnackbar}
      TransitionComponent={TransitionLeft}
    >

      <Alert onClose={closeSnackbar} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Index;
