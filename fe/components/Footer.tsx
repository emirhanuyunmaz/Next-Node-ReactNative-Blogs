'use client'
import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGetCategoriesQuery } from "@/lib/store/blog/blogApi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetContactQuery, useGetFooterDataQuery } from "@/lib/store/admin/adminApi";

export default function Footer(){

    const getCategory = useGetCategoriesQuery("")
    const getFooterData = useGetFooterDataQuery("")
    const getContact = useGetContactQuery("")

    const [categories,setCategories] = useState([])
    const [footerAbout,setFooterAbout] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")

    useEffect(() => {
        if(getCategory.isSuccess){
            if(getCategory.data.data){
                setCategories(getCategory.data.data)
            }
        }
    },[getCategory.isFetching])
    

    useEffect(() => {
        if(getFooterData.isSuccess){
            if(getFooterData.data.data){
                setFooterAbout(getFooterData.data.data.text)
            }
        }
    },[getFooterData.isFetching])

    useEffect(() => {
        if(getContact.isSuccess){
            if(getContact.data.data){
                setEmail(getContact.data.data.email)
                setPhoneNumber(getContact.data.data.phoneNumber)
            }
        }
    },[getContact.isFetching])
    

    return(<footer className=" bg-primary py-16 mt-5 text-white">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row  gap-5">            
            <div className="md:w-3/4 flex flex-col md:flex-row  gap-5">
                <div className="md:w-1/2 text-center">
                    <div>
                        <h3 className="font-bold">About</h3>
                        <p>{footerAbout}</p>
                    </div>

                    <div className="flex gap-2 justify-center">
                        <p>Email:</p>
                        <p>{email}</p>
                    </div>

                    <div className="flex gap-2 justify-center">
                        <p>Phone:</p>
                        <p>{phoneNumber}</p>
                    </div>

                </div>

                <div className="md:w-1/4 text-center">
                    <h3 className="font-bold">Quick Link</h3>
                    <ul>
                        <li><Link href={`/`} >Home</Link></li>
                        <li><Link href={`/about`} >About</Link></li>
                        <li><Link href={`/contact`} >Contact</Link></li>
                    </ul>
                </div>

                <div className="md:w-1/4 text-center">
                    <h3 className="font-bold" >Category</h3>
                    <ul>
                        {
                            categories.map((item:any) => <li key={item._id}><Link href={`/category/${item.slug}`} >{item.name}</Link></li> ) 
                        }
                    </ul>
                </div>
            </div>

            <div className="md:w-1/4 bg-white  flex flex-col justify-center px-5 rounded-xl gap-3 py-3 mx-3">
                <h4 className="font-bold text-center text-primary">Weekly Newsletter</h4>
                <p className="text-gray-600">Get blog articles and offers via email</p>
                <div className="flex justify-center items-center gap-3 border-2 rounded-xl px-2" >
                    <Input placeholder="Your Email" className="border-gray-400 border-none px-2 py-1"/>
                    <Mail size={32} color="gray" />
                </div>
                <Button>Subscript</Button>
            </div>
        </div>
    </footer>)
} 