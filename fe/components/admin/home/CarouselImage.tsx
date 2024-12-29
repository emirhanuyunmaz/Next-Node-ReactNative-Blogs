'use client'
import { Button } from "@/components/ui/button";
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
    
    async function uploadImage(e:any){
        e.preventDefault()
        const file = e.target.files[0]
        const image = await getBase64(file)
        // console.log("ASD:",image);
        
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
        homeCarouselImageUpdate(body)
    }

    async function deleteImage({imageId}:{imageId:String}){
        console.log("RESİM ID:",imageId);
        
        const body = {
            imageId:imageId
        }
        await homeCarouselDeleteImage(body)
    }

    useEffect(() => {
        if(getCarouselImages.isSuccess){
            console.log(getCarouselImages.data);
            
            setImages(getCarouselImages.data.data)
        }
    },[getCarouselImages.isFetching,getCarouselImages.isSuccess])


    return(<div className="flex gap-3">

        <label htmlFor="homeCarouselAddImage" className="w-40 h-40 border-2 flex flex-col justify-center items-center hover:border-primary transition-all cursor-pointer">
            <span><Camera/></span>
            <span>Add Image</span>
        </label>
        <input id="homeCarouselAddImage" hidden onChange={(e) => uploadImage(e)} type="file" />
        
        <div className="flex gap-2 flex-wrap">
            {
                images?.length != 0 && images?.map((item:any) => <div key={item._id} className="">
                <img className="w-40 h-40 " style={{objectFit:"fill"}} src={item.imageName} alt="Carousel Image" />
                <div className="w-full flex justify-around mt-1">
                    <label htmlFor="homeCarouselUpdateImage"  className="border flex justify-center items-center px-2 py-1 rounded-md border-primary hover:opacity-80 cursor-pointer transition-all"  ><ImageUp /></label>
                    <input hidden onChange={(e:any) => updateImage({e:e,imageId:item._id})} id="homeCarouselUpdateImage" type="file" />
                    <Button onClick={() => deleteImage({imageId:item._id})} variant={`outline`} className="border-primary hover:opacity-80 transition-all" ><Trash2 /></Button>
                </div>
            </div>)
            }
        </div>

    </div>)
}