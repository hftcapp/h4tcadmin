import axios from 'axios';
// let url = 'http://localhost:3001';
let url = 'https://hftcapi.herokuapp.com';

const getQuestions = async () => {
  let res = await axios.get(`${url}/api/quiz/getquestions`);

  console.log(res);
  return res;
};

const addQuestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/quiz/addquestion`, data);

  console.log(res);
  return res;
};

const editQuestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/quiz/editquestion`, data);

  console.log(res);
  return res;
};

const deleteQuestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/quiz/deletequestion`, data);

  console.log(res);
  return res;
};
export { addQuestion, getQuestions, editQuestion, deleteQuestion };
