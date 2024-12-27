import { UserTable } from "@/components/admin/UserTable"


export default function Page(){
    return(<div>
        <h1 className="text-xl font-bold ms-10">USERS</h1>
        <div className="w-[91%] px-10">
            <UserTable/>
        </div>
    </div>)
}