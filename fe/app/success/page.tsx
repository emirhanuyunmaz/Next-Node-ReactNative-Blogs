'use client'

import { useCheckPaymentMutation } from "@/lib/store/user/userApi";
import { Check } from "lucide-react";
import {useSearchParams } from "next/navigation"
import { useEffect } from "react";

export default function Page(){
    const search = useSearchParams()
    const session_id = search.get("session_id")
    // console.log("SSSSS:",session_id);
    const [checkPayment,resCheckPayment] = useCheckPaymentMutation()


    async function paymentControl(){
        const body = {
            session_id : session_id
        }
        const res = await checkPayment(body) 
    } 

    useEffect(() => {
        paymentControl()
    },[])

    return(<div className="min-h-[81vh] max-w-7xl mx-auto flex items-center">
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center bg-green-400 px-32 py-32 rounded-xl gap-8">
                <div className="p-8 bg-white rounded-full shadow-2xl">
                    <Check size={52}  color="green"/>
                </div>
                <h2 className="text-white text-3xl">Success</h2>
            </div>
        </div>
    </div>)
}