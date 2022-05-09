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
import { editQuestion } from '../../Connection/Monthquiz';
import { ToastContainer, toast } from 'react-toastify';

export default function Editquestion({ handleUpdate, open, data, handleOpen }) {
  const [values, setValues] = React.useState({
    handleUpdate,
    data,
    open,
    handleOpen
  });
  //   const [productImages, setProductImages] = React.useState();

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

    const res = await editQuestion(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Question updated', {
        position: toast.POSITION.TOP_RIGHT
      });

      handleUpdate();
    } else {
      toast.error(res.json.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleOpen = () => {
  //   setOpen(false);
  // };

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
      {/* <button className="btn btn-success " onClick={handleOpen}>
        <i class="fas fa-plus"></i>  Question
      </button> */}
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the Questions for the build Your Profile Quiz
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            value={values.question}
            name="question"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Option 1 (This option should represent the Week/Light State of hairs)"
            type="text"
            fullWidth
            variant="standard"
            value={values.option1}
            name="option1"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Option 2 (This option should represent the middle/normal State of Hairs)"
            type="text"
            fullWidth
            variant="standard"
            value={values.option2}
            name="option2"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Option 3 (This option should represent the Strong/Great State of Hairs)"
            type="text"
            fullWidth
            variant="standard"
            value={values.option3}
            name="option3"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit}>Update Question</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
