'use client'
import { useSearchParams } from "next/navigation"

// Blog arama işlemi ...
export default function Page(){

    const params = useSearchParams()
    console.log("PARAMS :",params.get("search"));
    
    return(<div>
        
    </div>)
}