import BaseService from './base-api.service';
import { API_URL } from './Constants';

export default class EventService {

    static getById(id) {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/Events/GetById/' + id).then((data) => {
                resolve(data.data);
            }).catch(BaseService.handleError);
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/Events/GetAll/').then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static save(event) {
        return new Promise((resolve, reject) => {
            BaseService.post(API_URL + '/Events/Save', event).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            BaseService.delete(API_URL + `/Events/Delete/${id}/${BaseService.getLoggedUserId()}`).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }
}