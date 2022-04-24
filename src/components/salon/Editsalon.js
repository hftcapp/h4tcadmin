import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { editSalon } from '../../Connection/Salon';
import { ToastContainer, toast } from 'react-toastify';

export default function Editstyle({ handleUpdate, data, open, handleOpen }) {
  //   const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState();

  useEffect(() => {
    setValues(data);
    console.log(data);
  }, [data]);

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
    handleOpen();

    const res = await editSalon(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Salon Edited', {
        position: toast.POSITION.TOP_RIGHT
      });
      //   setValues({
      //     name: '',
      //     description: '',
      //     images: []
      //   });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

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
      {/* <button className="btn btn-success " onClick={handleClickOpen}>
        Edit Salon
      </button> */}
      {values && (
        <Dialog open={open} onClose={handleOpen}>
          <DialogTitle>Edit Salon</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the Salon to the platform so they can be use as
              recommendations
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
              label="Address of Salon"
              multiline
              rows={4}
              variant="standard"
              fullWidth
              value={values.location.address}
              //   name="location.address"
              onChange={handleAddressChange}
            />

            <br />
            <br />
            <Imageupload
              images={values.images}
              selectedImages={handleSelectedImages}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen}>Cancel</Button>
            <Button onClick={handleSubmit}>Edit Salon</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
