import { put,call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';

import { showMessage} from "react-native-flash-message";
import deleteUser from 'app/services/deleteUser'
import * as loginActions from 'app/store/actions/loginActions';
import * as userActions from 'app/store/actions/userActions'

// Our worker Saga that logins the user
export default function* deleteUserAsync(action) {
  
  const {response, error} = yield call(deleteUser,action.userId)

  if (response) {
    if(response.status==200){
      const userData=response.data
      showMessage({
        message:"User deleted successfully",
        type: "success",
      });
      yield put(userActions.fetchUsers())

    }
    else{
      showMessage({
        message:"something went wrong",
        type: "warning",
      });
    }

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
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
