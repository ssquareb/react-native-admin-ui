/*
 * Reducer actions related with login
 */
import * as types from './types';
// import { ILoginResponse } from 'app/models/api/login';

export function fetchUsers() {
  
  return {
    type: types.FETCH_USERS,
  };
}

export function fetchUsersFailed() {
  return {
    type: types.FETCH_USER_FAILED,
  };
}

export function fetchUsersDetails({results}){
  
  return {
    type: types.FETCH_USERS_DETAILS,
    results
    // users:{
    //   results
    //   // ...users
    // }
  }
}

export function addUser(userDetails){
  return {
    type: types.ADD_USER,
    userDetails
  }
}

export function deleteUser(userId){
  console.log('::::::::::::::::::::delete action:::::::::::::::',userId);
  
  return{
    type: types.DELETE_USER,
    userId
  }
}

export function clearUserDetails(){
  return{
    type:types.CLEAR_USER_DETAILS
  }
}

export function updateUser(updateUserDetails){
  return{
    type:types.UPDATE_USER,
    updateUserDetails
  }
}


