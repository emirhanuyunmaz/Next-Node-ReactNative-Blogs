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
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
    phoneNumber: z.string().min(3,{
        message:"Phone Number is required"
    }),
    email: z.string().min(3,{
        message:"Email is required"
    }),
    location: z.string().min(3,{
        message:"Location is required"
    }),
    twitterUrl: z.string().optional(),
    twitterUrlShow: z.boolean().optional(),
    instagramUrl: z.string().optional(),
    instagramUrlShow: z.boolean().optional(),
    facebookUrl: z.string().optional(),
    facebookUrlShow: z.boolean().optional(),
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
          twitterUrlShow:false,
          instagramUrl: "",
          instagramUrlShow:false,
          facebookUrl: "",
          facebookUrlShow:false
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
            form.setValue("twitterUrlShow",getCotact.data.data?.twitterUrlShow)
            form.setValue("instagramUrl",getCotact.data.data?.instagramUrl)
            form.setValue("instagramUrlShow",getCotact.data.data?.instagramUrlShow)
            form.setValue("facebookUrl",getCotact.data.data?.facebookUrl)
            form.setValue("facebookUrlShow",getCotact.data.data?.facebookUrlShow)
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
                            <FormItem >
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl >
                                <Input  placeholder="Phone Number" {...field} className="border-primary"/>
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
                            <FormLabel>Email*</FormLabel>
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
                            <FormLabel>Location*</FormLabel>
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

                    <div className="flex items-center gap-3">

                        <FormField
                            control={form.control}
                            name="twitterUrl"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel>Twitter Url</FormLabel>
                                <FormControl>
                                    <Input required={form.getValues("twitterUrlShow")} placeholder="Twitter Url" {...field} className="border-primary"/>
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
                            name="twitterUrlShow"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Show</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                    <div className="flex items-center gap-3 w-full ">
                        <FormField
                            control={form.control}
                            name="instagramUrl"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel>Instagram Url</FormLabel>
                                <FormControl>
                                    <Input required={form.getValues("instagramUrlShow")} placeholder="Instagram Url" {...field} className="border-primary"/>
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
                            name="instagramUrlShow"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Show</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                    
                    <div className="flex items-center gap-3">

                    <FormField
                        control={form.control}
                        name="facebookUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel>Facebook Url</FormLabel>
                            <FormControl>
                                <Input required={form.getValues("facebookUrlShow")} placeholder="Facebook Url" {...field} className="border-primary"/>
                            </FormControl>
                            <FormDescription>
                                Facebook to contact
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                            control={form.control}
                            name="facebookUrlShow"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Show</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
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

            <div>
                
            </div>

        </div>
    </div>)
}