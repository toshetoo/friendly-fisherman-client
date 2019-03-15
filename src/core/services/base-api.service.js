import axios from 'axios';
import history from "../history/History";

export default class BaseService {

    static getUser() {
        return !!localStorage.getItem('token');
    }

    static get(url, getParams) {
        let token = localStorage.getItem('token');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        if (getParams) {
            config['params'] = getParams;
        }

        return axios.get(url, config);
    }

    static post(url, data) {
        let token = localStorage.getItem('token');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        return axios.post(url, data, config);
    }

    static put(url, data) {
        let token = localStorage.getItem('token');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        return axios.put(url, data, config);
    }

    static delete(url, getParams) {
        let token = localStorage.getItem('token');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        return axios.delete(url, config);
    }

    static uploadFile(url, file) {
        const data = new FormData();
        data.append('file', file);

        let token = localStorage.getItem('token');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        return axios.post(url, data, config);
    }

    static handleError(error) {
        if (error.response.status === 401) {
            sessionStorage.removeItem('token');
            history.push('/login');
        }
    }
}