import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetUserProfileQuery } from '../lib/store/user/userApi'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({

  firstName: z.string().min(2, { message: "First Name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last Name must be at least 2 characters long" }),
  email: z.string().min(2, { message: "Email must be at least 2 characters long" }),
  password: z.string().min(2,{message : "Password min 3"}),
});


export default function ProfileScreen() {
  const userProfile = useGetUserProfileQuery()
  const [data,setData] = useState(null)

  
  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
      console.log(data);
      
  };

  useEffect(() => {
    if(userProfile.isSuccess){
      console.log("ASDSAASDASDAS:D:",userProfile.data.data);
      setData(userProfile.data.data)
      console.log(`http://192.168.1.22:8000/${data?.profileImage}`);
      
    }
  },[userProfile.isFetching])

  return (
    <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.headerStyle}>Profile</Text>
                <Image style={styles.imageStyle} source={{uri:`http://192.168.1.22:8000/${data?.profileImage}`}} />
                <View style={styles.userNameSurnamContainer}>
                    <View style={{flex:0.5}}>
                        <Text style={styles.labelStyle}>Name</Text>
                        <TextInput style={styles.inputStyle} placeholder='firstName'/>
                    </View>
                    
                    <View style={{flex:0.5}}>
                        <Text style={styles.labelStyle}>Surname</Text>
                        <TextInput style={styles.inputStyle} placeholder='lastName'/>
                    </View>
                </View>            
    
                <Text style={styles.labelStyle}>Email</Text>
                <TextInput editable={false} selectTextOnFocus={false} style={styles.inputStyle} placeholder='Email'/>
                
                <Text style={styles.labelStyle}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.inputStyle} placeholder='Password'/>

                <TouchableOpacity onPress={() => console.log("CLick")}>
                    <Text style={styles.updateButtonStyle}>Update</Text>
                </TouchableOpacity>

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
  updateButtonStyle:{
      fontWeight:"700",
      fontSize:18,
      backgroundColor:"black",
      color:"white",
      paddingVertical:10,
      textAlign:"center",
      borderRadius:10
  },
  orTextStyle:{
      textAlign:"center",
      fontSize:18,
      fontWeight:"700"
  },
  imageStyle:{
        width:220,
        height:220,
        marginHorizontal:"auto",
        borderWidth:2,
        borderColor:"gray",
        borderRadius:10,
        resizeMode:"stretch",
      },
});
// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     marginTop:52,
//     marginHorizontal:16
//   },
//   imageStyle:{
//     width:220,
//     height:220,
//     marginHorizontal:"auto",
//     borderWidth:2,
//     borderColor:"gray",
//     borderRadius:10,
//     resizeMode:"stretch",
//   },
//   updateButtonStyle:{
//     paddingHorizontal:10,
//     paddingVertical:10,
//     backgroundColor:"black",
//     color:"white",
//     textAlign:"center",
//     borderRadius:10
//   },
// })