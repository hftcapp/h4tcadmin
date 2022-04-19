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
import { editQuote } from '../../Connection/Quotes';
import { ToastContainer, toast } from 'react-toastify';

export default function Editquote({ handleUpdate, open, data, handleOpen }) {
  //   const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    quote: '',
    number: 0
  });

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

  const handleSubmit = async () => {
    handleOpen();
    let res = await editQuote(values);
    if (res.data.success) {
      toast.success('Quote Updated', {
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

  const handleSelectedImages = imgs => {
    console.log(imgs);
    // setValues({ ...values, images: imgs });
    // setCarryOnDisabled(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button> */}

      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Edit Quote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit Quote for showing up on the Splash Screen of the App
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
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit}>Update Quote</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
