'use client'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetFooterDataQuery, useUpdateFooterMutation } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";


export default function Page(){
    const getFooterData = useGetFooterDataQuery("")
    const [updateFooter,resUpdateFooter] = useUpdateFooterMutation()
    const [footerText,setFooterText] = useState("")

    async function updateFooterOnClick(){
        const body={
            text:footerText
        }
        await updateFooter(body)
    }

    useEffect(() => {
        if(getFooterData.isSuccess && getFooterData.data.data){
            setFooterText(getFooterData.data.data.text)
        }
    },[getFooterData.isFetching])

    return (<div>
        <div className="w-[91%] mx-auto ">
            <h1 className="text-xl font-bold" >Footer</h1>
        </div>

        <div className="w-[91%] mx-auto mt-3">
            <Textarea value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="Footer About Text" className="border-primary " />
            <div className="flex justify-end mt-3">
                <Button onClick={updateFooterOnClick} className="">Update Data</Button>
            </div>
        </div>
    </div>)
}