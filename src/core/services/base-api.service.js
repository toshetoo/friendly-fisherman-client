import axios from 'axios';
import history from "../history/History";
import * as jwt_decode from 'jwt-decode';

export default class BaseService {

    static getLoggedUserId() {
        const token = localStorage.getItem('token');
        if (token) 
            return jwt_decode(token).ID;

        return null;
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

    static getAnonymous(url, getParams) {
        let config = {};

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

    static uploadFile(url, file, id) {
        // const data = new FormData();
        // data.append('file', file);

        const data = {
            id,
            imageSource: file.source,
            imageName: file.name
        };
        let config = this.getConfig();

        return axios.post(url, data, config);
    }

    static handleError(error) {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('token');
            history.push('/login');
        }
    }
}