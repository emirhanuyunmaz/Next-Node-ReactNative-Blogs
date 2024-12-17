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
import { Facebook, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    email: z.string().min(5, {
      message: "Email must be at least 5 characters.",
    }),
    password:z.string().min(5,{
        message:"Password must be at least 5 characters."
    }),
    remember:z.boolean()
  })


export default function Page(){

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:"",
            remember:false
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                            <Input placeholder="Password" {...field} className="border-primary" />
                        </FormControl>
                        <FormMessage />
                        </FormItem> 
                    )}
                    />

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
                <div className="flex gap-3 mt-5">
                    <Button variant={`outline`} className="border-gray-600 flex-1 hover:border-primary transition-all" ><Facebook/></Button>
                    <Button variant={`outline`} className="border-gray-600 flex-1 hover:border-primary transition-all" ><Image src={`/images/google.png`} alt="Google Images" width={22} height={22}/></Button>
                    <Button variant={`outline`} className="border-gray-600 flex-1 hover:border-primary transition-all" ><Github/></Button>
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