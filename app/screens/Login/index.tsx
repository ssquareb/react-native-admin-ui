import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import { showMessage} from "react-native-flash-message";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme} from 'react-native-paper';
import { useDispatch, useSelector} from 'react-redux';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';

interface IState {
  loginReducer: ILoginState;
}

const Login: React.FC = ({navigation}) => {
  const [data, setData] = React.useState({
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }
    const handlePasswordChange = (val) => {
            setData({
                ...data,
                password: val
            });
        }
    const updateSecureTextEntry = () => {
            setData({
                ...data,
                secureTextEntry: !data.secureTextEntry
            });
        }

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const onLogin = () =>{
      if(data.email && data.password){
        dispatch(loginActions.requestLogin(data.email, data.password))
      }
      else{
        showMessage({message: "Email/Password can't be null",type: "danger",})
      }
  };
  const onSignUp=()=>navigation.navigate('SignUp')
  // const onForgot = () => NavigationService.navigate('ForgotPassword');
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.jpg')} style={styles.imageStyle} />
      </View>
      <View>
        <Text style={styles.adminText}>Login as Admin</Text>
      </View>
        <Animatable.View 
                animation="fadeInUpBig"
                useNativeDriver={true}
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color={colors.text}
                        size={25}
                    />
                    <KeyboardAvoidingView style={{flex:1,flexDirection:'row'}} behavior="padding">
                        
                        <TextInput 
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ? 
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather 
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                    </KeyboardAvoidingView>
                    
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 20
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color={colors.text}
                        size={25}
                    />
                    <KeyboardAvoidingView style={{flex:1,flexDirection:'row',}} behavior="padding">
                        <TextInput 
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry ={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                    </KeyboardAvoidingView>
                    {/* show password */}
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ? 
                        <Feather 
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather 
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>
            
            <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {onLogin()}}
                    >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>
                    </LinearGradient>
                    </TouchableOpacity>

                    {/* navigate to signup scree */}
                    <TouchableOpacity
                        onPress={() => onSignUp()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </Animatable.View>
    </View>
  );
};

export default Login;
