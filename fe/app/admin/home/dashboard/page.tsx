import { DashboardTable } from "@/components/admin/DashboardTable";


export default function Page(){
    return(<div>
        <h1 className="text-xl font-bold ms-10">Dashboard</h1>
        <div className="w-[91%] px-10">
            <DashboardTable/>
        </div>
    </div>)
}