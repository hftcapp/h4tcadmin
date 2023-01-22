import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Imageupload from '../Imageupload';
import { editQuestion } from '../../Connection/Quiz';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Editquestion({ handleUpdate, open, data, handleOpen }) {
  // const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    question: '',
    options: [],
    tips: '',
    firstQuestion: false,
    lastQuestion: false
  });
  const [options, setOptions] = React.useState([]);

  const handleChange = evt => {
    console.log(evt.target.value);
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async () => {
    // console.log(values, 'i am values');
    // return;
    if (options.length > 10) {
      toast.error('You cannot create more than 10 Options', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    setValues({
      ...values,
      options: options
    });

    const res = await editQuestion({ ...values, options: options });
    console.log(res);

    if (res.success === true) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setValues({
        question: '',
        options: [],
        tips: '',
        firstQuestion: false,
        lastQuestion: false
      });
      setOptions([]);
      handleOpen();
      handleUpdate();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleAddOption = () => {
    if (options.length + 1 > 10) {
      toast.error('You cannot create more than 10 Options', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    setOptions([
      ...options,
      { answer: '', nextQuestionId: '', optionId: uuid(), weight: 0 }
    ]);
  };

  const handleOptionChange = (value, optionId, optionName) => {
    console.log(value, optionId);
    if (optionName === 'weight' && Number(value) > 10) {
      toast.error('You cannot set weight more than 10', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    let updatedOptions = options.map(option => {
      if (option.optionId === optionId) {
        return {
          ...option,
          [optionName]: optionName === 'weight' ? Number(value) : value
        };
      } else {
        return option;
      }
    });
    console.log(updatedOptions, 'i am updated');
    setOptions(updatedOptions);
  };
  const handleDeleteOption = optionId => {
    let filteredOptions = options.filter(
      option => option.optionId !== optionId
    );
    setOptions(filteredOptions);
  };
  const handleFirstQuestion = event => {
    setValues({
      ...values,
      firstQuestion: event.target.checked
    });
  };

  const handleLastQuestion = event => {
    setValues({
      ...values,
      lastQuestion: event.target.checked
    });
  };

  React.useEffect(() => {
    setValues(data);
    setOptions(data.options);
  }, [data]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button> */}
      {/* <button className="btn btn-success " onClick={handleOpen}>
        <i class="fas fa-plus"></i> Edit Question
      </button> */}
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the Questions to build Your Profile Quiz
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
          {options?.map((option, i) => {
            return (
              <div className="d-flex">
                <TextField
                  margin="dense"
                  id={`${i}`}
                  label={`Option ${i + 1}`}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={option.answer}
                  name={option.optionId}
                  onChange={evt =>
                    handleOptionChange(
                      evt.target.value,
                      option.optionId,
                      'answer'
                    )
                  }
                />
                <TextField
                  className="mx-1"
                  margin="dense"
                  id={`${i}`}
                  label={`Option Weight (1 to 10)`}
                  type="number"
                  fullWidth
                  variant="standard"
                  value={option.weight}
                  name={option.optionId}
                  onChange={evt =>
                    handleOptionChange(
                      evt.target.value,
                      option.optionId,
                      'weight'
                    )
                  }
                />
                <div>
                  {' '}
                  <button
                    onClick={() => handleDeleteOption(option.optionId)}
                    className="btn btn-sm btn-danger mt-4"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            );
          })}

          <button
            className="btn btn-sm mt-2 btn-success "
            onClick={handleAddOption}
          >
            <i class="fas fa-plus"></i> Add Option
          </button>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tips"
            type="text"
            fullWidth
            variant="standard"
            value={values.tips}
            name="tips"
            onChange={handleChange}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.firstQuestion}
                  onChange={handleFirstQuestion}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Is it the First Question of the Quiz?"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.lastQuestion}
                  onChange={handleLastQuestion}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Is it the Last Question of the Quiz?"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit}>Update Question</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
