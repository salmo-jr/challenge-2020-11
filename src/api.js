import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://www.omdbapi.com'
});

export default api;