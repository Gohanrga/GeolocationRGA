import axios from 'axios';
import store from './store/index';
const API_URL = 'https://coding-test.rootstack.net/api/';

export class ApiService {
    async login(params) {
        const url = API_URL + 'auth/login';
        return await axios.post(url, params);
    }
    
    async getQuery(paUri, paUrl) {
        const url = (paUrl===undefined) ? API_URL + paUri : paUrl;
        const header = {
            'Authorization': 'Bearer ' + store.getters.getToken()
        };
        return await axios.get(url, { headers: header });
    }
}