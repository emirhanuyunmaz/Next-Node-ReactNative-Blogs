'use client'

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { NavbarSearchCard } from "./NavbarSearchCard";
import { useGetSearchBlogsQuery } from "@/lib/store/blog/blogApi";


export default function NavbarSearch(){

    const [searchText,setSearchText] = useState("")
    const [blogList,setBlogList] = useState([])
    const seachBlog = useGetSearchBlogsQuery(searchText)


    useEffect(() => {
        
        if(seachBlog.isSuccess){
            console.log("aSDDAS",seachBlog.data);
            setBlogList(seachBlog.data.data)
        }
    },[searchText,seachBlog.isFetching])


    return(<div className="flex gap-1">
        <div className=" relative">
            <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search" className="border-gray-400" />
            {
                searchText != ""  && <NavbarSearchCard data={blogList} setSearch={setSearchText} />
            }

        </div>
        <Button variant={`outline`} > <Search/> </Button>
    </div>)
}