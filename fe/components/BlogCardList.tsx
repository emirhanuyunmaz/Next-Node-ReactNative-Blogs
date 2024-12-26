'use client'
import { useGetUserBlogsQuery } from "@/lib/store/blog/blogApi";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";

interface model{
    title:String
}

export default function BlogCardList({title}:model){
    const getUserBlogList = useGetUserBlogsQuery("")
    const [data,setData] = useState([])
    
    console.log(getUserBlogList.data);
    
    useEffect(() => {
        if(getUserBlogList.isSuccess){
            setData(getUserBlogList.data.data)
        }

    },[getUserBlogList.isSuccess,getUserBlogList.isError,getUserBlogList.isFetching])



    return(<div className="mt-5 ">
            <h2 className="font-bold text-2xl text-gray-800 ">Latest Post</h2>
        <div className="flex flex-wrap gap-8 justify-center mt-5">

            {
                getUserBlogList.isSuccess && data.map((item:any) => <BlogCard {...item} key={item._id} />)
            }
            

        </div>
    </div>)
}