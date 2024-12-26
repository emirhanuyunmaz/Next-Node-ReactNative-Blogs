'use client'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { useGetCategoriesQuery } from "@/lib/store/blog/blogApi"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function NavigationCategory(){
    const getCategories = useGetCategoriesQuery("")
    const [categories,setCategories] = useState([])
    useEffect(() => {
        if(getCategories.isSuccess){
            setCategories(getCategories.data.data)
        }
    },[getCategories.isFetching])

    return(<div className="flex ">
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger>Category</NavigationMenuTrigger>
            <NavigationMenuContent>
                {
                    categories.map((item:any) =><NavigationMenuLink key={item._id} href={`/category/${item.slug}`} >
                    <p className="hover:underline transition-all">
                        {item.name}
                    </p>
                
                </NavigationMenuLink> )
                }


                
            </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    </div>)
}