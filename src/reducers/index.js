import { loadingBarReducer } from 'react-redux-loading-bar';
import {combineReducers} from 'redux';
import { InfoReducer } from './customer';
import { codeReducer, userReducer, userInfoReducer, userRoles } from './user';

export const reducers= combineReducers({

    User:userReducer,
    otpCode:codeReducer,
    userInfo:userInfoReducer,
    userRole:userRoles
});
