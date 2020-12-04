/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
import * as fetchUsersReducer from './fetchUsersReducer'
export default Object.assign(loginReducer, loadingReducer, themeReducer, fetchUsersReducer);
