import axios from 'axios';
// let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';
import url from './API/api';

const getUsers = async () => {
  let res = await axios.get(`${url}/api/users/`);

  console.log(res);
  return res;
};

const deleteUser = async data => {
  let res = await axios.post(`${url}/api/users/deleteusers`, data);
  console.log(res);
  return res;
};

export { getUsers, deleteUser };
