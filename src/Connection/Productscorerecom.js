import axios from 'axios';
let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';

const getScoreProducts = async data => {
  let res = await axios.post(
    `${url}/api/productscorerecom/getsinglelist`,
    data
  );

  console.log(res);
  return res;
};

const addList = async data => {
  let res = await axios.post(`${url}/api/productscorerecom/add`, data);

  console.log(res);
  return res;
};

export { getScoreProducts, addList };
