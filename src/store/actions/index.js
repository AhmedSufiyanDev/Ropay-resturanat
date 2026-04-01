import {
  loginErrorHandlerSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  logoutSuccess,
  signupFailure,
  signupStart,
  signupSuccess,
  sendOtp, sendOtpSuccess, sendOtpFailure,
  verifyOtp,verifyOtpSuccess,verifyOtpFailure,verifyOtpHandlerSuccess,
  sendQuery, sendQuerySuccess, sendQueryFailure,
} from "./auth";

import { dashboardErrorHandlerSuccess, dashboardFailure, dashboardStart, dashboardSuccess, } from "./dashboard";
 
import {
  addNewUser,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  getUserData,
  getUserDataFailure,
  getUserDataSuccess,
  getUsersList,
  getUsersListFailure,
  getUsersListSuccess,
  messageHandler,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  setUserServicesList,
} from './user';

import {
  getBannersStart,getBannersSuccess,getBannersFailure
} from './banner';

import {
  getRestaurantCategoriesStart,getRestaurantCategoriesSuccess,getRestaurantCategoriesFailure,
  getProductFailure,getProductSuccess,getProductStart,
  getCartItemsStart, getCartItemsSuccess,getCartItemsFailure
} from './home'

import {
  fetchAllLanguagesRequest,fetchAllLanguagesSuccess,fetchAllLanguagesFailure,
  getAllKeywordFailure,getAllKeywordSuccess,getAllKeywordStart,
  getAllDetailLangFailure,getAllDetailLangSuccess,getAllDetailLangStart,
  setCurrentLanguage
} from './language'

import {
  getRestaurantData,
  getRestaurantDataFailure,
  getRestaurantDataSuccess,
  updateOrderItemStart, updateOrderItemSuccess, updateOrderItemFailure,
  getOrderFailure,getOrderSuccess,getOrderStart,
  updateOrderFailure,updateOrderSuccess,updateOrderStart,
  createRevoultOrderForPaymentFailure,createRevoultOrderForPaymentSuccess,createRevoultOrderForPaymentStart,
  createEtisilatOrderForPaymentFailure,createEtisilatOrderForPaymentSuccess,createEtisilatOrderForPaymentStart,
  getPopularProductsStart, getPopularProductsSuccess, getPopularProductsFailure,
  createOrderMessageHandler
} from './restaurant'

import {
  getBranchList,
  getBranchListFailure,
  getBranchListSuccess,
} from './branch';

import {
  setPayStatus,
  getPaymentGateways, getPaymentGatewaysSuccess, getPaymentGatewaysFailure,
  getOrderPaymentStart,getOrderPaymentSuccess,getOrderPaymentFailure,
  updateOrderPaymentStart, updateOrderPaymentSuccess, updateOrderPaymentFailure,
  paymentMessageHandler
} from './payment';

import { confirmationHandler } from "./confrmation";
import { helpHandler } from "./help";


export {
 
  // auth actions/
  signupStart, signupSuccess, signupFailure,
  loginStart, loginSuccess, loginFailure, loginErrorHandlerSuccess,
  logout, logoutSuccess,
  dashboardStart, dashboardSuccess, dashboardFailure, dashboardErrorHandlerSuccess,
  sendOtp, sendOtpSuccess, sendOtpFailure,
  verifyOtp,verifyOtpSuccess,verifyOtpFailure,verifyOtpHandlerSuccess,
  sendQuery, sendQuerySuccess, sendQueryFailure,

  // user actions
  getUsersList, getUsersListSuccess, getUsersListFailure,
  addNewUser, getUserData, getUserDataSuccess, getUserDataFailure,
  updateUser, updateUserSuccess, updateUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure, messageHandler,
  setUserServicesList,

   /////banner actiions///
   getBannersStart,getBannersSuccess,getBannersFailure,
  
   /////CATEGORY///
   getRestaurantCategoriesStart,getRestaurantCategoriesSuccess,getRestaurantCategoriesFailure,
   //////product ///
   getProductFailure,getProductSuccess,getProductStart,
   getCartItemsStart, getCartItemsSuccess,getCartItemsFailure,

   /////lang///
   fetchAllLanguagesRequest,fetchAllLanguagesSuccess,fetchAllLanguagesFailure,
   getAllKeywordFailure,getAllKeywordSuccess,getAllKeywordStart,  
   getAllDetailLangFailure,getAllDetailLangSuccess,getAllDetailLangStart,
   setCurrentLanguage
,

/////restaurants////////////
getRestaurantData,
getRestaurantDataFailure,
getRestaurantDataSuccess,
updateOrderItemStart, updateOrderItemSuccess, updateOrderItemFailure,
getOrderFailure,getOrderSuccess,getOrderStart,  updateOrderFailure,updateOrderSuccess,updateOrderStart,    createRevoultOrderForPaymentFailure,createRevoultOrderForPaymentSuccess,createRevoultOrderForPaymentStart, createEtisilatOrderForPaymentFailure,createEtisilatOrderForPaymentSuccess,createEtisilatOrderForPaymentStart, getPopularProductsStart, getPopularProductsSuccess, getPopularProductsFailure,
createOrderMessageHandler,

// branch actions
getBranchList, getBranchListSuccess, getBranchListFailure,

//Retrieve Order Payment Details (List)
setPayStatus,

getPaymentGateways, getPaymentGatewaysSuccess, getPaymentGatewaysFailure,

getOrderPaymentStart,getOrderPaymentSuccess,getOrderPaymentFailure,

updateOrderPaymentStart, updateOrderPaymentSuccess, updateOrderPaymentFailure,

paymentMessageHandler,

  // confirmation action
  confirmationHandler,
  // help action
  helpHandler,
  
};
