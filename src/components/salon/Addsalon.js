import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { ToastContainer, toast } from 'react-toastify';
import { addSalon } from '../../Connection/Salon';

export default function Addsalon({}) {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    name: '',
    description: '',
    images: [],
    location: {
      address: '',
      lat: '',
      lan: ''
    }
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleAddressChange = evt => {
    setValues({
      ...values,
      location: {
        ...values.location,
        address: evt.target.value
      }
    });
  };

  const handleSubmit = async () => {
    handleClose();

    const res = await addSalon(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Salon Added', {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        name: '',
        description: '',
        images: [],
        location: {
          address: '',
          lat: '',
          lan: ''
        }
      });
      // handleUpdate();
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
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button className="btn btn-success " onClick={handleClickOpen}>
        Add Salon
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Salon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the Salon to the platform sp they can be use as recommendations
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Salon Name"
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
          <TextField
            id="standard-multiline-static"
            label="Address of Location"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            value={values.location.address}
            // name="description"
            onChange={handleAddressChange}
          />

          <br />
          <br />
          <Imageupload selectedImages={handleSelectedImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Salon</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
