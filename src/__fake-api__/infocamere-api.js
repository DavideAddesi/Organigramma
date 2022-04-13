import axios from 'axios';
import userDetailJson from "../components/dashboard/organigramma/dettaglio/userDetails.json"

export const errorHandler = (error) => {
  const response = error.response;
  return  response.data
}


class InfoCamereAPI {

  getOrgInfocamere({restPrefix}) {  
    const http = axios.create({
      baseURL: restPrefix
    });
    return http
    .get('/api/v1/organigramma/get/struttura/infocamere')
      .then(response => {
        const resp = response.data;
        return resp;
      })
      .catch(error => errorHandler(error));
  }

  getScheda({restPrefix}) {  
    const http = axios.create({
      baseURL: restPrefix
    });
    return http
    .get('/api/v1/organigramma/get/scheda/2')
      .then(response => {
        const resp = response.data;
        return resp;
      })
      .catch(error => errorHandler(error));
  }

  getUtente({restPrefix}) {  
    const http = axios.create({
      baseURL: restPrefix
    });
    return http
    .get('/api/v1/organigramma/get/user/2')
      .then(response => {
        const resp = response.data;
        return resp;
      })
      .catch(error => errorHandler(error));
  }


  
}

export const infoCamereAPI = new InfoCamereAPI();
