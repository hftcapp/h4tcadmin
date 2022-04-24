import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { addStyle } from '../../Connection/Style';
import { ToastContainer, toast } from 'react-toastify';

export default function Addsalon({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: '',
    description: '',
    images: []
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async () => {
    handleClose();

    const res = await addStyle(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Style Added', {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        name: '',
        description: '',
        images: []
      });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedImages = imgs => {
    console.log(imgs);
    setValues({ ...values, images: imgs });
  };

  return (
    <div>
      {console.log(values)}
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
            value={values.name}
            name="name"
            onChange={handleChange}
          />

          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            value={values.description}
            name="description"
            onChange={handleChange}
          />
          <br />

          <br />
          <br />
          <Imageupload selectedImages={handleSelectedImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Style</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
