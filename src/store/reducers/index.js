import {combineReducers} from "redux";
import {authReducer} from "./auth";
import {dashboardReducer} from "./dashboard";
import {usersReducer} from "./usersReudcer"; 
import {confirmationReducer} from './confirmationReducer'; 
import {helpReducer} from './helpReducer'; 
import {bannerReducer} from './bannerReducer'; 
import {homeReducer} from './homeReducer'; 
import {languageReducer} from './languageReducer'; 
import {restaurantReducer} from './restaurantReducer'; 
import {branchReducer} from './branchReducer'; 
import { paymentReducer } from "./paymentReducer";

export const rootReducer = combineReducers({
  authReducer, dashboardReducer, usersReducer, confirmationReducer,
   helpReducer,bannerReducer,
   homeReducer,languageReducer,restaurantReducer,branchReducer,paymentReducer
});
