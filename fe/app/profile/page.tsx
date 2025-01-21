'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useGetUserProfileQuery, useUpdateUserProfileImageMutation, useUpdateUserProfileMutation } from "@/lib/store/user/userApi";
import { cn, getBase64 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns";
import { CalendarIcon, Camera, Check } from "lucide-react";
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

    address:z.string().optional(),

    birthDay:z.date().optional(),

  })


export default function Page(){
    const {toast} = useToast()
    const userProfile = useGetUserProfileQuery("")
    const [updateProfile,setUpdateProfile] = useUpdateUserProfileMutation() 
    const [uploadImage,resUploadImage] = useUpdateUserProfileImageMutation()
    const [isPremium,setIsPremium] = useState(false)

    const [image,setImage] = useState("/images/default_user.jpg")
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName:  "",
            lastName:  "",
            email: "",
            address: "",
            birthDay: new Date(Date.now()) ,
        },
    })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // console.log("OnSubmit",values);
        await updateProfile(values).unwrap().then(() => {
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

    async function uploadImageOnClick(e:any){
        const file = e.target.files[0]
        const image = await getBase64(file)
        console.log("RESİM BİLGİSİ :",image);
        const body = {
            image:image
        }
        await uploadImage(body)
    } 

    useLayoutEffect(() => {
        if(userProfile.isSuccess){
            form.setValue("firstName",userProfile.data?.data?.firstName)
            form.setValue("lastName",userProfile.data?.data?.lastName)
            form.setValue("email",userProfile.data?.data?.email)
            form.setValue("address",userProfile.data?.data?.address)
            form.setValue("birthDay",userProfile.data?.data?.birthDay)
            setImage(userProfile.data?.data?.profileImage ? userProfile.data?.data?.profileImage : "")
            setIsPremium(userProfile.data?.data?.isPremium)
        }
    },[userProfile.isFetching])


    return(<div className="min-h-[85vh] max-w-5xl mx-auto">
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <label htmlFor="userProfileImage" className="relative w-32 h-32 rounded-full hover:shadow-2xl cursor-pointer transition-all">
                    <img src={`${image ? image : "/images/default_user.jpg"}`}  alt="User Images" className="rounded-full w-full h-full" />
                    <Camera className="absolute bottom-0 -right-3" />
                </label>
                <input onChange={(e) => uploadImageOnClick(e)} hidden id="userProfileImage" type="file" />
                {isPremium && <div className="ms-auto bg-green-400 flex mb-auto p-3 text-white rounded-full">
                    Premium <Check/>
                </div>}
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

                <FormField
                    control={form.control}
                    name="birthDay"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Birth Day</FormLabel>
                        <Popover>
                    <PopoverTrigger asChild>
                  <FormControl className="border-primary">
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="address"
                    
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Address" {...field} className="w-full border-black" />
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
