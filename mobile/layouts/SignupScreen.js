import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'


export default function SignupScreen({navigation}) {
    function LoginOnClick(){
        // Önceki sayfaları temizler.
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
    }
  return (
    <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.headerStyle}>Signup</Text>

            <View style={styles.userNameSurnamContainer}>
                <View style={{flex:0.5}}>
                    <Text style={styles.labelStyle}>Name</Text>
                    <TextInput style={styles.inputStyle} placeholder='Name'/>
                </View>
                
                <View style={{flex:0.5}}>
                    <Text style={styles.labelStyle}>Surname</Text>
                    <TextInput style={styles.inputStyle} placeholder='Email'/>
                </View>
            </View>            

            <Text style={styles.labelStyle}>Email</Text>
            <TextInput style={styles.inputStyle} placeholder='Email'/>
            
            <Text style={styles.labelStyle}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.inputStyle} placeholder='Password'/>
            
            <Text style={styles.labelStyle}>Password Again</Text>
            <TextInput secureTextEntry={true} style={styles.inputStyle} placeholder='Password Again'/>
            
            <Button color={"black"} title='Login'/>
            <View style={styles.signupViewStyle}>
                <Text style={styles.signupTextStyle}>Have an account ?  </Text>
                <TouchableOpacity onPress={LoginOnClick}>
                    <Text style={styles.signupButtonStyle}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.orTextStyle}>or</Text>
        </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        marginHorizontal:16,
        gap:10,
        
    },
    headerStyle:{
        position:"absolute",
        top:32,
        alignSelf:"center",
        fontSize:32,
        fontWeight:"700",
        opacity:0.7
    },
    userNameSurnamContainer:{
        flexDirection:"row",
        gap:10
    },
    labelStyle:{
        fontWeight:"700",
        paddingStart:3,
    },
    inputStyle:{
        paddingHorizontal:10,
        borderWidth:2,
        borderRadius:10,
    },
    buttonStyle:{
        backgroundColor:"#4C585B"
    },
    signupViewStyle:{
        flexDirection:"row",
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center",
        
    },
    signupTextStyle:{
        fontWeight:"400",
        fontSize:18
    },
    signupButtonStyle:{
        fontWeight:"700",
        fontSize:18
    },
    orTextStyle:{
        textAlign:"center",
        fontSize:18,
        fontWeight:"700"
    }
});