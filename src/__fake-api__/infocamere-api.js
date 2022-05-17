import axios from 'axios';

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

const getUrl = () => {
  if (typeof window !== 'undefined') {
    const url=localStorage.getItem('api')
    if(url && url != ""){
      return url
    } else return 1    
  }else return 1
}


const http = axios.create({
  baseURL:  getEndPoint()
});


class InfoCamereAPI {

  getOrgInfocamere() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/struttura/infocamere': getUrl())
  }

  getScheda() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/scheda/30': getUrl())
  }

  getSchedaDirezione() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/scheda/10': getUrl())
  }

  getSchedaStruttura() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/scheda/20': getUrl())
  }

  getUtente() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/user/2': getUrl())
  }

  getOrgicoutsourcing() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/struttura/icoutsourcing': getUrl())
  }

  getOrgiconto() {  
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/struttura/iconto': getUrl())
  } 
  
  getOrgecocerved() { 
    return http.get(getUrl() == 1 ? '/api/v1/organigramma/get/struttura/ecocerved': getUrl())
  }


  
}

export const infoCamereAPI = new InfoCamereAPI();
