import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {showMessage} from "react-native-flash-message";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme} from 'react-native-paper';
import { useDispatch,} from 'react-redux';

import DatePicker from 'react-native-datepicker'

import * as userActions from 'app/store/actions/userActions'
import styles from './userStyles';


const AddUser: React.FC = ({navigation}) => {
  
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
        userId:'',
        name:'',
        mobile:'',
        planName:'',
        planStart:"2020-12-30",
        planEnd:'2021-12-31',
        address:'',
        location:''
    });
  const [validationMessages, setValidationMessages]= React.useState({
    isMobileValid:true,
    mobileValidationMessage:""
  })
  const [isFocused, setIsFocused] = React.useState(false)

    const textUserIdChange = (val) => {
            setData({
                ...data,
                userId:val
            });
    }
    const textNameChange = (val) => {
            setData({
                ...data,
                name:val
            });
    }
    const textMobileChange = (val) => {
            setData({
                ...data,
                mobile:val
            });
    }
    const textPlanNameChange = (val) => {
            setData({
                ...data,
                planName:val
            });
    }
    const validateMobile=(value)=>{
      console.log(value);
      
      if(value.length<10 || !value.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)){
        showMessage({message: "Invalid Mobile number",type: "danger",})
          setValidationMessages({
            ...validationMessages,
            isMobileValid:false,
            mobileValidationMessage:"Invlaid Moble Number"
          })
        }
        else{
          setValidationMessages({
            ...validationMessages,
            isMobileValid:true,
            mobileValidationMessage:""
          })
        }
    }
    const textAddressChange = (val) => {
            setData({
                ...data,
                address:val
            });
    }
    const textLocationChange = (val) => {
            setData({
                ...data,
                location:val
            });
    }

  const onRegisterPressed=()=>{
    if(!(data.address && data.location && data.mobile && data.name && data.planName && data.userId)){
      showMessage({message: "Please enter all details",type: "danger",})
    }
    else if(!validationMessages.isMobileValid){
      showMessage({message: "Enter valid mobile number",type: "danger",})
    }
    else{
      
      dispatch(userActions.addUser(data))
    } 
  }
  
  const { colors } = useTheme();
  // const onForgot = () => NavigationService.navigate('ForgotPassword');
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.addUserHeader}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <FontAwesome 
                name='arrow-left'
                style={styles.backArrow}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.addUserText}>Add New User</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Animatable.View animation="fadeInUpBig" useNativeDriver={true}>
                    <KeyboardAvoidingView>
                      <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color={colors.text}
                            size={25}
                            style={styles.iconStyle}
                          />
                        <TextInput 
                            placeholder="Username"
                            placeholderTextColor="#666666"
                            style={styles.addUserTextInput}
                            underlineColorAndroid={isFocused ? '#009387' : '#666666'}
                            onFocus={()=>{setIsFocused(true)}}
                            onBlur={()=>{setIsFocused(false)}}
                            onChangeText={(val) => textUserIdChange(val)}
                            onEndEditing={(e)=>setData({...data,userId:e.nativeEvent.text.trim()})}
                        />
                      </View> 
                    {/* </KeyboardAvoidingView>

                    <KeyboardAvoidingView> */}
                      <View style={styles.action}>
                        <FontAwesome 
                          name="map-marker"
                          size={25}
                          style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder="Name"
                            placeholderTextColor="#666666"
                            style={styles.addUserTextInput}
                            underlineColorAndroid={isFocused ? '#009387' : '#666666'}
                            onFocus={()=>{setIsFocused(true)}}
                            onBlur={()=>{setIsFocused(false)}}
                            onChangeText={(val) => textNameChange(val)}
                        />
                      </View>
                    {/* </KeyboardAvoidingView>
                    
                    <KeyboardAvoidingView > */}
                      <View style={styles.action}>
                        <FontAwesome 
                          name="mobile"
                          size={25}
                          style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder="Mobile"
                            placeholderTextColor="#666666"
                            style={styles.addUserTextInput}
                            underlineColorAndroid={isFocused ? '#009387' : '#666666'}
                            onFocus={()=>{setIsFocused(true)}}
                            onBlur={()=>{setIsFocused(false)}}
                            keyboardType='number-pad'
                            maxLength={10}
                            onEndEditing={(val)=>{validateMobile(val.nativeEvent.text)}}
                            onChangeText={(val) => textMobileChange(val)}
                        />
                      </View>
                    {/* </KeyboardAvoidingView>
                    
                    {!validationMessages.isMobileValid && <Text style={styles.errorText}>
                            {validationMessages.mobileValidationMessage}
                          </Text>}
                    <KeyboardAvoidingView > */}
                      <View style={styles.action}>
                        <FontAwesome 
                          name="map-marker"
                          size={25}
                          style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder="Plan Name"
                            placeholderTextColor="#666666"
                            style={styles.addUserTextInput}
                            underlineColorAndroid={isFocused ? '#009387' : '#666666'}
                            onFocus={()=>{setIsFocused(true)}}
                            onBlur={()=>{setIsFocused(false)}}
                            onChangeText={(val) => textPlanNameChange(val)}
                            
                        />
                    </View>
                    {/* </KeyboardAvoidingView> */}
                    
                    <Text style={{textAlign:'center',fontSize:15,color:'#666666'}}>Plan Start</Text>
                    {/* <KeyboardAvoidingView style={{flex:1,flexDirection:'row',}} behavior="padding"> */}
                      <View style={styles.action}>
                        <DatePicker
                            style={{width: 300,marginLeft:25}}
                            date={data.planStart}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={(date) => {setData({...data, planStart:date})}}
                          />
                      </View>
                    {/* </KeyboardAvoidingView> */}
        
                    <Text style={{textAlign:'center',fontSize:15,color:'#666666'}}>Plan End</Text>
                    {/* <KeyboardAvoidingView style={{flex:1,flexDirection:'row',}} behavior="padding"> */}
                        <View style={styles.action}>
                          <DatePicker
                              style={{width: 300,marginLeft:25}}
                              date={data.planEnd}
                              mode="date"
                              placeholder="select date"
                              format="YYYY-MM-DD"
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              showIcon={false}
                              onDateChange={(date) => {setData({...data, planEnd:date})}}
                            />
                        </View>
                    {/* </KeyboardAvoidingView>
                    
                    <KeyboardAvoidingView > */}
                      <View style={styles.action}>
                        <FontAwesome 
                          name="address-card"
                          size={25}
                          style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder="Address"
                            placeholderTextColor="#666666"
                            style={styles.addUserTextInput}
                            underlineColorAndroid={isFocused ? '#009387' : '#666666'}
                            onFocus={()=>{setIsFocused(true)}}
                            onBlur={()=>{setIsFocused(false)}}
                            onChangeText={(val) => textAddressChange(val)}
                        />
                        </View>
                    {/* </KeyboardAvoidingView>
                    <KeyboardAvoidingView > */}
                      <View style={styles.action}>
                        <FontAwesome 
                          name="map-marker"
                          size={25}
                          style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder="location"
                            placeholderTextColor="#666666"
                            style={styles.addUserTextInput}
                            underlineColorAndroid={isFocused ? '#009387' : '#666666'}
                            onFocus={()=>{setIsFocused(true)}}
                            onBlur={()=>{setIsFocused(false)}}
                            onChangeText={(val) => textLocationChange(val)}
                        />
                        </View>
                    {/* </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior="padding"> */}
                    <View style={styles.buttonContent}>
                        <TouchableOpacity style={styles.buttonContainer}>
                          <Text  style={styles.updateButtonText} onPress={()=>onRegisterPressed()}>Register User</Text>  
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                </Animatable.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddUser;
