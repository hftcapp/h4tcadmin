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
import { addList } from '../../Connection/Suggestions';
import { ToastContainer, toast } from 'react-toastify';

export default function Addsuggestion({ handleUpdate, name }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    suggestion: ''
  });

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     name: name
  //   });
  // }, [name]);

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
    let res = await addList({ suggestion: values.suggestion, name: name });
    if (res.data.success) {
      toast.success('Suggestion Added', {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        name: '',
        suggestion: ''
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
        <i class="fas fa-plus"></i> Add Suggestion
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Suggestion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new Suggestion for showing up on the wrttings Panel in Journals
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Suggestion"
            type="text"
            fullWidth
            variant="standard"
            value={values.suggestion}
            onChange={handleChange}
            name="suggestion"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Suggestion</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
