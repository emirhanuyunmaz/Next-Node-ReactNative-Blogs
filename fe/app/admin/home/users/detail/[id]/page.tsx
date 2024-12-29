'use client'
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetSingleUserQuery, useUpdateUserMutation, useUpdateUserProfileImageMutation } from "@/lib/store/admin/adminApi";
import { getBase64 } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";


export default function Page(){
    const {id} = useParams()
    console.log(id);
    const getSingleUser = useGetSingleUserQuery(id)
    const [updateUser,resUpdateUser] = useUpdateUserMutation()
    const [updateUserProfileImage,resUpdateUserProfileImage] = useUpdateUserProfileImageMutation()

    const [firstName,setFirstName] = useState<String>("")
    const [lastName,setLastName] = useState<String>("")
    const [email,setEmail] = useState<String>("")
    const [password,setPassword] = useState<String>("")
    const [profileImage,setProfileImage] = useState<String>()
    const [birthDay,setBirthDay] = useState<Date | undefined>(new Date(Date.now()))
    const [isGoogle,setIsGoogle] = useState<boolean>(false)
    const [address,setAddress] = useState<String>("")

    async function UpdateUserHandleClick(){
        const body = {
            firstName,
            lastName,
            email,
            password,
            birthDay,
            address,
            id
        }
        await updateUser(body)
    }

    async function UpdateUserProfileImageOnClick(e:any){
        const file = e.target.files[0]
        const base64Image = await getBase64(file)
        const body ={
            id:id,
            image:base64Image
        }  
        updateUserProfileImage(body)

    }

    useEffect(() => {
        if(getSingleUser.isSuccess){
            console.log(getSingleUser.data);
            setProfileImage(getSingleUser.data.data.profileImage)
            setFirstName(getSingleUser.data.data.firstName)
            setLastName(getSingleUser.data.data.lastName)
            setEmail(getSingleUser.data.data.email)
            setPassword(getSingleUser.data.data.password)
            setIsGoogle(getSingleUser.data.data.isGoogle)
            setBirthDay(getSingleUser.data.data.birthDay)
            setAddress(getSingleUser.data.data.address)
        }
    },[getSingleUser.isFetching])
    
    return(<div>
        <div className="w-[91%] mx-10 flex gap-3">

            <div>
                <div className="w-52 h-52 border-2">
                    <img className="w-full h-full" src={`${profileImage}`} />
                </div>
                <div className="flex justify-center mt-3">
                    <label className="p-2 border border-primary rounded-xl hover:opacity-80 cursor-pointer " htmlFor="updateUserProfileImage"><ImageUp /></label>
                    <input onChange={(e) => UpdateUserProfileImageOnClick(e)} id="updateUserProfileImage" hidden type="file" />
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <div className="flex gap-3">
                    <Input value={firstName as string} onChange={(e) => setFirstName(e.target.value)}  placeholder="First Name" />
                    <Input value={lastName as string} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                </div>
                <div className="flex gap-3">
                    <Input value={email as string} onChange={(e) => setEmail(e.target.value)}   placeholder="Email" />
                    {!isGoogle && <Input value={password as string} onChange={(e) => setPassword(e.target.value)}   placeholder="Password" />}
                </div>

                <div className="flex gap-3">
                    <DatePicker date={birthDay!} setDate={(e) => setBirthDay(e)} title={"Birth Day"} />
                </div>
                <div>
                    <Textarea value={address as string} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <div>
                    <Button onClick={UpdateUserHandleClick} className="w-full">Update</Button>
                </div>
            </div>

        </div>
    </div>)
} 