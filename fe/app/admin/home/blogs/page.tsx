import { BlogsTable } from "@/components/admin/BlogsTable";


export default function Blogs(){
    return (<div>
        <h1 className="text-xl font-bold ms-10" >Blogs</h1>
        <div className="w-[91%] px-10">
            <BlogsTable/>
        </div>
    </div>)
}