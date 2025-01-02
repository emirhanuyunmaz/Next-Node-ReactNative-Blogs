'use client'
import MyBlogCard from "@/components/MyBlogCard";
import { useGetUserBlogsQuery } from "@/lib/store/blog/blogApi";
import { useEffect, useState } from "react";

export default function Page(){
    const getUserBlogList = useGetUserBlogsQuery("")
    const [data,setData] = useState([])

    console.log(getUserBlogList.data);
    
    useEffect(() => {
        if(getUserBlogList.isSuccess){
            setData(getUserBlogList.data.data)
        }

    },[getUserBlogList.isSuccess,getUserBlogList.isError,getUserBlogList.isFetching])


    return (<div className="min-h-[85vh] max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold md:ms-8">My Blogs</h2>
        <div className="flex flex-wrap justify-center  items-center gap-3 mt-3 mx-auto">
            
            {
                data.map((item:any) => <MyBlogCard {...item} key={item._id}/>)
            }
            
        </div>

    </div>)
}