import { View, Text,TextInput, StyleSheet,  TouchableOpacity } from 'react-native'
import React from 'react'
import { useLoginMutation } from '../lib/store/auth/authApi'

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Zod schema for form validation
const schema = z.object({
  email: z.string().min(2, { message: "Email must be at least 2 characters long" }),
  password: z.string().min(2,{message : "Password min 3"}),
});

export default function LoginScreen() {
    const navigation = useNavigation()
    const [login,resLogin] = useLoginMutation()
    
    

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });
    
    const onSubmit = async (data) => {
        console.log(data);
        await login(data).unwrap().then(async (res) => {
            // console.log("RESSR:",res);
            await AsyncStorage.setItem("access_token",res.access_token)
            navigation.navigate("Tab")

        })
    };


    function SignupOnClick(){
        navigation.navigate("Signup")
    }

  return (
    <View style={styles.container}>
        <Text style={styles.headerStyle}>Login</Text>
        <Text style={styles.labelStyle}>Email</Text>
        <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={[styles.inputStyle,errors.email && styles.errorBorderStyle]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your email"
            />
            )}
        />
      {errors.email && <Text style={styles.errorMessageStyle} >{errors.email.message}</Text>}
        <Text style={styles.labelStyle}>Password</Text>
        <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={[styles.inputStyle,errors.password && styles.errorBorderStyle]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your password"
            />
            )}
        />
      {errors.password && <Text style={styles.errorMessageStyle} >{errors.password.message}</Text>}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} ><Text style={styles.loginButtonStyle}>Login</Text></TouchableOpacity>
        <View style={styles.signupViewStyle}>
            <Text style={styles.signupTextStyle}>Don't have an account ?  </Text>
            <TouchableOpacity onPress={SignupOnClick}>
                <Text style={styles.signupButtonStyle}>Signup</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.orTextStyle}>or</Text>
    </View>
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
    },
    loginButtonStyle:{
        width:"100%",
        textAlign:"center",
        backgroundColor:"black",
        color:"white",
        paddingVertical:10,
        borderRadius:10
    },
    errorMessageStyle:{
        color:"red",
        fontWeight:"600"
    },
    errorBorderStyle:{
        borderColor:"red"
    }
});