import LeftBar from "@/components/admin/LeftBar"

interface LayoutType{
    children:React.ReactNode
}

export default function Layout({children}:LayoutType){
    return(<div>
        <div className="min-h-[85vh] flex">
        <div className="w-1/5 min-h-screen  border-2 mx-3 p-3">
            <LeftBar/>
        </div>

        <div className="w-4/5">
            {children}
        </div>


        </div>
    </div>)
}