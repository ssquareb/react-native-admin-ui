import { put,call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';

import fetchUsers from 'app/services/fetchUsers'
import { showMessage} from "react-native-flash-message";
import * as loginActions from 'app/store/actions/loginActions';
import * as userActions from 'app/store/actions/userActions'

// Our worker Saga that logins the user
export default function* fetchUsersAsync(action) {

  const {response, error} = yield call(fetchUsers)
  
  //mock response
  // const response = { success: true, data: { id: 1 }, message: 'Success' };

  if (response) {
    if(response.status==200){
      const userData=response.data
      // AsyncStorage.setItem('user', userData)
      console.log("success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",userData);
      
      yield put(userActions.fetchUsersDetails(userData));
    }
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
    else{
      showMessage({
        message:response.message,
        type: "warning",
      });
    }
  } 
  if(error){
    showMessage({
      message: error.message,
      type: "danger",
    });
    if(error.code==401){
        yield put(loginActions.logOut())
    }
  }
  if(!response && !error){
    showMessage({
      message:"something went wrong",
      description:"try again or logout",
      duration:5000,
      type: "danger",
    });
  }
}
