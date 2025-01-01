'use client'
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAddUserMutation } from "@/lib/store/admin/adminApi";
import { getBase64 } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Page(){
    const router = useRouter()
    const [addUser,resAddUser] = useAddUserMutation()

    const [firstName,setFirstName] = useState<String>("")
    const [lastName,setLastName] = useState<String>("")
    const [email,setEmail] = useState<String>("")
    const [password,setPassword] = useState<String>("")
    const [profileImage,setProfileImage] = useState<String>("")
    const [birthDay,setBirthDay] = useState<Date | undefined>()
    const [isGoogle,setIsGoogle] = useState<boolean>(false)
    const [address,setAddress] = useState<String>("")

    async function uploadImage(e:any){
        const file = e.target.files[0]
        const base64Image = await getBase64(file) as string
        setProfileImage(base64Image)
    }

    async function addUserHandleClick(){
        const body = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            profileImage:profileImage,
            birthDay:birthDay,
            isGoogle:false,
            address:address
        }
        await addUser(body).unwrap().then(() => {
            toast({
                title:"User Add Succes"
            })
            router.push("/admin/home/users/")
        })

    }

    return(<div>
        <div className="w-[91%] mx-10 flex gap-3">

            <div>
                <div className="w-52 h-52 border-2">
                    <img className="w-full h-full" src={profileImage ? profileImage as string:`/images/default_user.jpg`} />
                </div>
                <div className="flex justify-center mt-3">
                    <label className="p-2 border border-primary rounded-xl hover:opacity-80 cursor-pointer " htmlFor="updateUserProfileImage"><ImageUp /></label>
                    <input onChange={(e:any) => uploadImage(e)} id="updateUserProfileImage" hidden type="file" />
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                <div className="flex gap-3">
                    <Input value={firstName as string} onChange={(e) => setFirstName(e.target.value)}  placeholder="First Name" />
                    <Input value={lastName as string} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                </div>
                <div className="flex gap-3">
                    <Input value={email as string} onChange={(e) => setEmail(e.target.value)}   placeholder="Email" />
                    <Input value={password as string} onChange={(e) => setPassword(e.target.value)}   placeholder="Password" />
                </div>

                <div className="flex gap-3">
                    <DatePicker date={birthDay!} setDate={(e) => setBirthDay(e)} title={"Birth Day"} />
                </div>
                <div>
                    <Textarea value={address as string} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <div>
                    <Button onClick={addUserHandleClick} className="w-full">Save</Button>
                </div>
            </div>

        </div>
    </div>)
}