import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHomeInfoUpdateMutation, useHomePageGetInfoQuery } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";


export default function BlogList(){
    const getHomePageInfo = useHomePageGetInfoQuery("") 
    const [updateHomePageInfo,resUpdateHomePageInfo] = useHomeInfoUpdateMutation()

    const [piece,setPiece] = useState(0)
    const [title,setTitle] = useState("")

    async function upadateData(){
        const body= {
            piece:Number(piece),
            title:title
        }
        updateHomePageInfo(body)
    }

    useEffect(() => {
        if(getHomePageInfo.isSuccess){
            console.log(getHomePageInfo.data.data);
            setTitle(getHomePageInfo.data.data[0]?.title ? getHomePageInfo.data.data[0].title : "")
            setPiece(getHomePageInfo.data.data[0]?.piece ? getHomePageInfo.data.data[0].piece : 0)
        }
    },[getHomePageInfo.isFetching])

    return(<div className="flex flex-col gap-3 ">
            <Input value={piece} onChange={(e:any) => setPiece(e.target.value)} placeholder="Piece" className="border-primary" />
            <Input value={title} onChange={(e:any) => setTitle(e.target.value)} placeholder="Title" className="border-primary" />
            <Button onClick={upadateData}>Update</Button>
        </div>)
}