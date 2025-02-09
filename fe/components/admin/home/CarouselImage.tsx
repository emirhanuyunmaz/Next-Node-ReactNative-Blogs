'use client'
import { toast } from "@/hooks/use-toast";
import { useHomeCarouselGetImageQuery, useHomeCarouselImageAddMutation, useHomeCarouselImageDeleteMutation, useHomeCarouselImageUpdateMutation } from "@/lib/store/admin/adminApi";
import { getBase64 } from "@/lib/utils";
import { Camera, ImageUp, Trash2 } from "lucide-react";
import {  useEffect, useState } from "react";


export default function CarouselImage(){

    const [homeCarouselImageAdd,responseHomeCarouselImageAdd] = useHomeCarouselImageAddMutation()
    const getCarouselImages = useHomeCarouselGetImageQuery("")
    const [homeCarouselImageUpdate,responseHomeCarouselImageUpdate] = useHomeCarouselImageUpdateMutation()
    const [homeCarouselDeleteImage,responseHomeCarouselDeleteImage] = useHomeCarouselImageDeleteMutation()
    const [images,setImages] = useState([])
    console.log("SONUÇ:",getCarouselImages.isSuccess);
        

    async function uploadImage(e:any){
        e.preventDefault()
        const file = e.target.files[0]
        const image = await getBase64(file)
        
        const body = {
            image:image
        }
        await homeCarouselImageAdd(body)
    }

    async function updateImage({e,imageId}:{e:any,imageId:String}){
        // e.preventDefault()
        const file = e.target.files[0]
        const image = await getBase64(file)
        const body ={
            imageId:imageId,
            image:image
        }
        await homeCarouselImageUpdate(body)
    }

    async function deleteImage({imageId}:{imageId:String}){ 
        console.log("Silme İşlemi başladı");
               
        const body = {
            imageId:imageId
        }
        await homeCarouselDeleteImage(body).unwrap().
        then(() => {
            toast({
                title:"Image delete success"
            })
        }).catch(() => {
            toast({
                title:"Image delete error"
            })
        })
        console.log("Silme İşlemi sonlandı");

    }

    useEffect(() => {
        console.log(":Tekrar:");
        
        if(getCarouselImages.isSuccess){
            console.log(getCarouselImages.data);
            console.log("::VERİ ÇEKİLDİ::");
            
            setImages(getCarouselImages.data.data)
        }
    },[getCarouselImages])


    return(<div className="flex gap-3 w-full">

        <label htmlFor="homeCarouselAddImage" className="w-40 h-40 border-2 flex flex-col justify-center items-center hover:border-primary transition-all cursor-pointer">
            <span><Camera/></span>
            <span>Add Image</span>
        </label>
        <input id="homeCarouselAddImage" hidden onChange={(e) => uploadImage(e)} type="file" />
        
        <div className="flex gap-2 flex-wrap w-full">
            {
                images?.length != 0 && images?.map((item:any) => <div key={item._id} className="">
                <img className="w-40 h-40 " style={{objectFit:"fill"}} src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.imageName}`} alt="Carousel Image" />
                <div className="w-full flex justify-around mt-1">
                    <label htmlFor="homeCarouselUpdateImage"  className="border flex justify-center items-center px-2 py-1 rounded-md border-primary hover:opacity-80 cursor-pointer transition-all"  ><ImageUp /></label>
                    <input hidden onChange={(e:any) => updateImage({e:e,imageId:item._id})} id="homeCarouselUpdateImage" type="file" />
                    <button onClick={(e) => deleteImage({imageId:item._id})}  className="border-primary hover:opacity-80 transition-all" ><Trash2 /></button>
                </div>
            </div>)
            }
        </div>

    </div>)
}