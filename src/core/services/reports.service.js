import { API_URL } from './Constants';
import BaseService from './base-api.service';

export default class ReportsService { 

    static getThreadsPerDayReport(data) {
        return new Promise((resolve, reject) => {
            const url = `/Reports/ThreadsPerDayReport?Limit=${data.limit}&StartDate=${data.startDate}&EndDate=${data.endDate}`;
            BaseService.get(API_URL + url).then((data) => {
              resolve(data.data);
            }).catch(BaseService.handleError);
          });
    }

    static getPostsPerDayReport(data) {
        return new Promise((resolve, reject) => {
            const url = `/Reports/PostsPerDayReport?Limit=${data.limit}&StartDate=${data.startDate}&EndDate=${data.endDate}`;
            BaseService.get(API_URL + url).then((data) => {
              resolve(data.data);
            }).catch(BaseService.handleError);
          });
    }

    static getMostUsedCategoriesReport(data) {
        return new Promise((resolve, reject) => {
            const url = `/Reports/MostUsedCategories?Limit=${data.limit}&StartDate=${data.startDate}&EndDate=${data.endDate}`;
            BaseService.get(API_URL + url).then((data) => {
              resolve(data.data);
            }).catch(BaseService.handleError);
          });
    }
}