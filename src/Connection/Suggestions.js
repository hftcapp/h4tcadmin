import axios from 'axios';
// let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';
import url from './API/api';

const getSingleSuggestions = async data => {
  let res = await axios.post(`${url}/api/suggestions/getsinglelist`, data);

  console.log(res);
  return res;
};
const getAllSuggestions = async data => {
  let res = await axios.get(`${url}/api/suggestions/get`);

  console.log(res);
  return res;
};

const addList = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/suggestions/add`, data);

  console.log(res);
  return res;
};

const deleteSuggestion = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/suggestions/delete`, data);

  console.log(res);
  return res;
};

export { getSingleSuggestions, getAllSuggestions, addList, deleteSuggestion };
