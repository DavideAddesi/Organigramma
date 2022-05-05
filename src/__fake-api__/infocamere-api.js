import axios from 'axios';
import userDetailJson from "../components/dashboard/organigramma/dettaglio/userDetails.json"

export const errorHandler = (error) => {
  const response = error.response;
  return  response.data
}

const postManPrefix = "https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"


const getEndPoint = () => {
  if (typeof window !== 'undefined') {
    const customEndpoint=localStorage.getItem('endpoint')
    if(customEndpoint && customEndpoint != ""){
      return customEndpoint
    } else return postManPrefix    
  }else return postManPrefix
}


const http = axios.create({
  baseURL:  getEndPoint()
});


class InfoCamereAPI {

  getOrgInfocamere() {  
    return http.get('/api/v1/organigramma/get/struttura/infocamere')
  }

  getScheda() {  
    return http.get('/api/v1/organigramma/get/scheda/30')
  }

  getSchedaDirezione() {  
    return http.get('/api/v1/organigramma/get/scheda/10')
  }

  getSchedaStruttura() {  
    return http.get('/api/v1/organigramma/get/scheda/20')
  }

  getUtente() {  
    return http.get('/api/v1/organigramma/get/user/2')
  }

  getOrgicoutsourcing() {  
    return http.get('/api/v1/organigramma/get/struttura/icoutsourcing')
  }

  getOrgiconto() {  
    return http.get('/api/v1/organigramma/get/struttura/iconto')
  } 
  
  getOrgecocerved() { 
    return http.get('/api/v1/organigramma/get/struttura/ecocerved')
  }


  
}

export const infoCamereAPI = new InfoCamereAPI();
