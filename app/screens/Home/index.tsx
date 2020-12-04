import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';
import FlashMessage from "react-native-flash-message";
import { Button } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import * as userActions from 'app/store/actions/userActions'
import styles from './styles';

const Home: React.FC = ({navigation}) => {

  const dispatch = useDispatch();
  const onLogout = () => {
    AsyncStorage.clear()
    dispatch(loginActions.logOut())
  };
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(()=>{
      dispatch(userActions.fetchUsers())
  },[refreshing,]);

  const u = useSelector(state => state.fetchUsersReducer)
  const userList=u.users

  const deleteSelectedUser=(userId)=>{
    setAlert(true);
    setSelectedUserId(userId)
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Edit',{...item})}>
      <View style={styles.cardFooter}>
        <View style={{alignItems:"center", justifyContent:"center"}}>
          <Text style={styles.name}>{item.userId}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableHighlight style={styles.followButton}>
            <Text style={styles.followButtonText} onPress={()=>deleteSelectedUser(item.userId)}>Delete</Text>  
          </TouchableHighlight>
        </View>
      </View>
    </TouchableOpacity>
  );

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  

  
  const onConfirmPressed=()=>{
    dispatch(userActions.deleteUser(selectedUserId))
    dispatch(userActions.fetchUsers())
    setAlert(false)
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(userActions.fetchUsers())
    wait(2000).then(() => setRefreshing(false));
  },[refreshing])

  const onAddPressed=()=>{
      navigation.navigate('Add')
  }
  return (
    <View style={styles.container}>
      <Button icon="logout" mode="outlined" onPress={onLogout}>
        Logout
      </Button>
      <FlashMessage icon="auto" autoHide floating duration={1000} style={{padding:25}} position="top" />
      <AwesomeAlert
          show={alert}
          showProgress={false}
          title="Delete User?"
          message="Are you sure want to delete?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          alertContainerStyle={{width:'100%'}}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {setAlert(false);
          }}
          onConfirmPressed={() => {onConfirmPressed()
          }}
        />
      <SafeAreaView style={styles.container}>
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={userList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={()=>onAddPressed()}
              style={styles.touchableOpacityStyle}>
              <Image
                source={require('app/assets/add.png')}
                style={styles.floatingButtonStyle}
              />
            </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Home;
