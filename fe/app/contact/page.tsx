'use client'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";
import { useGetContactQuery } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";


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

    phoneNumber: z.string().min(2, {
        message: "Phone Number must be at least 2 characters.",
    }),

    message: z.string().min(2, {
        message: "Message must be at least 2 characters.",
    }),

  })

export default function Page(){
    const getContact= useGetContactQuery("")
    const [location ,setLocation ]= useState("")
    const [email,setEmail]= useState("")
    const [phoneNumber,setPhoneNumber]= useState("")

    const [twitterUrl,setTwitterUrl] = useState("")
    const [showTwitter,setShowTwitter] = useState(false) 
    
    const [instagramUrl,setInstagramUrl] = useState("")
    const [showInstagram,setShowInstagram] = useState(false)

    const [facebookUrl,setFacebookUrl] = useState("")
    const [showFacebook,setShowFacebook] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    useEffect(() => {
        if(getContact.isSuccess){
            if(getContact.data.data){
                setPhoneNumber(getContact.data.data.phoneNumber)
                setEmail(getContact.data.data.email)
                setLocation(getContact.data.data.location)

                setTwitterUrl(getContact.data.data.twitterUrl)
                setShowTwitter(getContact.data.data.twitterUrlShow)

                setInstagramUrl(getContact.data.data.instagramUrl)
                setShowInstagram(getContact.data.data.instagramUrlShow)
                
                setFacebookUrl(getContact.data.data.facebookUrl)
                setShowFacebook(getContact.data.data.facebookUrlShow)
            }
            
        }
    },[getContact.isFetching])


    return(<div className=" max-w-7xl min-h-[85vh] md:mx-auto flex flex-col mx-5 md:flex-row border-primary rounded-xl">
        
        <div className="md:w-1/3 min-h-[75vh] md:min-h-[100%] bg-black rounded-xl text-white px-3  flex flex-col justify-around">
            <div className="">
                <h2 className="text-4xl font-bold">Contact Information</h2>
                <p className="text-primary ms-3 text-xl">Say something to start a live chat !</p>
            </div>
            <div className="flex flex-col ms-3 gap-3">
                <div className="flex gap-5">
                    <p><Phone /></p>
                    <p>{phoneNumber}</p>
                </div>

                <div className="flex gap-5">
                    <p><Mail /></p>
                    <p>{email}</p>
                </div>

                <div className="flex gap-5">
                    <p><MapPin /></p>
                    <p>{location}</p>
                </div>
            </div>

            <div className="flex gap-5 ">
                {showTwitter && <div className="bg-gray-900 rounded-full p-2 hover:bg-primary transition-all">
                    <Link href={twitterUrl} ><Twitter/></Link>
                </div>}

                {showInstagram && <div className="bg-gray-900 rounded-full p-2 hover:bg-primary transition-all">
                    <Link href={instagramUrl} ><Instagram/></Link>
                </div>}

                {showFacebook && <div className="bg-gray-900 rounded-full p-2 hover:bg-primary transition-all">
                    <Link href={facebookUrl} ><Facebook/></Link>
                </div>}
            </div>
        </div>

        <div className="md:w-2/3 flex flex-col md:justify-center mt-5 md:mt-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 mx-3 gap-3">
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input className="border-black" placeholder="First Name" {...field} />
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
                                <Input className="border-black" placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mx-3 gap-3">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="border-black" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input className="border-black"  placeholder="Phone Number" {...field} />
                            </FormControl>

                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className="mx-3">
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea className="border-black" placeholder="Message" {...field} />
                            </FormControl>

                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    </div>
                    <div className="flex justify-end ">
                        <Button className="w-full md:w-auto md:ml-auto" type="submit">Send Message</Button>
                    </div>
                </form>
            </Form>
        </div>

    </div>)
}