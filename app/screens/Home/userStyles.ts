import {StyleSheet, Dimensions} from 'react-native'


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    backgroundColor: "#009387",
    height:200,
  },
  addUserHeader:{
    display:"flex",
    flex:1,
    width:(Dimensions.get('window').width*100)/100,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#009387",
    height:(Dimensions.get('window').height*10)/100,
  },
  backArrow:{
    color:'white',
    alignSelf:'flex-start'
    // width:40,
  },
  addUserText:{
    color:'white',
    textAlign:'center',
    // alignSelf:'flex-start',
    fontSize:30,
  },
  errorText:{
    color:'red',
    fontSize:12,

  },
  headerText:{
      color:'white',
      fontSize:50,
      textAlign:'center',
      marginTop:50,
      fontWeight:'bold'
  },
  action: {
        // flex:1,
        flexDirection: 'row',
        marginTop: 10,
        padding:5
    },
  addUserTextInput:{
        flex:1,
        paddingLeft: 12,
        fontSize:18,
        color: "#009387",
        height:50,
        paddingBottom:10
  },
  textInput: {
        flex:1,
        paddingLeft: 12,
        fontSize:18,
        color: "#009387",
        height:50,
    },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  iconStyle:{
    textAlignVertical:'center',
    paddingRight:5
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:20,
    // flex:1,
  },
  bodyContent: {
    // flex: 1,
    // alignItems: 'center',
    padding:30,
  },
  label:{
        color:'grey',
        textAlign:'left'
    },
  info:{
    fontSize:25,
    color: "#009387",
    flexDirection:'row',
    alignItems:'center',
    marginTop:2,
    marginBottom:10,
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContent:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center'
  },
  buttonContainer: {
    // marginTop:5,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#009387",
  },
  updateButtonText:{
      fontSize:20,
      color:'white'
  }
});

export default styles;