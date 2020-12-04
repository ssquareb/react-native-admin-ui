import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';


import ThemeController from '../components/ThemeController';
import Login from 'app/screens/Login';
import SignUp from 'app/screens/SignUp'
import ForgotPassword from 'app/screens/ForgotPassword';
import { ILoginState } from 'app/models/reducers/login';

const AuthStack = createStackNavigator();



interface IState {
  loginReducer: ILoginState;
}


const AuthStackScreen = () => {
  const isLoggedIn = useSelector(
    (state: IState) => state.loginReducer.isLoggedIn,
  );
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};


export default AuthStackScreen;