import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect,  useState } from 'react'
import { useGetSingleBlogQuery } from '../lib/store/blog/blogApi';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

export default function BlogDetailScreen() {
    const { width } = useWindowDimensions();

    const route = useRoute()  
    console.log(route.params?.slug); //Gönderilen verinin alıması işlemi.
    const slug = route.params?.slug
  
    const getSingleBlog = useGetSingleBlogQuery(slug);
    const [data,setData] = useState(null);
    
    useEffect(() => {
        if(getSingleBlog.isSuccess){
          // console.log("DATA::::",getSingleBlog.data.data);
          setData(getSingleBlog.data.data);
          console.log("DATA:",data);
            
        }
    },[getSingleBlog.isFetching])

    const source = {
      html: `
    <h1 style='text-align:center;'>
      Hello World!
    </h1>`
    };
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={{uri:`http://192.168.1.22:8000/${data?.image}`}} />
      <Text style={styles.titleStyle}>
          {data?.title ? data?.title : ""}    
      </Text>
  {/* {data == null && <Text>DATA YOK</Text>}
  {data != null && <Text>{data.blogText}</Text>} */}
  {data != null && data.blogText != null && <RenderHtml
      contentWidth={width}
      source={{html:data.blogText}}
    />}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:10,
    paddingHorizontal:20,
    paddingBottom:50
  },
  imageStyle:{
    width:"100%",
    height:240,
    borderRadius:10
  },
  titleStyle:{
    fontWeight:"700",
    fontSize:24,
    marginTop:5
  }
})