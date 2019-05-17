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

    static getNewMessagesCount() {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/PersonalMessages/GetNewMessagesCount/' + BaseService.getLoggedUserId()).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static getAllForReceiver() {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/PersonalMessages/GetAllForReceiver/' + BaseService.getLoggedUserId()).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static getAllForSender() {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/PersonalMessages/GetAllForSender/' + BaseService.getLoggedUserId()).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static getMessageThread(senderId) {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + `/PersonalMessages/GetMessageThread/${senderId}/${BaseService.getLoggedUserId()}`).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static validateUser(username) {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + `/Users/GetUserByUsername/${username}`).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static saveMessage(message) {
        return new Promise((resolve, reject) => {
            message['senderId'] = BaseService.getLoggedUserId();
            BaseService.post(API_URL + '/PersonalMessages/SaveMessage', message).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static markAsRead(message) {
        return new Promise((resolve, reject) => {
            BaseService.post(API_URL + '/PersonalMessages/MarkAsRead', message).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            BaseService.delete(API_URL + '/PersonalMessages/Delete/' + id).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }
}