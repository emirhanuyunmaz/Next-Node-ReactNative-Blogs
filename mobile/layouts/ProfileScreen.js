import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useGetUserProfileQuery, useUpdateUserProfileImageMutation, useUpdateUserProfileMutation } from '../lib/store/user/userApi'
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from "expo-image-picker"

const schema = z.object({

  firstName: z.string().min(2, { message: "First Name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last Name must be at least 2 characters long" }),
  password: z.string().min(2,{message : "Password min 3"}),
});


export default function ProfileScreen() {

  const userProfile = useGetUserProfileQuery("")
  const [updateProfile,resUpdateProfile] = useUpdateUserProfileMutation()
  const [updateProfileImage,resUpdateProfileImage] = useUpdateUserProfileImageMutation()
  const [data,setData] = useState(null)
  const [email,setEmail] = useState("")
  const [selectImage,setSelectImage] = useState(undefined)

  
  const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });

    async function updateProfileImageOnClick(){
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
            alert('Fotoğraf galerisine erişim izni verilmedi!');
        return;
      }

      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        // allowsEditing:true,
        // aspect:[1,1],
        quality:1,
        base64:true
      })

        if(res.canceled){
            console.log("CANCELL",res.assets[0]);  
        }else{
            console.log("res.assets[0].base64:::",res.assets[0].base64);
            const body = {
              image:res.assets[0].base64
            }
            await updateProfileImage(body).unwrap()
            .then(() => {
              console.log("Başarı");
              
            }).catch(er => {
              console.log("HATA:",er);
              
            })
        }
    }

    const onSubmit = async (data) => {
      console.log(data);
      await updateProfile(data).unwrap()
      .then(() => {
        console.log(".Başarılı.");
        
      }).catch(er => {
        console.log("ER:",er);
        
      })
  };

  useLayoutEffect(() => {
    if(userProfile.isSuccess){
      console.log("ASDSAASDASDAS:D:",userProfile.data.data);
      setData(userProfile.data.data)
      setValue("firstName",userProfile.data.data.firstName)
      setValue("lastName",userProfile.data.data.lastName)
      setEmail(userProfile.data.data.email)
      setValue("password",userProfile.data.data.password)
      console.log(userProfile.data.data.password);
      
    }
  },[userProfile.isFetching])

  console.log(data?.profileImage);
  

  return (
    <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.headerStyle}>Profile</Text>
                <Image style={styles.imageStyle} source={{uri:`http://192.168.1.22:8000/${data?.profileImage}`}} />
                <TouchableOpacity onPress={updateProfileImageOnClick} style={{marginHorizontal:"auto"}} >
                    <Text style={styles.imageUpdateButtonStyle}>Image Update</Text>
                </TouchableOpacity>
                <View style={styles.userNameSurnamContainer}>
                    <View style={{flex:0.5}}>
                        <Text style={styles.labelStyle}>Name</Text>
                        <Controller
                          control={control}
                          name="firstName"
                          render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                              style={[styles.inputStyle,errors.password && styles.errorBorderStyle]}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              placeholder="Enter your first name"
                          />
                          )}
                        />
                        {errors.firstName && <Text style={styles.errorMessageStyle} >{errors.firstName.message}</Text>}
                    </View>
                    
                    <View style={{flex:0.5}}>
                        <Text style={styles.labelStyle}>Surname</Text>
                        <Controller
                          control={control}
                          name="lastName"
                          render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                              style={[styles.inputStyle,errors.password && styles.errorBorderStyle]}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              placeholder="Enter your last name"
                          />
                          )}
                        />
                        {errors.lastName && <Text style={styles.errorMessageStyle} >{errors.lastName.message}</Text>}
                    </View>
                </View>            
    
                <Text style={styles.labelStyle}>Email</Text>
                <TextInput editable={false} selectTextOnFocus={false} style={[styles.inputStyle,styles.emailStyle]} placeholder='Email' value={email}/>
                
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

                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
  imageUpdateButtonStyle:{
    backgroundColor:"black",
    color:"white",
    fontSize:16,
    marginHorizontal:"auto",
    paddingHorizontal:16,
    paddingVertical:6,
    borderRadius:10
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
  emailStyle:{
    backgroundColor:"gray"
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
  errorBorderStyle:{
    borderColor:"red"
  },
  errorMessageStyle:{
    color:"red"
  }
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