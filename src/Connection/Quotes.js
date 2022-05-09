import axios from 'axios';
// let url = 'http://localhost:3001';
let url = 'https://hftcapi.herokuapp.com';

const getQuotes = async () => {
  let res = await axios.get(`${url}/api/quote/getquotes`);

  console.log(res);
  return res;
};

const addQuote = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/quote/addquote`, data);

  console.log(res);
  return res;
};

const editQuote = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/quote/editquote`, data);

  console.log(res);
  return res;
};

const deleteQuote = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/quote/deletequote`, data);

  console.log(res);
  return res;
};

export { getQuotes, addQuote, editQuote, deleteQuote };
