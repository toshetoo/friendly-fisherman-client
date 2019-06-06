import { API_URL } from './Constants';
import BaseService from './base-api.service';

export default class PostsService {
  
    static getById(id) {
    return new Promise((resolve, reject) => {
      const url = `/Threads/GetById/${id}?userId=${BaseService.getLoggedUserId()}`;
      BaseService.getAnonymous(API_URL + url).then((data) => {
        resolve(data.data);
      }).catch(BaseService.handleError);
    });
  }

  static getSeenCount(id) {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/Threads/GetSeenCount/' + id).then((data) => {
        resolve(data.data);
      }).catch(BaseService.handleError);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      BaseService.getAnonymous(API_URL + '/Threads/GetAll').then((data) => {
        resolve(data);
      }).catch(BaseService.handleError);
    });
  }

  static save(post) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/Threads/SaveThread', post).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static addReply(reply) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/Threads/AddReply', reply).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static editReply(reply) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/Threads/EditReply', reply).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static likeReply(reply) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/Threads/LikeReply', reply).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static markAsSeen(reply) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/Threads/MarkAsSeen', reply).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      BaseService.delete(API_URL + '/Threads/Delete/' + id).then(() => {
        resolve();
      }).catch(BaseService.handleError);
    });
  }

  static deleteReply(id) {
    return new Promise((resolve, reject) => {
      BaseService.delete(API_URL + '/Threads/DeleteReply/' + id).then(() => {
        resolve();
      }).catch(BaseService.handleError);
    });
  }
}