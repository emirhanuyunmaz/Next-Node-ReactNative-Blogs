'use client'
import BlogCard from "@/components/BlogCard"
import { useGetCategoryBlogsQuery } from "@/lib/store/blog/blogApi"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function Page(){
    const {name} = useParams()
    const getCategoryBlogs = useGetCategoryBlogsQuery(name)
    const [blogList,setBlogList] = useState([])
    // console.log(name);
    
    useEffect(() => {
        if(getCategoryBlogs.isSuccess){
            console.log(getCategoryBlogs.data.data);
            setBlogList(getCategoryBlogs.data.data)
        }
    },[getCategoryBlogs.isFetching])
    
    
    return(<div className="min-h-[85vh] max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-3">{name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-3">
            
            {
                blogList.map((item:any) => <BlogCard key={item._id} {...item} />)
            }

        </div>

    </div>)
}