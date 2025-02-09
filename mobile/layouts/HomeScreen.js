import React, { useLayoutEffect, useState } from 'react'
import {AsyncStorage, View,  StyleSheet, Text, FlatList, ScrollView, RefreshControl } from 'react-native'
import BlogCard from '../components/BlogCard'
import { useGetAllBlogQuery } from '../lib/store/blog/blogApi'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    const [blogData,setBlogData] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const getAllBlog = useGetAllBlogQuery()

    async function deneme(){
        const data = await AsyncStorage.getItem("access_token")
        // console.log("ASDSDA:",data);
        
    }
    async function onRefresh(){
        getAllBlog.refetch()
    }
    
    useLayoutEffect(() => {
        deneme()
    },[])
    
    useLayoutEffect(() => {
        if(getAllBlog.isSuccess){
            
            console.log("BASE URL:",process.env.BASE_URL);
            setBlogData(getAllBlog.data.data)
        }
    },[getAllBlog.isFetching])

  return (
    <SafeAreaProvider>
        <SafeAreaView >
            <ScrollView  contentContainerStyle={styles.scrollView}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerStyle} >Blogs</Text>
                    </View>
                    <FlatList  
                        data={blogData}
                        renderItem={({item}) => <BlogCard {...item}/>}
                        keyExtractor={item => item._id}
                        />
                </View>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:10,
        marginVertical:20,
        flexWrap:"wrap"
    },
    headerContainer:{
        paddingVertical:20
    },
    headerStyle:{
        fontSize:40,
        fontWeight:"600",
        color:"#4C585B"
    }
})