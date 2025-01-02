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
import { toast } from "@/hooks/use-toast";
import { useAddUserMutation } from "@/lib/store/admin/adminApi";
import { getBase64 } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    birthDay: z.string(),
    address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
})

export default function Page(){
    const router = useRouter()
    const [addUser,resAddUser] = useAddUserMutation()

    const [firstName,setFirstName] = useState<String>("")
    const [lastName,setLastName] = useState<String>("")
    const [email,setEmail] = useState<String>("")
    const [password,setPassword] = useState<String>("")
    const [profileImage,setProfileImage] = useState<String>("")
    const [birthDay,setBirthDay] = useState<Date | undefined>()
    const [isGoogle,setIsGoogle] = useState<boolean>(false)
    const [address,setAddress] = useState<String>("")


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          birthDay: "",
          address: "",
        },
      })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        await addUser(values).unwrap().then(() => {
            toast({
                title:"User Add Succes"
            })
            router.push("/admin/home/users/")
        })
    }

    async function uploadImage(e:any){
        const file = e.target.files[0]
        const base64Image = await getBase64(file) as string
        setProfileImage(base64Image)
    }

    async function addUserHandleClick(){
        const body = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            profileImage:profileImage,
            birthDay:birthDay,
            isGoogle:false,
            address:address
        }
        await addUser(body).unwrap().then(() => {
            toast({
                title:"User Add Succes"
            })
            router.push("/admin/home/users/")
        })

    }

    return(<div>
        <div className="w-[91%] mx-10 flex gap-3">
        <div>
            <div className="w-52 h-52 border-2">
                <img className="w-full h-full" src={profileImage ? profileImage as string:`/images/default_user.jpg`} />
            </div>
            <div className="flex justify-center mt-3">
                <label className="p-2 border border-primary rounded-xl hover:opacity-80 cursor-pointer " htmlFor="updateUserProfileImage"><ImageUp /></label>
                <input onChange={(e:any) => uploadImage(e)} id="updateUserProfileImage" hidden type="file" />
            </div>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-full ">
            <div className="flex gap-3 w-full">
                <FormField
                control={form.control}
                name="firstName"
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
                <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Last Name" {...field} />
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
                    <FormItem className="w-full">
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
                        <Input placeholder="Passaword" {...field} />
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
                    <FormItem className="w-full">
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
                    <FormItem className="w-full">
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
    </div>)
}