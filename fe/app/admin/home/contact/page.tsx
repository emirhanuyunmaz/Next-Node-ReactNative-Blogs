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
import { Input } from "@/components/ui/input";
import { useGetContactQuery, useUpdateContactMutation } from "@/lib/store/admin/adminApi";
import { useEffect } from "react";

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    location: z.string().optional(),
    twitterUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    facebookUrl: z.string().optional(),
})


export default function Page(){
    const {toast} = useToast()
    const [updateContact,setUpdateContact] = useUpdateContactMutation()
    const getCotact = useGetContactQuery("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          phoneNumber: "",
          email: "",
          location: "",
          twitterUrl: "",
          instagramUrl: "",
          facebookUrl: "",
        },
    })
     
      // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        await updateContact(values).unwrap().then(() => {
            toast({
                title:"Update Succes"
            })
        }).catch((err) => {
            toast({
                title:"Error"
            })
        })

        console.log(values)
    }

    useEffect(() => {
        if(getCotact.isSuccess && getCotact.data.data){
            form.setValue("email",getCotact.data.data?.email)
            form.setValue("phoneNumber",getCotact.data.data?.phoneNumber)
            form.setValue("location",getCotact.data.data?.location)
            form.setValue("twitterUrl",getCotact.data.data?.twitterUrl)
            form.setValue("instagramUrl",getCotact.data.data?.instagramUrl)
            form.setValue("facebookUrl",getCotact.data.data?.facebookUrl)
        }
    },[getCotact.isFetching])


    return (<div>
        <h1 className="text-xl font-bold ms-10">Contact</h1>
        <div className="w-[91%] px-10">
            
            <div className="mt-3 w-full lg:w-1/2 xl:w-1/2 flex flex-col gap-3">
              <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone Number" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Phone Number to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Email to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Location" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Location to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="twitterUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Twitter Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Twitter Url" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Twitter to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="instagramUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Instagram Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Twitter Url" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Instagram to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="facebookUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Facebook Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Twitter Url" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Facebook to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                
            </div>

            <div>
                
            </div>

        </div>
    </div>)
}