import axios from 'axios';
let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';

const getStyles = async () => {
  let res = await axios.get(`${url}/api/style/getstyles`);

  console.log(res);
  return res;
};

const addStyle = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/style/addstyle`, data);

  console.log(res);
  return res;
};

const getStyleImages = async data => {
  let res = await axios.post(`${url}/api/style/getstyleimages`, data);

  console.log(res);
  return res;
};

const editStyle = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/style/editstyle`, data);

  console.log(res);
  return res;
};

const deleteStyle = async data => {
  let res = await axios.post(`${url}/api/style/deletestyle`, data);
  console.log(res);
  return res;
};

export { addStyle, getStyles, getStyleImages, editStyle, deleteStyle };
