'use client'
import LeftBar from "@/components/admin/LeftBar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
// import { useRouter } from "next/router";


interface LayoutType{
    children:React.ReactNode
}

export default function Layout({children}:LayoutType){
    const pathname = usePathname()
    console.log(pathname.split("/")[3]);
    const [urlPath,setUrlPath] = useState(pathname.split("/")[3])
    
    useEffect(() => {
        setUrlPath(pathname.split("/")[3])
    },[pathname])

    return(<div>
        <div className="min-h-[85vh] flex">
        <div className="w-1/5 min-h-screen  border-2 mx-3 p-3">
            <LeftBar path={urlPath} />
        </div>

        <div className="w-4/5">
            {children}
        </div>


        </div>
    </div>)
}