/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/store/actions/types';

import { ILoginState } from 'app/models/reducers/login';
import {
  ILoginRequestState,
  ILoginResponseState,
} from 'app/models/actions/login';
const initialState: ILoginState = {
  isLoggedIn: false,
  id: 0,
  username: '',
  password: '',
  errorMessage:''
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state: ILoginState, action: ILoginRequestState) {
    console.log(action.username,'login----------------------------------------------------------------------------------------');
    return {
      ...state,
      username: action.username,
      password: action.password,
    };
  },
  [types.LOGIN_LOADING_ENDED](state: ILoginState) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state: ILoginState, action: ILoginResponseState) {
    return {
      ...state,
      isLoggedIn: true,
      user:{...action.response}
      
    };
  },
  [types.LOGIN_FAILED](state: ILoginState,action) {
    return {
      ...state,
      isLoggedIn: false,
      isEmailPasswordValid:false,
      errorMessage:action.errorMessage
    };
  },
  [types.LOG_OUT](state: ILoginState) {
    return {
      isLoggedIn: false,
      errorMessage:''
    };
  },
});
