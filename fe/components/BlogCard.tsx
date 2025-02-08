'use client'
import Image from "next/image";
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
    createdAt:Date,
    slug:String
}

export default function BlogCard({category,image,tags,title,writer,createdAt,slug}:model){
    console.log("AA:",process.env.NEXT_PUBLIC_BASE_URL);
    
    return(<Link href={`/blogDetail/${slug}`} className="md:w-96 hover:shadow-2xl flex flex-col  justify-center items-center gap-2 border-2  p-2 rounded-xl transition-all ">
        <div className="relative w-[22rem] h-56 ">
            <img  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image}`} alt="" className="rounded-xl absolute w-full h-full" />
        </div>
        <div className="w-full ms-5">
            {category.name}
            
        </div>
        <h4 className="font-bold text-xl w-full ms-3">
            <p>{title}</p>
        </h4>
        

        <div className="flex gap-2 items-center w-full ms-3 ">
            <div className="relative w-10 h-10 rounded-full">
                <Image loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${writer.profileImage}`} src={`${process.env.NEXT_PUBLIC_BASE_URL}/${writer.profileImage}`} alt="" layout="fill" className="rounded-full" />
            </div>
            <p className="text-sm text-primary">{writer.firstName} {writer.lastName}</p>
            <p className="text-sm text-primary">{String(createdAt)}</p>
        </div>
    </Link>)
}