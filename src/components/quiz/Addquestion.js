import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';

export default function Addproduct() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImages = imgs => {
    console.log(imgs);
    // setValues({ ...values, images: imgs });
    // setCarryOnDisabled(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button className="btn btn-success " onClick={handleClickOpen}>
        <i class="fas fa-plus"></i> Add Question
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Questions for the build Your Profile Quiz
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Option 1 (This option should represent the Strong/Intense State of hairs)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Option 2 (This option should represent the middle/normal State of Hairs)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Option 3 (This option should represent the lowest/light State of Hairs)"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Question</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
