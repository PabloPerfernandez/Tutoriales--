import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

export const getToDo = () => {
  return axios.get('/TodoItems');
};

export const addToDo = (todo) => {
  return axios.post('/TodoItems', todo);
};

export const deleteToDo = (id) => {
  return axios.delete(`/TodoItems/${id}`);
};

export const updateToDo = (id, todo) => {
  return axios.put(`/TodoItems/${id}`, todo);
};

export default {
  getToDo,
  addToDo,
  deleteToDo,
  updateToDo
};