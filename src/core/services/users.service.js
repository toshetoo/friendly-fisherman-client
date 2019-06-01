import { API_URL } from './Constants';
import BaseService from './base-api.service';
import * as jwt_decode from 'jwt-decode';

export default class UsersService {

  static getLoggedUser() {
    return BaseService.getUser();
  }

  static getLoggedUserId() {
    return jwt_decode(localStorage.getItem('token')).ID;
  }

  static getLoggedUserObject() {
    return jwt_decode(localStorage.getItem('token'));
  }

  static isCurrentUserAdmin() {
    return UsersService.getLoggedUserObject().role === 'Admin';
  }

  static logout() {
    return BaseService.logout();
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        id = BaseService.getLoggedUserId();
      }
      BaseService.get(API_URL + '/users/GetUserById/' + id).then((data) => {
        resolve(data.data);
      }).catch(BaseService.handleError);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/users/GetAllUsers').then((data) => {
        resolve(data);
      }).catch(BaseService.handleError);
    });
  }

  static save(user) {
    return new Promise((resolve, reject) => {
      if (!user.id) {
        BaseService.post(API_URL + '/users', user).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
      } else {
        BaseService.post(API_URL + '/users/EditUser', user).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
      }
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      BaseService.delete(API_URL + '/users/' + id).then(() => {
        resolve();
      }).catch(BaseService.handleError);
    });
  }

  static uploadProfilePicture(image) {
    return new Promise((resolve, reject) => {
      BaseService.uploadFile(API_URL + '/users/uploadImage', image).then((image) => {
        resolve(image);
      }).catch(BaseService.handleError);
    });
  }
}