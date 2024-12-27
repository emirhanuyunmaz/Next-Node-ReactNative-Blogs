'use client'
import MDEditor from "@uiw/react-md-editor";
import { Camera } from "lucide-react";
import { useState } from "react";

export default function Page(){
    const [aboutText,setAboutText] = useState("")


    return (<div>
        <h1 className="text-xl font-bold ms-10">About</h1>
        <div className="w-[91%] px-10">
            <div className="w-40 h-40 flex justify-center items-center border-2">
                <Camera/>
            </div>
            <div className="mt-3">
                <MDEditor
                    className='!min-h-[50vh]'
                    value={aboutText}
                    onChange={(e:any) => setAboutText(e)}
                />
            </div>
        </div>
    </div>)
} 