import axios from 'axios';
// let url = 'http://localhost:3001';
let url = 'https://hftcapi.herokuapp.com';

const getAppImages = async () => {
  let res = await axios.get(`${url}/api/appimages/getappimages`);

  console.log(res);
  return res;
};

const addAppImage = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/appimages/addappimage`, data);

  console.log(res);
  return res;
};

export { getAppImages, addAppImage };
