import axios from 'axios';
import { API_URL } from './Constants';

export default class AuthService {
    static login(user) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/auth/login', user).then((response) => {
                sessionStorage.setItem('token', response.data.token);
                resolve(response.data);
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
            axios.post(API_URL + '/auth/register', user).then((data) => {
                resolve(data);
            });
        });
    }
}