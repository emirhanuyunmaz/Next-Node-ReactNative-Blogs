import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { z } from "zod"


const formSchema = z.object({
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
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirm:"",
        },
    })
    

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return(<>
        <div className="mt-3">
            <h2 className="text-4xl font-bold">Set a Password</h2>
            <p className="text-primary text-lg ">Your previous password has been reset. Please set a new password for you account.</p>
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        </Form>
</>)
}