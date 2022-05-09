import React, { useState, useEffect } from 'react';
import Addquestion from '../components/weekquiz/Addquestion';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Quiztable from '../components/monthquiz/Quiztable';
import customers from 'src/__mocks__/customers';
import { getQuestions } from '../Connection/Monthquiz';

const Monthquiz = () => {
  const [questions, setQuestions] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      let res = await getQuestions();
      console.log(res);
      setQuestions(res.data.questions);
    };
    fetchQuestions();
    setUpdate(false);
  }, [update === true]);
  return (
    <div className="mt-2">
      <div>
        <Container maxWidth={false}>
          <div className=" mt-3  d-flex justify-content-end">
            <Addquestion handleUpdate={handleUpdate} />
            {/* <Highscore customers={customers} />
            <Midscore customers={customers} />
            <Lowscore customers={customers} /> */}
          </div>
          <br></br>
          {questions && (
            <Quiztable questions={questions} handleUpdate={handleUpdate} />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Monthquiz;
