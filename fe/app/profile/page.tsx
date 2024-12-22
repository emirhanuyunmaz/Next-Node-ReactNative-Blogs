'use client'
import { DatePicker } from "@/components/DatePicker";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/lib/store/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),

    lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters.",
    }),

    email: z.string(),

  })


export default function Page(){
    const {toast} = useToast()
    const userProfile = useGetUserProfileQuery("")
    const [updateProfile,setUpdateProfile] = useUpdateUserProfileMutation() 
    // console.log("DD:",userProfile.data?.data,userProfile.isSuccess);
    const [image,setImage] = useState(userProfile.isSuccess ?userProfile.data?.data.profileImage : "/images/default_user.jpg")
    const [birthDay,setBirthDay] = useState<Date>()
    const [address,setAddress] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: userProfile.isSuccess ? userProfile.data?.data.firstName : "",
            lastName: userProfile.isSuccess ? userProfile.data?.data.lastName : "",
            email:userProfile.isSuccess ? userProfile.data?.data.email : "",
        },
    })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const body = {
            ...values,
            birthDay:birthDay,
            address:address,
        }
        // console.log("OnSubmit",values);
        await updateProfile(body).unwrap().then(() => {
            toast({
                title:"Update Succes",
                variant:"default"
            })
        }).catch((err) => {
            console.log("ERR:",err);
            
            toast({
                title:"ERROR ",
                variant:"destructive"
            })
        })
    }

    useLayoutEffect(() => {
        if(userProfile.isSuccess){
            form.setValue("firstName",userProfile.data?.data.firstName)
            form.setValue("lastName",userProfile.data?.data.lastName)
            form.setValue("email",userProfile.data?.data.email)
            setImage(userProfile.data?.data.profileImage)
            setAddress(userProfile.data?.data.address)
            setBirthDay(userProfile.data?.data.birthDay)
        }
    },[userProfile.isSuccess,userProfile.error,userProfile.isFetching])


    return(<div className="min-h-[85vh] max-w-5xl mx-auto">
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <div className="relative w-32 h-32 rounded-full hover:shadow-2xl cursor-pointer transition-all">
                    <Image loader={() => `${image}`} src={`${image}`} layout="fill"  alt="User Images" className="rounded-full" />
                    <Camera className="absolute bottom-0 -right-3" />
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
                            <Input disabled placeholder="Email" {...field} className="w-full border-black" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex gap-3">
                        <DatePicker date={birthDay as Date} setDate={setBirthDay} title={`Birth Day`} />
                        <Input onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address" className="border-primary" />
                    </div>
                
                <Button className="" type="submit">Update</Button>
            </form>
            </Form>
 

                    </div>
    </div>)
}
