import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function BlogList(){
    return(<div className="flex flex-col gap-3 ">
            <Input placeholder="Piece" className="border-primary" />
            <Input placeholder="Title" className="border-primary" />
            <Button>Update</Button>
        </div>)
}