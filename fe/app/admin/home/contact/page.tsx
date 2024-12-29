'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetContactQuery, useUpdateContactMutation } from "@/lib/store/admin/adminApi";
import { useEffect, useState } from "react";

export default function Page(){
    const [updateContact,setUpdateContact] = useUpdateContactMutation()
    const getCotact = useGetContactQuery("")

    const [phoneNumber,setPhoneNumber] = useState("")
    const [email,setEmail] = useState("")
    const [location,setLocation] = useState("")
    const [twitterUrl,setTwitterUrl] = useState("")
    const [instagramUrl,setInstagramUrl] = useState("")
    const [facebookUrl,setFacebookUrl] = useState("")

    async function UpdateOnClick(){
        const body ={
            phoneNumber:phoneNumber,
            email:email,
            location:location,
            twitterUrl:twitterUrl,
            instagramUrl:instagramUrl,
            facebookUrl:facebookUrl
        }

        await updateContact(body)
    }

    useEffect(() => {
        if(getCotact.isSuccess){
            setPhoneNumber(getCotact.data.data.phoneNumber)
            setEmail(getCotact.data.data.email)
            setLocation(getCotact.data.data.location)
            setTwitterUrl(getCotact.data.data.twitterUrl)
            setInstagramUrl(getCotact.data.data.instagramUrl)
            setFacebookUrl(getCotact.data.data.facebookUrl)
        }
    },[getCotact.isFetching])


    return (<div>
        <h1 className="text-xl font-bold ms-10">Contact</h1>
        <div className="w-[91%] px-10">
            
            <div className="mt-3 md:w-1/3 flex flex-col gap-3">
                <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="border-primary" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border-primary" />
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="border-primary" />
                <Input value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="Twitter Url" className="border-primary" />
                <Input value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="Instagram Url" className="border-primary" />
                <Input value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="Facebook Url" className="border-primary" />
                <Button onClick={UpdateOnClick}>Update</Button>
            </div>

            <div>
                
            </div>

        </div>
    </div>)
}