import React from 'react';
import Addquestion from '../components/quiz/Addquestion';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Quiztable from '../components/quiz/Quiztable';
import customers from 'src/__mocks__/customers';

const Quiz = () => {
  return (
    <div className="mt-2">
      <div>
        <Container maxWidth={false}>
          <div className="text-right">{/* <Addquestion /> */}</div>
          <br></br>
          <Quiztable customers={customers} />
        </Container>
      </div>
    </div>
  );
};

export default Quiz;
