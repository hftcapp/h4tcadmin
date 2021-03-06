import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { addQuote } from '../../Connection/Quotes';
import { ToastContainer, toast } from 'react-toastify';

export default function Addquotes({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    quote: '',
    number: 0
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    handleClose();
    let res = await addQuote(values);
    if (res.data.success) {
      toast.success('Quote Added', {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        quote: '',
        number: 0
      });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
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
        <i class="fas fa-plus"></i> Add Quote
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Quote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new Quote for showing up on the Splash Screen of the App
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quote"
            type="text"
            fullWidth
            variant="standard"
            value={values.quote}
            onChange={handleChange}
            name="quote"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Day of the Year (Should be in number form)"
            type="number"
            fullWidth
            variant="standard"
            value={values.number}
            onChange={handleChange}
            name="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Quote</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
