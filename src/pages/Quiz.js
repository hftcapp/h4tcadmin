import React, { useState, useEffect } from 'react';
import Addquestion from '../components/quiz/Addquestion';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Quiztable from '../components/quiz/Quiztable';
import customers from 'src/__mocks__/customers';
import { getQuestions } from '../Connection/Quiz';
import Deletequiz from '../components/quiz/Deletequiz';

const Quiz = () => {
  const [questions, setQuestions] = useState();
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      let res = await getQuestions();
      console.log(res);

      setQuestions(res?.questions);
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
            <Deletequiz handleUpdate={handleUpdate} />
            {/* <Highscore customers={customers} />
            <Midscore customers={customers} />
            <Lowscore customers={customers} /> */}
          </div>
          <br></br>
          {questions && questions?.length > 0 && (
            <Quiztable questions={questions} handleUpdate={handleUpdate} />
          )}
          {!questions && (
            <div class="spinner-border text-success " role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
          {questions?.length === 0 && (
            <div>
              <h5>No Quiz Found. You can make One</h5>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Quiz;
