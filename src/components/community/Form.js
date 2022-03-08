import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Form() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
      className="mt-5"
    >
      <div className="w-100">
        <TextField
          id="standard-basic"
          label="Facebook Api Key"
          variant="standard"
          className="w-75"
          // fullWidth
        />
        <button className="btn btn-success m-2">Save</button>
      </div>

      <br />
      <div className="w-100">
        <TextField
          id="standard-basic"
          label="Facebook Secret Key"
          variant="standard"
          className="w-75"
          // fullWidth
        />
        <button className="btn btn-success m-2">Save</button>
      </div>
    </Box>
  );
}
