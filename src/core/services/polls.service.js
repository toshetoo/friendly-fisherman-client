import { API_URL } from './Constants';
import BaseService from './base-api.service';

export default class PollsService {
  static getById(id) {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/polls/GetById/' + id).then((data) => {
        resolve(data.data);
      }).catch(BaseService.handleError);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/polls/GetAll').then((data) => {
        resolve(data);
      }).catch(BaseService.handleError);
    });
  }

  static save(poll) {
    return new Promise((resolve, reject) => {
        BaseService.post(API_URL + '/polls/Save', poll).then((data) => {
          resolve(data);
        }).catch(BaseService.handleError);
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      BaseService.delete(API_URL + '/polls/Delete/' + id).then(() => {
        resolve();
      }).catch(BaseService.handleError);
    });
  }

  static addVote(pollId, answerId) {
    const userId =  BaseService.getLoggedUserId();
    const vote = { pollId, answerId, userId };

    return new Promise((resolve, reject) => {
      BaseService.post(API_URL + '/polls/AddPollVote', vote).then((image) => {
        resolve(image);
      }).catch(BaseService.handleError);
    });
  }

  static makePollOfTheWeek(id) {
    return new Promise((resolve, reject) => {
      BaseService.post(API_URL + '/polls/MakePollOfTheWeek/' + id).then((poll) => {
        resolve(poll);
      }).catch(BaseService.handleError);
    });
  }

  static getPollOfTheWeek() {
    return new Promise((resolve, reject) => {
      BaseService.get(API_URL + '/polls/GetPollOfTheWeek').then((poll) => {
        resolve(poll);
      }).catch(BaseService.handleError);
    });
  }

  static getVotedAnswerForPoll(pollId) {
    return new Promise((resolve, reject) => {
      const userId = BaseService.getLoggedUserId();
      const url = `${API_URL}/polls/GetVotedAnswerForPoll/${pollId}/${userId}`;
      BaseService.get(url).then((poll) => {
        resolve(poll);
      }).catch(BaseService.handleError);
    });
  }  
}