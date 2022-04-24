import axios from 'axios';
let url = 'http://localhost:3001';
// let url = 'https://hftcapi.herokuapp.com';

const getSalons = async () => {
  let res = await axios.get(`${url}/api/salon/getsalons`);

  console.log(res);
  return res;
};

const addSalon = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/salon/addSalon`, data);

  console.log(res);
  return res;
};

const getSalonImages = async data => {
  let res = await axios.post(`${url}/api/salon/getsalonimages`, data);

  console.log(res);
  return res;
};

const editSalon = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/salon/editsalon`, data);

  console.log(res);
  return res;
};

const deleteSalon = async data => {
  let res = await axios.post(`${url}/api/salon/deletesalon`, data);
  console.log(res);
  return res;
};

export { addSalon, getSalons, getSalonImages, editSalon, deleteSalon };
