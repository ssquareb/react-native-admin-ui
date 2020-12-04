/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import fetchUsersSaga from './fetchUsersSaga'
import deleteUserSaga from './deleteUserSaga'
import addUserSaga from './addUserSaga'
import updateUserSaga from'./updateUserSaga'

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, loginSaga),
    takeEvery(types.FETCH_USERS, fetchUsersSaga),
    takeEvery(types.DELETE_USER, deleteUserSaga),
    takeEvery(types.ADD_USER,addUserSaga),
    takeEvery(types.UPDATE_USER,updateUserSaga)
  ]);
}
