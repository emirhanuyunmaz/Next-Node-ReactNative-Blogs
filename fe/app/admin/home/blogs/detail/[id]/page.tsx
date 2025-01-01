'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useUpdateBlogMutation,useGetSingleBlogQuery, useUpdateBlogImageMutation } from "@/lib/store/admin/adminApi"
import { useGetCategoriesQuery } from "@/lib/store/blog/blogApi"
import { getBase64 } from "@/lib/utils"
import MDEditor from "@uiw/react-md-editor"
import { TagInput } from "emblor"
import { Camera, ImageUp, Trash2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

// interface BlogModel{
//     _id:String,
//     writer:{
//         _id:String,
//         firstName:String,
//         lastName:String,
//         email:String,
//     }
//     title:String,
//     category:{
//         _id:String,
//         name:String
//     },
//     tag:[]
// }

export default function Page(){
    const {toast} = useToast()
    const {id} = useParams()
    const getSingleBlog = useGetSingleBlogQuery(id)
    const [updateBlog,reqUpdateBlog] = useUpdateBlogMutation()
    const [updateBlogImage,resUpdateBlogImage] = useUpdateBlogImageMutation()
    const getCategories = useGetCategoriesQuery("")
    
    const [title,setTitle] = useState("")
    const [categories,setCategories] = useState([])
    const [selectCategory,setSelectCategory] = useState("")
    const [tags,setTags] = useState<any>([])
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const [image,setImage] = useState<String>()
    const [blogText,setBlogText] = useState<String>()

    async function UpdateBlogOnClick(){
        console.log(":Gğncelleme :");
        
        const body = {
            id:id,
            title:title,
            selectCategory:selectCategory,
            tags:tags,
            blogText:blogText
        }
        await updateBlog(body).unwrap().then(() => {
            console.log(":Başarı :");
            
            toast({
                title:"Update Succes"
            })
        }).catch((err) => {
            console.log(":Başarı :");
            
            toast({
                title:"Error"
            })
        })

    }
    
    async function UpdateImageOnClick(e:any){
        const file = e.target.files[0]
        const base64Image = await getBase64(file)
        const body = {
            id:id,
            image:base64Image
        }
        await updateBlogImage(body).unwrap().then(() => {
            toast({
                title:"Update Succes"
            })
        }).catch((err) => {
            toast({
                title:"Error"
            })
        })
    }

    useEffect(() => {
        if(getSingleBlog.isSuccess){
            console.log(getSingleBlog.data.data);
            setImage(getSingleBlog.data.data.image)
            setTitle(getSingleBlog.data.data.title)
            setSelectCategory(getSingleBlog.data.data.category.name)
            setTags(getSingleBlog.data.data.tags)
            setBlogText(getSingleBlog.data.data.blogText)
        }
    },[getSingleBlog.isFetching])

    useEffect(() => {
        if(getCategories.isSuccess){
            console.log(getCategories.data.data);
            setCategories(getCategories.data.data)
        }
    },[getCategories.isFetching])

    return(<div>
        <div className="w-[91%] mx-10 my-3">
            <h1 className="text-xl font-bold">Blog Detail</h1>
        </div>
        <div className="w-[91%] mx-10">
            <div className="flex gap-3">
                <div>
                    <div className="w-72 h-52 border-2 flex justify-center items-center">
                        <img src={`${image}`} alt="" />
                    </div>
                    <div className="flex justify-around mt-3">
                        {/* <Button variant={"outline"} ><Trash2 /></Button> */}
                        <label htmlFor="updateBlogImage" className="border-2 border-primary rounded-xl p-2 hover:opacity-80 transition-all cursor-pointer"><ImageUp /></label>
                        <input id="updateBlogImage" onChange={(e) => UpdateImageOnClick(e)} hidden type="file" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <Input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title" />
                    <Select value={selectCategory} defaultValue={selectCategory} onValueChange={(e) => setSelectCategory(e)}>

                            <SelectTrigger >
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent >
                                {
                                    categories.map((item :any) => <SelectItem  key={item._id} value={`${item?.name}`}>{item?.name}</SelectItem> )
                                }
                                
                            </SelectContent>
                        </Select>
                        <TagInput
                            maxLength={5}
                            placeholder="Add Tags (4)"
                            tags={tags}
                            setTags={(newTags) => {
                                setTags(newTags);
                            }}
                            activeTagIndex={activeTagIndex}
                            setActiveTagIndex={setActiveTagIndex}
                        />
                        <MDEditor
                            className='!min-h-[50vh]'
                            value={blogText as string}
                            onChange={(e) => setBlogText(e)}
                        />
                        <Button onClick={UpdateBlogOnClick} >Update</Button>
                </div>
            </div>

        </div>
    </div>)
}