import axios from 'axios';
// let url = 'http://localhost:3001';
let url = 'https://hftcapi.herokuapp.com';

const getProducts = async () => {
  let res = await axios.get(`${url}/api/product/getproducts`);

  console.log(res);
  return res;
};

const getProductRecomIds = async () => {
  let res = await axios.get(`${url}/api/product/getproductrecomids`);

  console.log(res);
  return res;
};

const getProductImages = async data => {
  let res = await axios.post(`${url}/api/product/getproductimages`, data);

  console.log(res);
  return res;
};

const addProduct = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/product/addproduct`, data);

  console.log(res);
  return res;
};
const addProductRecom = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/product/addproductrecom`, data);

  console.log(res);
  return res;
};

const editProduct = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/product/editproduct`, data);

  console.log(res);
  return res;
};

const deleteProduct = async data => {
  let res = await axios.post(`${url}/api/product/deleteproduct`, data);
  console.log(res);
  return res;
};

export {
  getProducts,
  addProduct,
  editProduct,
  getProductImages,
  deleteProduct,
  getProductRecomIds,
  addProductRecom
};
