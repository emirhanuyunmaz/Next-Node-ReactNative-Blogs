'use client'
import { DashboardTable } from "@/components/admin/DashboardTable";
import { useGetDashboardQuery } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";


export default function Page(){
    const getDashboard = useGetDashboardQuery("")
    const [dashboardData,setDashboardData] = useState([])
    useEffect(() => {
        if(getDashboard.isSuccess){
            console.log(getDashboard.data);
            setDashboardData(getDashboard.data.data)
        }
    },[getDashboard.isFetching])

    return(<div>
        <h1 className="text-xl font-bold ms-10">Dashboard</h1>
        <div className="w-[91%] px-10">
            <DashboardTable data={dashboardData}/>
        </div>
    </div>)
}