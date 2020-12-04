import React from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

// import 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './userStyles'
import {showMessage} from "react-native-flash-message";
import { useDispatch,} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as userActions from 'app/store/actions/userActions'

const EditUser : React.FC = ({ route, navigation }) =>{
    const [data, setData] = React.useState({
        ...route.params
    });
    React.useEffect(() => {
        const ps=data.planStart.substring(0, 10);
        const pe=data.planEnd.substring(0, 10)
        setData({
            ...data,
            planStart:ps,
            planEnd:pe
        })
    }, [])

    const [validationMessages, setValidationMessages]= React.useState({
    isMobileValid:true,
    mobileValidationMessage:""
  })
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = React.useState(false)

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

    const onUpdatePressed=()=>{
        if(!(data.address && data.location && data.mobile && data.name && data.planName && data.userId)){
        showMessage({message: "Please enter all details",type: "danger"})
        }
        else if(!validationMessages.isMobileValid){
        showMessage({message: "Enter valid mobile number",type: "danger"})
        }
        else{
        delete data.role
        delete data.AddedBy
        delete data.id
        
          dispatch(userActions.updateUser(data))
        } 
    }
    return(
        <SafeAreaView>  
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.header}><Text style={styles.headerText}>{data.userId}</Text></View>
                <Image style={styles.avatar} source={{uri: 'https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png'}}/>
                <Animatable.View animation="fadeInUpBig" useNativeDriver={true}>
                    <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <KeyboardAvoidingView >
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="user-o"
                                    size={25}
                                    style={styles.iconStyle}
                                />
                                <TextInput 
                                    value={data.name}
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    underlineColorAndroid={isFocused ? '#009387': 'rgba(255, 255, 255, 0)'}
                                    onFocus={()=>{setIsFocused(true)}}
                                    onBlur={()=>{setIsFocused(false)}}
                                    onChangeText={(val) => textNameChange(val)}
                                />
                            </View>
                            
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="phone"
                                    size={25}
                                    style={styles.iconStyle}
                                />
                                <TextInput 
                                    value={data.mobile}
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    underlineColorAndroid={isFocused ? '#009387': 'rgba(255, 255, 255, 0)'}
                                    onFocus={()=>{setIsFocused(true)}}
                                    onBlur={()=>{setIsFocused(false)}}
                                    keyboardType='number-pad'
                                    maxLength={10}
                                    onEndEditing={(val)=>{validateMobile(val.nativeEvent.text)}}
                                    onChangeText={(val) => textMobileChange(val)}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="user-o"
                                    size={25}
                                    style={styles.iconStyle}
                                />
                                <TextInput 
                                    value={data.planName}
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    underlineColorAndroid={isFocused ? '#009387': 'rgba(255, 255, 255, 0)'}
                                    onFocus={()=>{setIsFocused(true)}}
                                    onBlur={()=>{setIsFocused(false)}}
                                    onChangeText={(val) => textPlanNameChange(val)}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <Text style={{textAlign:'center',fontSize:15,color:'#666666'}}>Plan Start</Text>
                        <KeyboardAvoidingView>
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
                        </KeyboardAvoidingView>
                        <Text style={{textAlign:'center',fontSize:15,color:'#666666'}}>Plan End</Text>
                        <KeyboardAvoidingView>
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
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="address-card"
                                    size={25}
                                    style={styles.iconStyle}
                                />
                                <TextInput 
                                    value={data.address}
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    underlineColorAndroid={isFocused ? '#009387': 'rgba(255, 255, 255, 0)'}
                                    onFocus={()=>{setIsFocused(true)}}
                                    onBlur={()=>{setIsFocused(false)}}
                                    onChangeText={(val) => textAddressChange(val)}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView>
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="map-marker"
                                    size={25}
                                    style={styles.iconStyle}
                                />
                                <TextInput 
                                    value={data.location}
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    underlineColorAndroid={isFocused ? '#009387': 'rgba(255, 255, 255, 0)'}
                                    onFocus={()=>{setIsFocused(true)}}
                                    onBlur={()=>{setIsFocused(false)}}
                                    onChangeText={(val) => textLocationChange(val)}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={styles.buttonContent}>
                    <TouchableOpacity style={styles.buttonContainer}>
                      <Text  style={styles.updateButtonText} onPress={()=>onUpdatePressed()}>Update</Text>  
                    </TouchableOpacity>
                </View>
                </Animatable.View>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}



export default EditUser;