import React from 'react';
import {Grow} from "@material-ui/core";
import {generalStyles} from "../../container/frontend/general/general";

function InputError(props) {
  const generalClasses = generalStyles();
  const {delay = 1000, message} = props;
  return (
    <Grow in={message} style={{transformOrigin: '0 0 0'}}
          timeout={delay}>
      <p className={generalClasses.errorMsg}> {message} </p>
    </Grow>
  );
}

export default InputError;
