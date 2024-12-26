'use client'
import Image from "next/image";
import TicketText from "./TicketText";
import Link from "next/link";

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

export default function BlogCard({category,image,tags,title,writer,createAt,slug}:model){
    return(<Link href={`/blogDetail/${slug}`} className="md:w-96 hover:shadow-2xl flex flex-col  justify-center items-center gap-2 border-2  p-2 rounded-xl transition-all ">
        <div className="relative w-[22rem] h-56 ">
            <Image loader={() => `${image}`} src={`${image}`} alt="" layout="fill" className="rounded-xl" />
        </div>
        <div className="w-full ms-5">
            {category.name}
            
        </div>
        <h4 className="font-bold text-xl w-full ms-3">
            <p>{title}</p>
        </h4>
        

        <div className="flex gap-2 items-center w-full ms-3 ">
            <div className="relative w-10 h-10 rounded-full">
                <Image loader={() => `${writer.profileImage}`} src={`${writer.profileImage}`} alt="" layout="fill" className="rounded-full" />
            </div>
            <p className="text-sm text-primary">{writer.firstName} {writer.lastName}</p>
            <p className="text-sm text-primary">{String(createAt)}</p>
        </div>
    </Link>)
}