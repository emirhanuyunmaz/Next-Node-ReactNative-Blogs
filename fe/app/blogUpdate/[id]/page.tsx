'use client'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetCategoriesQuery, useGetSingleBlogQuery, useGetUpdateBlogQuery, useUpdateBlogImageMutation, useUpdateBlogMutation } from "@/lib/store/blog/blogApi"
import MDEditor from "@uiw/react-md-editor"
import { TagInput } from "emblor"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { getBase64 } from "@/lib/utils"


const tagObj = z.object({
    id:z.string().min(1,{
        message:"Require id"
    }),
    text:z.string().min(1,{
        message:"Require text"
    })
}) 


const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),

    category: z.string().min(2, {
        message:"Category select",
    }),

    tags: z.array(tagObj).min(1,{
        message:"Min 1 tag add"
    }),

    blogText: z.string().min(2, {
        message: "Text must be at least 2 characters.",
    }),
})


export default function Page(){
    const router = useRouter()
    const {toast} = useToast()

    const {id} =useParams()

    const getBlog = useGetUpdateBlogQuery(id)

    const getCategories = useGetCategoriesQuery("")

    const [updateBlog,resUpdateBlog] = useUpdateBlogMutation()
    const [updateBlogImage,resUpdateBlogImage] = useUpdateBlogImageMutation()

    const [images, setImages] = useState<any>("");
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const [categories,setCategories] = useState([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          blogText: "",
          category: "",
          tags: [],
          title: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        const body = {
            slug:id,
            ...values
        }

        await updateBlog(body).unwrap().then(() => {
            toast({
                title:"Update Succes"
            })
            // router.
        }).catch((err) => {

        })

        console.log(values)
      }


      async function UpdateBlogImageHandleClick(e:any){
        const file = e.target.files[0]
        const image = await getBase64(file)
        
        const body = {
            id:id,
            image:image
        }

        await updateBlogImage(body).unwrap()
        .then(() => {
            toast({
                title:"Image update succes"
            })
        })
        .catch((err) => {
            console.log("HATA:",err);
            toast({
                title:"ERROR"
            })
        })
      }

    useEffect(() => {
        if(getCategories.isSuccess){
            setCategories(getCategories.data.data)
        }
    },[getCategories.isFetching])

    useEffect(() => {
        if(getBlog.isSuccess){
            console.log("ASDDSA:",getBlog.data);
            form.setValue("title" ,getBlog.data.data.title)
            form.setValue("blogText",getBlog.data.data.blogText)
            form.setValue("category",getBlog.data.data.category.name)
            form.setValue("tags",getBlog.data.data.tags)
            setImages(getBlog.data.data.image)
        }
    },[getBlog.isFetching])

    return(<div className="max-w-7xl min-h-[85vh] mx-auto">
        <div className='mx-3 md:mx-0 flex flex-col md:flex-row gap-3'>

            <div className='flex flex-col md:w-1/4 gap-3 items-center'>
                <div className='flex flex-col w-full h-52 justify-center items-center border-2 relative'>
                    <img src={`${images == "" ?"/images/default_user.jpg" : images}`} className="w-full h-full absolute" />
                </div>
                <label htmlFor="updateImage" className="px-2 py-1 rounded-xl border-2 border-primary cursor-pointer  hover:border-blue-400 hover:text-blue-400 transition-all ">
                    Update
                </label>
                <input onChange={(e) => UpdateBlogImageHandleClick(e)} hidden id="updateImage" type="file" />

            </div>

            <div className='md:w-2/3 flex flex-col gap-3 '>
                <div className=' flex flex-col gap-3 w-full '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" className="!text-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Category</FormLabel>
                            <FormControl>
                            <Select value={field.value}  onValueChange={field.onChange}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent >
                                    {
                                        categories.map((item :any) => <SelectItem  key={item._id} value={`${item?.name}`}>{item?.name}</SelectItem> )
                                    }
                                    
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Tag {"(4)"}</FormLabel>
                            <FormControl>
                                <TagInput
                                    maxLength={5}
                                    placeholder="Add Tags (4)"
                                    tags={field.value}
                                    setTags={(newTags) => {
                                        field.onChange(newTags);
                                    }}
                                    activeTagIndex={activeTagIndex}
                                    setActiveTagIndex={setActiveTagIndex}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                    <FormField
                        control={form.control}
                        name="blogText"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-bold">Text</FormLabel>
                            <FormControl>
                                <MDEditor
                                className='!min-h-[50vh]'
                                // value={blogText as string}
                                // onChange={(e) => setBlogText(e)}
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
  
                        <Button className="w-full" type="submit">Update</Button>
                    </form>
                </Form>
                    
                </div>

                
            </div>
        </div>
        <div className='flex justify-end mt-3 w-full md:pe-32'>
            {/* <Button onClick={AddBlogOnClick} className=''>ADD BLOG</Button> */}
        </div>
    </div>)
}