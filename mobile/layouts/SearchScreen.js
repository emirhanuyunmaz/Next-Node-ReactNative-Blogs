import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react-native'
import { useGetSearchBlogsQuery } from '../lib/store/blog/blogApi'
import BlogCard from '../components/BlogCard'

export default function SearchScreen() {
  const [searchText,setSearchText] = useState("")
  const searchBlog = useGetSearchBlogsQuery(searchText)
  const [data,setData] = useState([])

  useEffect(() => {

    if(searchBlog.isSuccess && searchText != ""){
      setData(searchBlog.data.data)
      console.log(searchBlog.data.data);
    }
    if(searchText == ""){
      setData([])
    }
  },[searchText,searchBlog.isFetching])

  async function SearchOnClick(){
      if(searchText != ""){
        console.log("::AAA::");
        
        searchBlog.refetch(searchText)
        setData(searchBlog.data.data)
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTextStyle}>
        Search
      </Text>
      <View style={styles.inputContainerStyle} >
        <TextInput onChangeText={(e) =>setSearchText(e)} value={searchText} style={styles.searchInputStyle} placeholder='Search'/>
        <TouchableOpacity onPress={SearchOnClick} style={styles.searchButtonStyle}>
          <Search  width={30} height={30} color={"black"} />
        </TouchableOpacity>
      </View>
      {data.length > 0 && <View style={styles.listContainer}><FlatList 
        data={data}
        renderItem={({item}) => <BlogCard {...item}/>}
        keyExtractor={item => item._id}
      /></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingVertical:30,
  },

  headerTextStyle:{
    fontSize:30,
    fontWeight:"700",
    textAlign:"center",

  },

  inputContainerStyle:{
    marginHorizontal:10,
    flexDirection:"row",
    gap:5,
    justifyContent:"center",
    paddingBottom:32

  },

  searchInputStyle:{
    backgroundColor:"white",
    paddingHorizontal:16,
    borderRadius:10,
    width:"80%",
  },
  searchButtonStyle:{
    backgroundColor:"white",
    // padding:5,
    width:"10%",
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10
  },
  listContainer:{
    paddingHorizontal:10
  }

})