import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'

//local imports
import Home from '../screens/Home'
import EditUser from '../screens/Home/EditUser'
import AddUser from '../screens/Home/AddUser'


const Drawer = createDrawerNavigator()
const UserScreen= createStackNavigator()

const UserMainScreen=()=>{
  return(
    <UserScreen.Navigator headerMode="none">
      <UserScreen.Screen name='Home' component={Home}/>
      <UserScreen.Screen name='Edit' component={EditUser} />
      <UserScreen.Screen name='Add' component={AddUser} />
    </UserScreen.Navigator>
  )
}

const MainStackScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" 
    component={UserMainScreen} 
    options={{title: 'Home',
      headerTitleStyle: {
        textAlign:'center',
        fontWeight: 'bold',
      },     
      }} />
      <Drawer.Screen name="Plans" 
    component={Home} 
    options={{title: 'Plans',
      headerTitleStyle: {
        textAlign:'center',
        fontWeight: 'bold',
      },      
      }} />
  </Drawer.Navigator>
);


export {MainStackScreen}