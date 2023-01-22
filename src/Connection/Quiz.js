import axios from 'axios';
// let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';
import url from './API/api';

const msCall = async args => {
  console.log(args, 'i am args');
  const config = {
    ...args
  };

  return axios
    .request(config)
    .then(response => {
      console.log(response, 'i am response');
      return response.data;
    })
    .catch(error => {
      console.log(error.response, 'i am error');
      if (error.response.status === 401) {
        //Do logout and redirect to login page
        // return
      } else if (error.response.status === 500) {
        // Redirect to Something went wrong page
      } else if (error.response.status === 400) {
        return error.response.data;
      }
    });
};

const getQuestions = async () => {
  let res = await msCall({
    method: 'get',
    url: `${url}/api/quiz/getquestions`
  });
  console.log(res, 'i am res');
  return res;

  // let res = await axios.get(`${url}/api/quiz/getquestions`);

  // console.log(res);
  // return res;
};

const addQuestion = async data => {
  console.log(data);
  let res = await msCall({
    method: 'post',
    url: `${url}/api/quiz/addquestion`,
    data
  });
  console.log(res, 'i am res');
  return res;
};

const connectQuestion = async data => {
  console.log(data);
  let res = await msCall({
    method: 'post',
    url: `${url}/api/quiz/connectquestion`,
    data
  });
  console.log(res, 'i am res');
  return res;
};

const editQuestion = async data => {
  console.log(data);
  let res = await msCall({
    method: 'post',
    url: `${url}/api/quiz/editquestion`,
    data
  });
  console.log(res, 'i am res');
  return res;
  // let res = await axios.post(`${url}/api/quiz/editquestion`, data);

  // console.log(res);
  // return res;
};

const deleteQuiz = async data => {
  console.log(data);
  let res = await msCall({
    method: 'delete',
    url: `${url}/api/quiz/deletequiz`,
    data
  });
  console.log(res, 'i am res');
  return res;
  // let res = await axios.delete(`${url}/api/quiz/deletequestion`);

  // console.log(res);
  // return res;
};
export { addQuestion, getQuestions, editQuestion, deleteQuiz, connectQuestion };
