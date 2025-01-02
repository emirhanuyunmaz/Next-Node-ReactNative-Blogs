'use client'
import { Button } from "@/components/ui/button";
import { useGetAboutDataQuery, useUpdateAboutImageMutation, useUpdateAboutMutation, useUpdateBlogImageMutation } from "@/lib/store/admin/adminApi";
import { getBase64 } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

export default function Page(){
    const getAboutData = useGetAboutDataQuery(null)
    const [updatAboutData,resUpdataAboutdata] = useUpdateAboutMutation()
    const [updateImage,resUpdateImage] = useUpdateAboutImageMutation()

    const [aboutText,setAboutText] = useState<String>("")
    const [aboutImage,setAboutImage] = useState<String>()

    async function UpdateDataOnClick(){
        const body ={
            text:aboutText
        }
        await updatAboutData(body)
    }

    async function UploadImageOnClick(e:any){
        const file = e.target.files[0]
        const base64Image = await getBase64(file)
        const body = {
            image : base64Image
        }
        await updateImage(body)

    }

    useEffect(() => {
        if(getAboutData.isSuccess){
            const dataT = getAboutData.data.data
            if(dataT.length != 0){
                console.log("DATA:",getAboutData.data.data);
                console.log("VERİ VAR");
                setAboutText(getAboutData.data.data[0]?.text)
                setAboutImage(getAboutData.data.data[0]?.image)
            }
        }
    },[getAboutData.isFetching])

    return (<div>
        <h1 className="text-xl font-bold ms-10">About</h1>
        <div className="w-[91%] px-10">
            <div>
                <div className="w-96 h-52 flex justify-center items-center border-2">
                    <img src={`${aboutImage ? aboutImage : "/images/not_image.png"}`} className="w-full h-full " alt="About image" />
                </div>
                <div className="my-3">
                    <label htmlFor="uploadImage" className="border border-primary p-2 rounded-xl cursor-pointer hover:opacity-80 transition-all">Update Image</label>
                    <input id="uploadImage" onChange={(e) => UploadImageOnClick(e)} hidden type="file" />
                </div>
            </div>
            <div className="mt-3">
                <MDEditor
                    className='!min-h-[50vh]'
                    value={aboutText as string}
                    onChange={(e:any) => setAboutText(e)}
                />
                <Button onClick={(e) => UpdateDataOnClick()} className="w-full mt-3">Update Text</Button>
            </div>
        </div>
    </div>)
} 