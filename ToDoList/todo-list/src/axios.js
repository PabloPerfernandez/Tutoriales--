import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;