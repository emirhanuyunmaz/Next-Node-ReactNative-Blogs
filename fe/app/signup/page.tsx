'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSignupMutation } from "@/lib/store/auth/authApi";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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

    passwordConfirm: z.string().min(5, {
        message: "Password Confirm must be at least 5 characters.",
    }),
    contrat:z.boolean().refine((value) => value == true)
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
})

export default function Page(){
    const router = useRouter()
    const { toast } = useToast()
    const [signup,signupResponse] = useSignupMutation() 
    const [passwordVisible,setPasswordVisible] =useState(false)
    const [passwordConfirmVisible,setPasswordConfirmVisible] =useState(false)
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email:"",
      password: "",
      passwordConfirm: "",
      contrat:false
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    await signup({...values,isGoogle:false}).unwrap()
    .then((payload) => {
        console.log("İşlem başarılı",payload)
        toast({
            title: "SUCCES",
        })
        router.push("/login")
    })
    .catch((err) => {
        console.log("HATA :",err)
        toast({
            title: "ERROR",
            description: err.data.message,
          })
    })
  }

    return(<div className="min-h-[85vh] max-w-7xl flex mx-auto gap-5 mt-3">
        
        <div className="w-1/2 flex justify-center items-center">
            <div className="relative w-full h-full">
                <Image src={`/images/signup.png`} alt="Sign Up Image" layout="fill" className="" />
            </div>
            
        </div>

        <div className="w-1/2 flex flex-col gap-3 justify-center">
            <h2 className="text-3xl font-bold">Sign Up</h2>
            <p className="text-primary ms-3">Let's get you all set up so you can access your personal account.</p>
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

                    <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password Confirm</FormLabel>
                        <FormControl>
                        <div className="flex items-center border rounded-md border-black px-1">
                                <Input placeholder="Password Confirm" type={`${!passwordConfirmVisible && "password"}`} {...field} className="w-full border-none" />
                                {
                                    passwordConfirmVisible ? <button onClick={(e) => {e.preventDefault();setPasswordConfirmVisible(false)}} ><EyeOff size={24} /></button> :<button onClick={(e) => {e.preventDefault();setPasswordConfirmVisible(true)}} ><Eye size={24} /></button>
                                }
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                        control={form.control}
                        name="contrat"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                I agree to all <span className="text-secondary hover:opacity-80 transition-all cursor-pointer" >Terms</span> and <span className="text-secondary hover:opacity-80 transition-all cursor-pointer" >Pravacy Policies</span></FormLabel>
                            </div>
                            </FormItem>
                        )}
                        />

                <Button className="w-full" type="submit">Sign Up</Button>
            </form>
            </Form>
            
            <p className="text-center">Already have an account ? <Link href={`/login`} className="text-secondary hover:opacity-80 transition-all">Login</Link></p>
        </div>

    </div>)
}