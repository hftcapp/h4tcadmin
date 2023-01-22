import axios from 'axios';
// let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';
import url from './API/api';

const getQuestions = async () => {
  let res = await axios.get(`${url}/api/monthquiz/getquestions`);

  console.log(res);
  return res;
};

const addQuestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/monthquiz/addquestion`, data);

  console.log(res);
  return res;
};

const editQuestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/monthquiz/editquestion`, data);

  console.log(res);
  return res;
};

const deleteQuestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/monthquiz/deletequestion`, data);

  console.log(res);
  return res;
};
export { addQuestion, getQuestions, editQuestion, deleteQuestion };
