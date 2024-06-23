import axios from '../axios';

const getToDo = () => {
    return axios.get('/TodoItems')
}


export default {
    getToDo
}