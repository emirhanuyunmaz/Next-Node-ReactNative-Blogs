'use client'
import EnterEmail from "@/components/resetPassword/EnterEmail";
import EnterNewPassword from "@/components/resetPassword/EnterNewPassword";
import Image from "next/image";
import { useState } from "react";

export default function Page(){
    const [changeLayout,setChangeLayout] = useState(0)

    return(<div className="max-w-7xl min-h-[85vh] mx-auto flex gap-3 ">
        
        <div className="w-1/2 flex flex-col gap-10 ">
            {changeLayout == 0 && <EnterEmail setChangeLayout={setChangeLayout}/>}
            {changeLayout == 1 && <EnterNewPassword/>}
        </div>

        <div className="relative w-1/2 ">
            <Image src={`/images/resetPassword.png`} alt="Reset Password Image" layout="fill" />
        </div>

    </div>)
}