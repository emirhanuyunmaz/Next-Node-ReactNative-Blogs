'use client'
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
import { Textarea } from "@/components/ui/textarea";
import { useGetFooterDataQuery, useUpdateFooterMutation } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    text: z.string().min(2, {
      message: "Footer Text must be at least 2 characters.",
    }),
})


export default function Page(){
    const {toast} = useToast()
    const getFooterData = useGetFooterDataQuery("")
    const [updateFooter,resUpdateFooter] = useUpdateFooterMutation()
    const [footerText,setFooterText] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateFooter(values).unwrap().then(() => {
            toast({
                title:"Succes update footer about text"
            })
        }).catch(() => {
            toast({
                title:"Error"
            })
        })
    }

  

    useEffect(() => {
        if(getFooterData.isSuccess && getFooterData.data.data){
            form.setValue("text",getFooterData.data.data.text)
        }
    },[getFooterData.isFetching])

    return (<div>
        

        <div className="w-[91%] mx-auto mt-3">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-xl font-bold">Footer Text</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Footer Text" {...field} />
                    </FormControl>
                    <FormDescription>
                        Footer About Text
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
            
        </div>
    </div>)
}