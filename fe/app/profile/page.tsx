'use client'
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useGetUserProfileQuery } from "@/lib/store/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),

    lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters.",
    }),

    email: z.string().min(5, {
        message: "Email must be at least 5 characters.",
    }),

    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
  })


export default function Page(){

    const userProfile = useGetUserProfileQuery("")
    console.log(userProfile);
    
    const [passwordVisible,setPasswordVisible] =useState(false)
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email:"",
          password: "",
        },
      })
     
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
            
        
      }


    return(<div className="min-h-[85vh] max-w-5xl mx-auto">
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <div className="relative w-32 h-32 rounded-full hover:shadow-2xl cursor-pointer transition-all">
                    <Image loader={() => "https://picsum.photos/seed/picsum/1200/800"} src={"https://picsum.photos/seed/picsum/1200/800"} layout="fill"  alt="User Images" className="rounded-full" />
                    <Camera className="absolute bottom-0 -right-3" />
                </div>
                <div className="flex flex-col justify-center">
                    <p>User Name</p>
                    <p>user@gmail.com</p>
                </div>
            </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-2 gap-3  ">
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="First Name" {...field} className="w-full border-black" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Last Name" {...field} className="w-full border-black" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} className="w-full border-black" />
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
                            <div className="flex items-center border rounded-md border-black px-1">
                                <Input placeholder="Password" type={`${!passwordVisible && "password"}`} {...field} className="w-full border-none" />
                                {
                                    passwordVisible ? <button onClick={(e) => {e.preventDefault();setPasswordVisible(false)}} ><EyeOff size={24} /></button> :<button onClick={(e) => {e.preventDefault();setPasswordVisible(true)}} ><Eye size={24} /></button>
                                }
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    

                <Button className="" type="submit">Update</Button>
            </form>
            </Form>
 

                    </div>
    </div>)
}
