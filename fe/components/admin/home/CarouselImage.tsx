import { Button } from "@/components/ui/button";
import { Camera, ImageUp, Trash2 } from "lucide-react";


export default function CarouselImage(){
    return(<div className="flex gap-3">

        <button className="w-40 h-40 border-2 flex flex-col justify-center items-center hover:border-primary transition-all">
            <span><Camera/></span>
            <span>Add Image</span>
        </button>

        <div className="flex gap-2 flex-wrap">
            <div className="">
                <img className="w-40 h-40 " style={{objectFit:"fill"}} src={"https://picsum.photos/seed/picsum/200/300"} alt="Carousel Image" />
                <div className="w-full flex justify-around mt-1">
                    <Button variant={`outline`} className="border-primary hover:opacity-80 transition-all"  ><ImageUp /></Button>
                    <Button variant={`outline`} className="border-primary hover:opacity-80 transition-all" ><Trash2 /></Button>
                </div>
            </div>
        </div>

    </div>)
}