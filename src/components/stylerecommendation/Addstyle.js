import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';

export default function Addsalon() {
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
        Add Style
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Style</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Style to the platform so they can be use as recommendations
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Style Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
          />
          <br />

          <br />
          <br />
          <Imageupload selectedImages={handleSelectedImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Style</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
