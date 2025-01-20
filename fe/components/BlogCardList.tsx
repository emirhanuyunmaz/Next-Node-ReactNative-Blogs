'use client'
import { useGetAllBlogQuery } from "@/lib/store/blog/blogApi";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";

export default function BlogCardList(){
    const getAllBlog = useGetAllBlogQuery("")
    const [data,setData] = useState([])
    
    console.log(getAllBlog.data);
    
    useEffect(() => {
        if(getAllBlog.isSuccess){
            setData(getAllBlog.data.data)
        }

    },[getAllBlog.isSuccess,getAllBlog.isError,getAllBlog.isFetching])



    return(<div className="mt-5 ">
            <h2 className="font-bold text-2xl text-gray-800 ">Latest Post</h2>
        <div className="flex flex-wrap gap-8 justify-center mt-5">

            {
                getAllBlog.isSuccess && data.map((item:any) => <BlogCard {...item} key={item._id} />)
            }
            

        </div>
    </div>)
}