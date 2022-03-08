import React from 'react';
import Addquestion from '../components/quiz/Addquestion';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Quiztable from '../components/quiz/Quiztable';
import customers from 'src/__mocks__/customers';
import Highscore from '../components/quiz/Highscore';
import Midscore from '../components/quiz/Midscore';
import Lowscore from '../components/quiz/Lowscore';

const Quiz = () => {
  return (
    <div className="mt-2">
      <div>
        <Container maxWidth={false}>
          <div className=" mt-3  d-flex justify-content-end">
            <Addquestion />
            <Highscore customers={customers} />
            <Midscore customers={customers} />
            <Lowscore customers={customers} />
          </div>
          <br></br>
          <Quiztable customers={customers} />
        </Container>
      </div>
    </div>
  );
};

export default Quiz;
