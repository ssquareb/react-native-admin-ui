import { AsyncStorage } from 'react-native';


const getToken= async () =>{
    const users=await AsyncStorage.getItem('user')
//    {console.log(users)} 
   return users
  }

export default getToken;