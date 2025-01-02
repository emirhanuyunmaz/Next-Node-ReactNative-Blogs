'use client'
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleUserQuery, useUpdateUserMutation, useUpdateUserProfileImageMutation } from "@/lib/store/admin/adminApi";
import { getBase64 } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "First Name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "First Name must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "First Name must be at least 2 characters.",
    }),
    birthDay: z.string().optional(),
    address:z.string().min(2, {
        message: "First Name must be at least 2 characters.",
    }),
})

export default function Page(){
    const {id} = useParams()
    // console.log(id);
    const getSingleUser = useGetSingleUserQuery(id)
    const [updateUser,resUpdateUser] = useUpdateUserMutation()
    const [updateUserProfileImage,resUpdateUserProfileImage] = useUpdateUserProfileImageMutation()

    const [data,setData] = useState<any | undefined>()
    const [profileImage,setProfileImage] = useState<String>()
    const [isGoogle,setIsGoogle] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address:"",
          birthDay:""
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // await updateUser(body)

        console.log(values)
      }

    async function UpdateUserHandleClick(){
        // const body = {
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     birthDay,
        //     address,
        //     id
        // }
        // await updateUser(body)
    }

    async function UpdateUserProfileImageOnClick(e:any){
        const file = e.target.files[0]
        const base64Image = await getBase64(file)
        const body ={
            id:id,
            image:base64Image
        }  
        updateUserProfileImage(body)

    }

    useEffect(() => {
        if(getSingleUser.isSuccess){
            console.log(getSingleUser.data);
            setProfileImage(getSingleUser.data.data.profileImage)
            setIsGoogle(getSingleUser.data.data.isGoogle)
            form.setValue("firstName",getSingleUser.data.data.firstName)
            form.setValue("lastName",getSingleUser.data.data.lastName)
            form.setValue("address",getSingleUser.data.data.address)
            form.setValue("email",getSingleUser.data.data.email)
            form.setValue("password",getSingleUser.data.data.password)
            form.setValue("birthDay",getSingleUser.data.data.birthDay)

        }
    },[getSingleUser.isFetching])
    
    return(<div>
        <div className="w-[91%] mx-10 flex gap-3">

            <div>
                <div className="w-52 h-52 border-2">
                    <img className="w-full h-full" src={profileImage ? `${profileImage}` : "/images/default_user.jpg"} />
                </div>
                <div className="flex justify-center mt-3">
                    <label className="p-2 border border-primary rounded-xl hover:opacity-80 cursor-pointer " htmlFor="updateUserProfileImage"><ImageUp /></label>
                    <input onChange={(e) => UpdateUserProfileImageOnClick(e)} id="updateUserProfileImage" hidden type="file" />
                </div>
            </div>

                    <div className="w-full flex flex-col gap-3">
                    <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-3">

                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem  className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="flex gap-3">

                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem  className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="flex gap-3">

                    <FormField
                    control={form.control}
                    name="birthDay"
                    render={({ field }) => (
                        <FormItem  className="w-full">
                        <FormLabel>Birth Day</FormLabel>
                        <FormControl>
                            <Input placeholder="Birth Day" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="flex gap-3">
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem  className="w-full">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
            </Form>
                
            </div>

        </div>
    </div>)
} 