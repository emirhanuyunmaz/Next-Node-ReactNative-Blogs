import Link from "next/link";
import Icon from "./Icon";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, User } from "lucide-react";
import { ThemeIcon } from "./ThemeIcon";
import NavigationCategory from "./NavigationCategory";


export default function Navbar(){
    return(<header className="flex items-center justify-between  py-6 px-10 md:px-0 max-w-7xl mx-auto">
        <div className="">
            <Icon/>
        </div>
        <div className="hidden md:flex gap-3 text-gray-600" >
            <Link href={`/`} className="hover:text-black transition-all" >Home</Link>
            <Link href={`/blog`}  className="hover:text-black transition-all" >Blog</Link>
            <NavigationCategory/>
            <Link href={`/about`}  className="hover:text-black transition-all" >About</Link>
            <Link href={`/contact`}  className="hover:text-black transition-all" >Contact</Link>
        </div>

        <div className="hidden md:flex gap-2">
            <Input placeholder="Search" className="border-gray-400" />
            <Button variant={`outline`} > <Search/> </Button>
            <div className="ms-3">
                <ThemeIcon />
            </div>
            <div className="flex border-2 rounded-xl p-2 text-gray-500 hover:text-black transition-all">
                <Link href={`/login`} ><User/></Link>
            </div>
        </div>

        {/* <div className="md:hidden">
            <Menu />
        </div> */}

        
    </header>)
}