import axios from 'axios';

let url = 'https://witty-rose-wasp.cyclic.app';
// let url = 'http://localhost:3001';

const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use(
  async config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default url;
