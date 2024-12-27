import { CategoryTable } from "@/components/admin/CategoryTable";


export default function Page(){
    return (<div>
        <h1 className="text-xl font-bold ms-10">
            Categories
        </h1>
        <div className="w-[91%] px-10">
            <CategoryTable/>
        </div>
    </div>)
}