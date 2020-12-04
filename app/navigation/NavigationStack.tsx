import  React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import { MainStackScreen } from './MainStackScreen'
import  AuthStackScreen  from './AuthStackScreen'

import { StatusBar } from 'react-native';
import { ILoginState } from 'app/models/reducers/login';
// import { View ,Text} from 'react-native-animatable';
import FlashMessage from "react-native-flash-message";

interface IState {
  loginReducer: ILoginState;
}

interface IProps {
  theme: Theme;
}


const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useSelector(
    (state: IState) => state.loginReducer.isLoggedIn,
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
          <FlashMessage icon="auto" autoHide floating duration={2000} style={{padding:25}} position="top" />
        {isLoggedIn ? (
          <MainStackScreen />
        ) : (
          <AuthStackScreen />
          // <View ><Text>Hii hther</Text></View>
        )}
    </NavigationContainer>
  );
};

export default App;
