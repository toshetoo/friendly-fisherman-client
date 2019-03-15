import axios from 'axios';
import { API_URL } from './Constants';

export default class AuthService {
    static login(user) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/Users/Authenticate', user).then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                resolve(response);
            });
        });
    }

    static logout() {
        return new Promise((resolve, reject) => {
            sessionStorage.removeItem('token');
            resolve();
        });
    }

    static register(user) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/Users/Register', user).then((data) => {
                resolve(data);
            });
        });
    }
}