'use client'
import BlogList from "@/components/admin/home/BlogList";
import CarouselImage from "@/components/admin/home/CarouselImage";
import { GalleryHorizontal, StickyNote } from "lucide-react";
import { useState } from "react";


export default function Page(){
    
   
    
    const [select,setSelect] = useState(0)

    return(<div>
        <h1 className="text-xl font-bold ms-10">
            Home
        </h1>
        <div className="w-[91%] px-10 mt-3 flex gap-3">
            <button onClick={() => setSelect(0)} className={`border-2 w-40 h-40 flex flex-col justify-center items-center hover:shadow-xl hover:border-primary transition-all ${select === 0 && 'border-primary'}`}>
                <span><GalleryHorizontal /></span>
                <span className="font-bold">Carousel Image</span>
            </button>

            <button onClick={() => setSelect(1)} className={`border-2 w-40 h-40 flex flex-col justify-center items-center hover:shadow-xl hover:border-primary transition-all ${select === 1 && 'border-primary'}`}>
                <span><StickyNote/></span>
                <span className="font-bold">Blog List</span>
            </button>
        </div>
        <div className="w-[91%] px-10 mt-3 md:w-1/2">
            {select === 0 && <CarouselImage/>}
            {select === 1 && <BlogList/>}
        </div>
    </div>)
}