'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useLoginMutation, useSignupMutation } from "@/lib/store/auth/authApi";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/token/tokenControl";

const formSchema = z.object({
    email: z.string().min(5, {
      message: "Email must be at least 5 characters.",
    }),
    password:z.string().min(5,{
        message:"Password must be at least 5 characters."
    }),
    remember:z.boolean()
})

interface googleModel{
    email:String,
    family_name:String,
    given_name:String,
    picture:String,
}


export default function Page(){
    const router = useRouter()
    const {toast} = useToast()
    const [login,loginResponse] = useLoginMutation()
    const [signup,signupResponse] = useSignupMutation()
    const [passwordVisible,setPasswordVisible] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:"",
            remember:false
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await login(values)
        console.log(loginResponse);
    }

    async function googleLogin(data:googleModel){
        console.log(data);
        const body = {
            firstName:data.given_name,
            lastName:data.family_name,
            email:data.email,
            profileImage:data.picture,
            isGoogle:true,
            password:""
        }
        await signup(body).unwrap()
        .then((payload) => {
            saveToken({access_token:payload.access_token,refresh_token:payload.refresh_token})
            router.push("/")
        }).catch((err) => {
            toast({
                title: "ERROR",
                description: "Login is error",
            })
        })

    }

    return(<div className="max-w-7xl min-h-[85vh] flex mx-auto">
        <div className="w-full mx-10 md:mx-0 md:w-1/2 flex flex-col justify-center">
            <div className="md:w-3/4 flex flex-col  gap-3 mb-10 md:mx-auto ">
                <h2 className="text-4xl font-bold">Login</h2>
                <p className="text-gray-600 ">Login to access your Blog account</p>
            </div>
            <div className="flex flex-col gap-3 md:w-3/4 md:mx-auto">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} className="border-primary" />
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
                            <div className="border border-primary rounded-md flex items-center px-1">
                                <Input placeholder="Password" type={`${!passwordVisible && "password"}`} className="rounded-md border-none" {...field}  />
                                {
                                    passwordVisible ? <button onClick={(e) => {e.preventDefault();setPasswordVisible(false)}} ><EyeOff size={24} /></button> :<button onClick={(e) => {e.preventDefault();setPasswordVisible(true)}} ><Eye size={24} /></button>
                                }
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem> 
                    )}
                    />
                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md   ">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="leading-none">
                                <FormLabel>
                                Remember me
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                        />

                        <Link href={`/resetPassword`} className="text-secondary hover:opacity-80 transition-all" >Forgot Password</Link>
                    </div>

                    <Button className="w-full" type="submit">Login</Button>
                </form>
                </Form>

                <div className="flex text-sm justify-center gap-2">
                    <p>
                        Don't have an account ?
                    </p>
                    <Link href={`/signup`} className="text-secondary hover:opacity-70 font-bold">Sign Up</Link>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <p>Or login with</p>
                </div>
                <div className="flex gap-3 mt-5 justify-center">
                    
                     <GoogleLogin
                     
                        onSuccess={credentialResponse => {
                            googleLogin(jwtDecode(credentialResponse.credential!));
                        }}
                        onError={() => {
                            console.log('Login Failed');
                            toast({
                                title: "ERROR",
                                description: "Login is error",
                            })
                        }}
                    />
                </div>
            </div>
        </div>


        <div className="md:w-1/2 flex justify-center">
        
            <div className="relative w-full h-full">
                <Image src={`/images/login.png`} alt="login page image" layout="fill" />
            </div>
        </div>

    </div>)
}