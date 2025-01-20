'use client'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useResetPasswordControlMutation } from "@/lib/store/auth/authApi"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
    code: z.string().min(5, {
        message: "Mail Password must be at least 5 characters.",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    passwordConfirm: z.string().min(5, {
        message: "Password Confirm must be at least 5 characters.",
    }),
}).refine((data) => data.password === data.passwordConfirm,{
    message: "Passwords don't match",
    path: ["passwordConfirm"],
})


export default function EnterNewPassword(){
    const {toast} = useToast()
    const router = useRouter()
    const [resetPasswordControl,resResetPasswordControl] = useResetPasswordControlMutation()
    const [timeOut,setTimeOut] = useState(false)
    const [timer, setTimer] = useState(120);
    let time = timer 
    
    useEffect(() => {
        
        if(timer > 0){
            const interval = setInterval(() => {
            if(timer<=0){
                
                clearInterval(interval)

            }
                setTimer(prev => {
                        if(prev <= 0){
                            clearInterval(interval)
                            setTimeOut(true)
                            return 0
                        }                    
                        return prev - 1
                });
            }, 1000);
        }
    },[])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code:"",
            password: "",
            passwordConfirm:"",
        },
    })
    

    function onSubmit(values: z.infer<typeof formSchema>) {
        const email = localStorage.getItem("email")
        console.log(values)
        const body = {
            ...values,
            email
        }
        resetPasswordControl(body)
        .then((e) => {
            console.log("EEEE::",e);
            
            if(e.error==null){
                console.log(e);
                router.push("/login")
                toast({
                    title:"SUCCES"
                })
            }else{
                toast({
                    title:"ERROR"
                })    
            }
        })
        .catch(() => {
            console.log("err");
            
            toast({
                title:"ERROR"
            })
        })
    }
    

    

    return(<>
        <div className="mt-3">
            <h2 className="text-4xl font-bold">Set a Password</h2>
            <p className="text-primary text-lg ">Your previous password has been reset. Please set a new password for you account.</p>
            <div className="flex justify-center">
                <p className="text-xl font-bold">{timer}</p>
            </div>
                
        </div>

        {timeOut && <div>
            <p className="text-3xl font-bold text-center">TIME OUT</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>}
        {!timeOut && <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Mail Password</FormLabel>
                <FormControl>
                    <Input placeholder="Mail Password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

        <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password Confirm</FormLabel>
                <FormControl>
                    <Input placeholder="Password Confirm" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className="w-full">Submit</Button>
            
        </form>
        </Form>}
</>)
}