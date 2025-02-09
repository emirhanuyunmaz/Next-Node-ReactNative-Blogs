'use client'
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useDeleteBlogMutation } from "@/lib/store/blog/blogApi";
import { useToast } from "@/hooks/use-toast";

interface model {
    _id: String,
    title: String,
    image: String,
    tags: [{id:String,text:String}],
    writer:{
        profileImage:String,
        lastName:String,
        firstName:String
    },
    category: {name:String},
    createAt:Date,
    slug:String
}
// UPDATE-DELETE-YAYINLA-YAYINDAN AL
export default function MyBlogCard({_id,category,image,tags,title,writer,createAt,slug}:model){
    const {toast} = useToast()
    const [deleteBlog,resDeleteblog] = useDeleteBlogMutation()
    // console.log(_id);

    async function DeleteBlogHandleClick() {
        const body = {
            id:_id
        }
        await deleteBlog(body).unwrap()
        .then(() => {
            toast({
                title:"Succes Delete Blog"
            })
        }).catch((err) => {
            toast({
                title:"Error"
            })
        })
    } 


    return(<div  className="md:w-96 hover:shadow-2xl flex flex-col  justify-center items-center gap-2 border-2  p-2 rounded-xl transition-all ">
        <div className="ms-auto">
        <Popover>
            <PopoverTrigger><Ellipsis /></PopoverTrigger>
            <PopoverContent className="w-20 flex flex-col justify-center items-center">
                <Link href={`/blogDetail/${slug}`} className="hover:underline" >Show</Link>
                <Link href={`/blogUpdate/${slug}`} className="hover:underline" >Update</Link>
                <button onClick={DeleteBlogHandleClick} className="hover:underline">Delete</button>
            </PopoverContent>
        </Popover>
        </div>
        <div className="relative w-[22rem] h-56 ">
            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image}`} className="rounded-xl" />
        </div>
        <div className="w-full ms-5">
            {category.name}
        </div>
        <h4 className="font-bold text-xl w-full ms-3">
            <p>{title}</p>
        </h4>
        

        <div className="flex gap-2 items-center w-full ms-3 ">
            <div className="relative w-10 h-10 rounded-full">
                <img  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${writer.profileImage}`} alt="" className="rounded-full" />
            </div>
            <p className="text-sm text-primary">{writer.firstName} {writer.lastName}</p>
            <p className="text-sm text-primary">{String(createAt)}</p>
        </div>
    </div>)
}