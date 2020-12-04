import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';
import AsyncStorage from '@react-native-community/async-storage';


const token = async () => {
  const userDetails=await AsyncStorage.getItem('user');
  const tokens=await JSON.parse(userDetails)
  
  return tokens.tokens.access.token;
}
export default async function deleteUser(userId) {
  const t=await token();
  const config={
    headers:{ Authorization: `Bearer ${t}`}
  }
  const param={
      params:{
        userId:userId
      } 
  }
  
  return apiClient.delete(`/${ApiConfig.USER}/${userId}`,config)
  .then((response)=>{
      return {response};
  })
  .catch((err)=>{
    const error=err.response.data;
    return {error};
  })
}
