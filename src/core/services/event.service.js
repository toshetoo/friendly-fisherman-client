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

    static getTrendingEvents() {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/Events/GetLatestEvents/').then((data) => {
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

    static getParticipants(id) {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/Events/GetParticipantsForEvent/' + id).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static getParticipant(eventId, participantId) {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/Events/GetParticipantForEvent/' + eventId + '/' + participantId).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static addParticipant(participant) {
        return new Promise((resolve, reject) => {
            BaseService.post(API_URL + '/Events/AddParticipant', participant).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static getComments(id) {
        return new Promise((resolve, reject) => {
            BaseService.get(API_URL + '/Events/GetCommentsForEvent/' + id).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static saveComment(comment) {
        return new Promise((resolve, reject) => {
            BaseService.post(API_URL + '/Events/SaveComment', comment).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }

    static deleteComment(id) {
        return new Promise((resolve, reject) => {
            BaseService.delete(API_URL + `/Events/DeleteComment/${id}`).then((data) => {
                resolve(data);
            }).catch(BaseService.handleError);
        });
    }
}