import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Page(){
    return(<div className="min-h-[85vh] max-w-7xl mx-auto flex flex-col justify-center items-center gap-3">
        <h2 className="text-2xl font-bold">Admin Login</h2>
        <div className="w-1/3 flex flex-col gap-3">
            <Input placeholder="Email" className="border-primary" />
            <Input placeholder="Password" className="border-primary"/>
            <Button>Login</Button>
        </div>

    </div>)
}