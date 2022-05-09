import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { addQuestion } from '../../Connection/Monthquiz';
import { ToastContainer, toast } from 'react-toastify';

export default function Addproduct({ handleUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    question: '',
    option1: '',
    option2: '',
    option3: ''
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async () => {
    handleClose();

    const res = await addQuestion(values);
    console.log(res);
    if (res.data.success) {
      toast.success('Question Added', {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        question: '',
        option1: '',
        option2: '',
        option3: ''
      });
      handleUpdate();
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Question</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
