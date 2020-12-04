/*
 * Reducer actions related with login
 */
import * as types from './types';
import { ILoginResponse } from 'app/models/api/login';

export function requestLogin(username: string, password: string) {
  console.log(username,'----------------------------------------------------------------------------------------');
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed(errorMessage:"Enter details again") {
  return {
    type: types.LOGIN_FAILED,
    errorMessage
  };
}

export function onLoginResponse(response: ILoginResponse) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
