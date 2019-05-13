import BaseService from './base-api.service';
import { API_URL } from './Constants';

export default class MessagesService {

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
          BaseService.get(API_URL + '/PersonalMessages/GetAllForReceiver/' + BaseService.getLoggedUserId()).then((data) => {
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
}