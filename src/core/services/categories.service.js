import { API_URL } from './Constants';
import BaseService from './base-api.service';

export default class CategoriesService {
  static getById(id) {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/categories/GetById/' + id).then((data) => {
        resolve(data.data);
      }).catch(BaseService.handleError);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/categories/GetAll').then((data) => {
        resolve(data);
      }).catch(BaseService.handleError);
    });
  }

  static getTrendingCategories(id) {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/categories/TrendingCategories').then((data) => {
        resolve(data.data);
      }).catch(BaseService.handleError);
    });
  }  

  static save(poll) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/categories/SaveCategory', poll).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      BaseService.delete(API_URL + '/categories/Delete/' + id).then(() => {
        resolve();
      }).catch(BaseService.handleError);
    });
  }
}