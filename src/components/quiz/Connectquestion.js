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
import { connectQuestion } from '../../Connection/Quiz';
import { ToastContainer, toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export default function Connectquestion({
  questions,
  handleUpdate,
  open,
  data,
  handleOpen
}) {
  console.log(questions, 'i am questions');
  const [values, setValues] = React.useState(data);
  const [options, setOptions] = React.useState(data.options);
  const [selectedQuestion, setSelectedQuestion] = React.useState({});
  //   const [productImages, setProductImages] = React.useState();

  useEffect(() => {
    setValues(data);
    setOptions(data.options);
    console.log(data);
  }, [data]);

  const handleChange = (evt, optionId) => {
    console.log(evt.target.value, optionId);
    let updatedOptions = options?.map(option => {
      if (option.optionId === optionId) {
        return {
          ...option,
          nextQuestionId: evt.target.value
        };
      } else {
        return option;
      }
    });
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    const res = await connectQuestion({
      questionId: data?._id,
      options: options
    });
    console.log(res);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });

      handleUpdate();
      handleOpen();
      setOptions([]);
      setValues({});
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div>
      {console.log(values)}
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Connect Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Connect the Crosponding questions with options selections
          </DialogContentText>
          <br />
          <h5>Question : {values?.question}</h5>
          <br />
          {options?.map((option, i) => {
            return (
              <div>
                <div className="d-flex justify-content-between">
                  <p>
                    Option {`${i + 1}`} : {`${option.answer}`},
                  </p>
                  <p>Weight : {`${option.weight}`}</p>
                </div>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Question to follow after choosing option
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={option?.nextQuestionId}
                      label="Choose question to follow after choosing this option "
                      onChange={evt => handleChange(evt, option.optionId)}
                    >
                      {questions?.map(question => {
                        return (
                          <MenuItem value={question?._id}>
                            {question.question}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <br />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit}>Connect Question</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
