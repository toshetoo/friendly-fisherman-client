import axios from 'axios';
import history from "../history/History";
import * as jwt_decode from 'jwt-decode';

export default class BaseService {

    static getLoggedUserId() {
        return jwt_decode(localStorage.getItem('token')).ID;
    }

    static getConfig() {
        let token = localStorage.getItem('token');

        return {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
    }

    static getUser() {
        return !!localStorage.getItem('token');
    }

    static logout() {
        localStorage.removeItem('token');
        history.push('/login');
        window.location.reload();
    }

    static get(url, getParams) {
        let config = this.getConfig();

        if (getParams) {
            config['params'] = getParams;
        }

        return axios.get(url, config);
    }

    static post(url, data) {
        let config = this.getConfig();

        return axios.post(url, data, config);
    }

    static put(url, data) {
        let config = this.getConfig();

        return axios.put(url, data, config);
    }

    static delete(url, getParams) {
        let config = this.getConfig();

        return axios.delete(url, config);
    }

    static uploadFile(url, file) {
        const data = new FormData();
        data.append('file', file);

        let config = this.getConfig();

        return axios.post(url, data, config);
    }

    static handleError(error) {
        if (error.response.status === 401) {
            sessionStorage.removeItem('token');
            history.push('/login');
        }
    }
}