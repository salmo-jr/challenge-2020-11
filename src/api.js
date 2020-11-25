import Axios from 'axios';
import {OMDBAPI_URL} from '@env';

const api = Axios.create({
    baseURL: OMDBAPI_URL
});

export default api;