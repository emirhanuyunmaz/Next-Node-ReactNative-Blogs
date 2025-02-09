import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

var width = Dimensions.get('window').width; //full width

export default function BlogCard({category,image,title,slug}) {
    const navigation = useNavigation();

    // console.log(category);
    // console.log(image);
    // console.log(title);
    // console.log(slug);
    

    function toBlogDetail(){
        navigation.navigate("BlogDetail",{slug:slug})
    }
    console.log(`${process.env.BASE_URL}/${image}`);
    

  return (
    <TouchableOpacity onPress={toBlogDetail} style={styles.container}>
        <Image style={styles.imageStyle} source={{uri:`http://192.168.1.22:8000/${image}`}} />
        <View style={styles.textContainerStyle}>
            {/* <Text>{category.name}</Text> */}
            <Text style={styles.textStyle}>{title}</Text>
        </View>
        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:width-20,
        // flexWrap:"wrap",
        flexDirection:"row",
        // alignItems:"center",
        gap:10,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:10,
        marginBottom:10
    },
    textContainerStyle:{
        flexDirection:"column",
        flexShrink:1},
    textStyle:{
        fontSize:20,
        fontWeight:"600",

        flexShrink:1, // Yazının taşmasını engelledi.
    },
    imageStyle:{
        width:120,
        height:120,
        borderRadius:10
    },
    userContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:6
    },
})