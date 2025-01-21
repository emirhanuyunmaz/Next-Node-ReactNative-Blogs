'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAdminLoginMutation } from "@/lib/store/admin/adminApi";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
    const {toast} = useToast()
    const router = useRouter()
    const [adminLogin,resAdminLogin] = useAdminLoginMutation()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    async function adminLoginOnClick(){
        const body = {
            email:email,
            password:password
        }
        await adminLogin(body).unwrap()
        .then((res) => {
            toast({
                title:"Succes"
            })
            // console.log("AAAAAAAAAAAAAAAAAAA::::::",res);
            setCookie("access_token",res.access_token)
            setCookie("refresh_token",res.refresh_token)
            // router.push("/admin/home")
            location.reload()
        }).catch((err) => {
            console.log(err);
            toast({
                title:"ERROR"
            })
            
        })
    }

    return(<div className="min-h-[85vh] max-w-7xl mx-auto flex flex-col justify-center items-center gap-3">
        <h2 className="text-2xl font-bold">Admin Login</h2>
        <div className="w-1/3 flex flex-col gap-3">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border-primary" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border-primary"/>
            <Button onClick={adminLoginOnClick}>Login</Button>
        </div>

    </div>)
}