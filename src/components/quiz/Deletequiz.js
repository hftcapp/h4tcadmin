import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteQuiz } from '../../Connection/Quiz';
import { ToastContainer, toast } from 'react-toastify';
// import LoadingButton from '@mui/lab/LoadingButton';

export default function Deletequiz({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteQuiz = async () => {
    setDeleting(true);
    // return;
    const res = await deleteQuiz();
    console.log(res);
    if (res.success === true) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setDeleting(false);
      handleUpdate();
      handleClose();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setDeleting(false);
    }
  };

  return (
    <div>
      <button className="btn btn-danger mx-1 " onClick={handleClickOpen}>
        Delete Quiz
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Quiz?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete whole quiz
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!deleting && (
            <button
              className="btn btn-danger "
              onClick={handleDeleteQuiz}
              autoFocus
            >
              Delete
            </button>
          )}

          {deleting && (
            <button class="btn btn-danger" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Loading...</span>
            </button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
