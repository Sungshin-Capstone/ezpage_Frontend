import axios from 'axios';
import config from '../config';

console.log('BACK_API_ROOT:', config.BACK_API_ROOT);

const api = axios.create({
  baseURL: config.BACK_API_ROOT
});


export default api;