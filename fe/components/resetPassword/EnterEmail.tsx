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
import { useResetPasswordMutation } from "@/lib/store/auth/authApi"


const formSchema = z.object({
    email: z.string().min(10, {
      message: "Email must be at least 10 characters.",
    }),
  })

export default function EnterEmail({setChangeLayout}:any){
    const [resetPassword,resResetPassword] = useResetPasswordMutation()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        },
    })
    

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        localStorage.setItem("email",values.email)
        resetPassword(values)
        setChangeLayout(1)
    }

    return(<>
            <div>
                <Link href={`/login`} className="flex items-center hover:underline" ><span><ChevronLeft /></span> <span>Back to login </span></Link>
            </div>
            <div>
                <h2 className="text-4xl font-bold">Forgot Your Password</h2>
                <p className="text-primary text-lg ">Don't worry , happents to all of us . Enter your email below to recover your password</p>
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">Submit</Button>
                <div className="flex flex-col items-center gap-5">

                    <p>Or login with</p>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(jwtDecode(credentialResponse.credential!));
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </form>
            </Form>
    </>)
}