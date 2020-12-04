/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put,call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';


import { showMessage} from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import loginUser from 'app/services/loginUser';
import * as loginActions from 'app/store/actions/loginActions';

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  
  yield put(loginActions.enableLoader());

  //how to call api
  const {response, error} = yield call(loginUser, action.username, action.password)
  
  //mock response
  // const response = { success: true, data: { id: 1 }, message: 'Success' };

  if(response){
      if (response.status==200) {
        const userData=JSON.stringify(response.data)
        AsyncStorage.setItem('user', userData)
        showMessage({
          message:"Logged in successfully!",
          type: "success",
        });
      yield put(loginActions.onLoginResponse(response.data));
      yield put(loginActions.disableLoader());
      // no need to call navigate as this is handled by redux store with SwitchNavigator
      //yield call(navigationActions.navigateToHome);
    }
    else{
      showMessage({
        message:response.message,
        type: "warning",
      });
    }
  }
  if(error){
      yield put(loginActions.loginFailed(error.message));
      showMessage({
        message: error.message,
        type: "danger",
      })
  }
  if(!response && !error){
    yield put(loginActions.disableLoader());
    showMessage({
      message:"something went wrong",
      description:"try again or logout",
      duration:5000,
      type: "danger",
    });
  }
}
