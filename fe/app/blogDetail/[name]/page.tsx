import TicketText from "@/components/TicketText"
import parse from 'html-react-parser'
import "./blog_detail.css"
import DownloadPdfBlog from "@/components/DownloadPdfBlog"
import { getCookie } from "cookies-next/client"
import { cookies } from "next/headers"

interface Blogs {
    data : {_id: String,
    title: String,
    image: String,
    blogText: String,
    tags: [
      { id: String, text: String },
    ],
    writer: {
      _id: String,
      firstName: String,
      lastName: String,
      profileImage: String
    },
    category: { _id: String, name: String },
    slug: String,
    __v: Number}
}

interface Premium{
    succes: Boolean,
    isPremium:Boolean
}

async function getPost(id: string) {
    const res = await fetch(`http://localhost:8000/blog/getBlog/${id}`)
    const post: Blogs = await res.json()
    return post.data
}


async function isPremiumControl() {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')
    // console.log("AA:",access_token?.value);
    
    
    const res = await fetch(`http://localhost:8000/user/isPremium/`,
        {
            headers:{
                access_token:access_token!.value,
            }
        }
    )
    
    const post: Premium = await res.json()
    return post
}

export default async function Page({params}:any){
    const {name} = await params
    const data = await getPost(name)
    const {isPremium } = await isPremiumControl()
    
    return(<div className="max-w-7xl  mx-auto min-h-[80vh] mt-5">
            <div className="w-3/4 mx-auto flex flex-col gap-3" >
                <TicketText>{data.category.name}</TicketText>
                
                <div className="flex items-center gap-2 pl-3">
                    <div className="relative  h-10 w-10 rounded-full  ">
                        <img  src={`${data.writer.profileImage}`} alt=""  className="rounded-full" />
                    </div>
                    <div className="flex gap-5 text-gray-600 ">
                        <p>{data.writer.firstName} {data.writer.lastName}</p>
                        <p>12/12/2024</p>
                    </div>
                </div>
    
                <div className="relative h-[50vh]  ">
                    <img src={`${data.image}`} className="w-full h-full" alt=""  />
                </div>
                
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-center">{data.title}</h1>
                    {parse(data.blogText as string)}
                </div>
                {isPremium && <DownloadPdfBlog data={data} />}
            </div>
    
        </div>)
}