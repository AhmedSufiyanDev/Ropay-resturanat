import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {useDispatch, useSelector} from "react-redux";
import {confirmationHandler} from '../../store/actions'

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = () => {
  const confirmationReducer = useSelector((state) => state.confirmationReducer)

  const {open: reducerOpen, handler, data} = confirmationReducer
  const [open, setOpen] = React.useState(reducerOpen ?? false);

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(confirmationHandler({open: false, data: ''}))
    setOpen(false);
  };

  const confirmHandler = () => {
    handleClose()
    // console.log(handler)
    handler()
  }
  return (
    <Dialog
      open={reducerOpen ?? open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title ">
        Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText className='text-capitalize '>
          {data}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmHandler} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DraggableDialog