import createReducer from 'app/lib/createReducer';
import * as types from 'app/store/actions/types';

const initialState = {
  isUsersLoading:true
};

export const fetchUsersReducer = createReducer(initialState, {
  [types.FETCH_USERS](state, action) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$action in login$$$$$$$$$$$$$$$$$$$$",action);
    return {
      ...state,
      isUsersLoading:false,
    };
  },
  [types.FETCH_USER_FAILED](state) {
    return { ...state, isUsersLoading: true };
  },
  [types.FETCH_USERS_DETAILS](state,action){
    console.log("$$$$$$$$$$$$$$$$$$$$$$action in login$$$$$$$$$$$$$$$$$$$$",action);
    return {...state, isUsersLoading:false, users:action.results }
  },
  [types.DELETE_USER](state,action){
    console.log("$$$$$$$$$$$$$$$$$$$$$$action in delete   $$$$$$$$$$$$$$$$$$$$",action);
    return {
      ...state,
      isUserDeleted:false
    }
  },
  [types.ADD_USER](state,action){
    console.log("$$$$$$$$$$$$$$$$$$$$$$action in delete   $$$$$$$$$$$$$$$$$$$$",action);
    return {
      ...state,
      userDetails:{
        ...action.userDetails
      }
    }
  },
  [types.CLEAR_USER_DETAILS](state){
    console.log("++++++++++++++++++Clearing++++++++++++++++++++",state.userDetails);
    
    return {
      ...state,
      userDetails:{},
      users:{}
    }
  },
  [types.UPDATE_USER](state, action){
    return{
      ...state,
      updateUserDetails:{
        ...action.updateUserDetails
      }
    }
  }
});
