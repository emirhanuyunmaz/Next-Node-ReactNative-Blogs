'use client'
import { BlogsTable } from "@/components/admin/BlogsTable";
import { useGetAllBlogsQuery } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";

export default function Blogs(){
    const getBlogList = useGetAllBlogsQuery("")
    const [data,setData] = useState<any>([])

    useEffect(() => {
        if(getBlogList.isSuccess){
            console.log(getBlogList.data.data);
            setData(getBlogList.data.data)
        }
    },[getBlogList.isFetching])

    return (<div>
        <h1 className="text-xl font-bold ms-10" >Blogs</h1>
        <div className="w-[91%] px-10">
            <BlogsTable data={data}/>
            
        </div>
    </div>)
}