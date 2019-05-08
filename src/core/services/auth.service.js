import axios from 'axios';
import { API_URL } from './Constants';

export default class AuthService {
    static login(user) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/Auth/Authenticate', user).then((response) => {
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
            axios.post(API_URL + '/Auth/Register', user).then((data) => {
                resolve(data);
            });
        });
    }

    static confirmAccount(id, token) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/Auth/ConfirmAccount', { id, token }).then((data) => {
                resolve(data);
            });
        });
    }

    static forgottenPassword(email) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/Auth/RequestPasswordReset', { email }).then((data) => {
                resolve(data);
            });
        });
    }

    static resetPassword(passwordToken, email, password, rePassword) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + '/Auth/SetNewPassword', { passwordToken, email, password, rePassword }).then((data) => {
                resolve(data);
            });
        });
    }
}