import axios from "axios";
import {API_URL,API_URL_ORDER,API_URL_LOCALS,API_URL_RESTAURANT,API_URL_PAYMENTS} from "../environment";

if (localStorage.getItem("access_token")) {
  axios.defaults.headers.common["Authorization"] =
  "Bearer "+localStorage.getItem("access_token");
}

if (localStorage.getItem("auction-token")) {
  axios.defaults.headers.common["access_token"] = localStorage.getItem("auction-token");
}

if (localStorage.getItem("user")) {
  let user = localStorage.getItem("user");
  // console.log({user})
  // if (user)
  axios.defaults.headers.common["user"] = user
  // else
  //   axios.defaults.headers.common["user"] = ''

}

export default class HttpService {
  static setToken = (token) => {
    axios.defaults.headers.common["Authorization"] = "Bearer "+token;
  };
  static setAucToken = (token) => {
    axios.defaults.headers.common["auction-token"] = token;
  };
  static setUser = (user) => {
    //console.log(user)
    axios.defaults.headers.common["user"] = user;
  };

  static removeUser = () => {
    axios.defaults.headers.common["user"] = '';
  };
  getPayment = (url, params) => axios.get(`${API_URL_ORDER}/${url}`, {params});

  get = (url, params) => axios.get(`${API_URL_ORDER}/${url}`, {params});

  getRestaurant = (url, params) => axios.get(`${API_URL_RESTAURANT}/${url}`, {params});

  getOrderPaymentDetails = (url, data) => axios.post(`${API_URL_PAYMENTS}/${url}`, data);

  getPaymentGateways = (url) =>axios.get(`${API_URL_PAYMENTS}/${url}`);

  post = (url, data) => axios.post(`${API_URL_ORDER}/${url}`, data);

  postRestaurant = (url, data) => axios.post(`${API_URL_RESTAURANT}/${url}`, data);

  put = (url, data, params) => axios.put(`${API_URL_ORDER}/${url}`, data, {params});
  
  putRestaurant = (url, data) =>axios.put(`${API_URL_RESTAURANT}/${url}`,data);

  patch = (url,  params) => axios.patch(`${API_URL_ORDER}/${url}`,  params);

  delete = (url, params) => axios.delete(`${API_URL_ORDER}/${url}`, {params});

  gets = (url, params) => axios.get(`${API_URL_ORDER}/${url}`, {params});

  // patch = (url, params) => axios.patch(`${API_URL}/${url}`, {params});

// API_URL_LOCALS
//  posT = (url, data) => axios.post(`${API_URL_LOCALS}/${url}`, data);
   getLang = (url, params) => axios.get(`${API_URL_LOCALS}/${url}`, {params});











  addressget = (params) => axios.get(`https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=ak_jc635mjv12swIsWCiEJWOAiDG0W84&query=${params}`);
}
