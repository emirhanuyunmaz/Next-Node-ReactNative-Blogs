'use client'
import { UserTable } from "@/components/admin/UserTable"
import { Button } from "@/components/ui/button"
import { useGetAllUserQuery } from "@/lib/store/admin/adminApi"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Page(){
    const getAllUser = useGetAllUserQuery("")
    const [data,setData] = useState<any>([])
    
    useEffect(() => {
        if(getAllUser.isSuccess){
            console.log(getAllUser.data.data);
            setData(getAllUser.data.data)
        }
    },[getAllUser.isFetching])

    return(<div>
        <div className="flex justify-between">
            <h1 className="text-xl font-bold ms-10">USERS</h1>
            <Link className="p-2 border-2 border-primary rounded-xl hover:opacity-80" href={`/admin/home/users/add`}>Add User</Link>
        </div>
        <div className="w-[91%] px-10">
             <UserTable data={data}/>
        </div>
    </div>)
}