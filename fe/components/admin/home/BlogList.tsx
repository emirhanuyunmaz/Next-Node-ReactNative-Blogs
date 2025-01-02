'use cliet'
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
import { useHomeInfoUpdateMutation, useHomePageGetInfoQuery } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
 
const formSchema = z.object({
    piece: z.string().min(1, {
      message: "Piece must be at least 1 characters.",
    }),
    title:z.string().min(2, {
        message: "Piece must be at least 2 characters.",
    }),
})

export default function BlogList(){
    const {toast} = useToast() 
    const getHomePageInfo = useHomePageGetInfoQuery("") 
    const [updateHomePageInfo,resUpdateHomePageInfo] = useHomeInfoUpdateMutation()

    const [piece,setPiece] = useState(0)
    const [title,setTitle] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          piece: "",
          title: "",
        },
    })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
    
        await updateHomePageInfo(values).unwrap()
        .then(() => {
            toast({
                title:"Update is succes"
            })
        }).catch((err) => {
            toast({
                title:"Error"
            })
        })
    }




    async function upadateData(){
        const body= {
            piece:Number(piece),
            title:title
        }
    }

    useEffect(() => {
        if(getHomePageInfo.isSuccess){
            console.log(getHomePageInfo.data.data);
            setTitle(getHomePageInfo.data.data[0]?.title ? getHomePageInfo.data.data[0].title : "")
            setPiece(getHomePageInfo.data.data[0]?.piece ? getHomePageInfo.data.data[0].piece : 0)
        }
    },[getHomePageInfo.isFetching])

    return(<div className="flex flex-col gap-3 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Title" {...field} className="border-primary" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="piece"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Piece</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Piece" {...field} className="border-primary" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Update</Button>
                </form>
            </Form>
            
        </div>)
}