import { put,call } from 'redux-saga/effects';
import updateUser from 'app/services/updateUser'
import * as loginActions from 'app/store/actions/loginActions';
import * as userActions from 'app/store/actions/userActions'
import { showMessage} from "react-native-flash-message";

// Our worker Saga that logins the user
export default function* updateUserAsync(action) {
  
  const {response, error} = yield call(updateUser,action.updateUserDetails)

  if (response) {
      if(response.status==200 || response.status==201){
        const userData=response.data
        showMessage({
          message: "User updated succesfully",
          type: "success",
        });
        
        yield put(userActions.fetchUsers());
      }
    else{
      showMessage({
        message:response.message,
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
      duration:4000,
    });
    if(error.code==401){
      yield put(loginActions.logOut())
    }
  }
  if(!response && !error){
    showMessage({
      message: "Something went wrong",
      description:"try adding again or logout",
      duration:5000,
      type: "danger",
    });
  }
}
