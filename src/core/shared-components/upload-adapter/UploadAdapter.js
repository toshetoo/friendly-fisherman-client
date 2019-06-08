import BaseService from './../../services/base-api.service';
import { API_URL } from './../../services/Constants';

export default class UploadAdapter {
    constructor( loader ) {
      this.loader = loader;
    }
  
    async upload() {
      debugger;  
      const url = API_URL + `/Threads/UploadImage`;      
      await this.loader.file.then((file) => {

        const reader = new FileReader();
      
        reader.onload = () => {
          console.log(reader.result);

          return BaseService.uploadFile(url, reader.result.split(',')[1], "fdsfdsfds").then(res => {
            console.log(res)
            var resData = res.data;
            resData.default = resData.url;
            return resData;
          }).catch(error => {
            console.log(error)
            return Promise.reject(error)
          });
        };        

        reader.readAsDataURL(file);
      });     
    }
  
    abort() {
      // Reject promise returned from upload() method.
    }
  }