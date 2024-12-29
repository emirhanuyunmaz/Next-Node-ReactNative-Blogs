'use client'
import { ChartColumnStacked, Dock, House, LayoutDashboard, NotebookTabs, StickyNote, Text, Users } from "lucide-react"
import Link from "next/link"

type LetfBar = {
    path:String
}

export default function LeftBar ({path}:LetfBar){
    return(<ul className="flex flex-col gap-3">
        <li  className={`flex w-full gap-2 ${path == undefined && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <House />
            <Link href={`/admin/home/`} >Home</Link>
        </li>
        <li className={`flex w-full gap-2 ${path == "dashboard" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <LayoutDashboard />
            <Link href={`/admin/home/dashboard`} >Dashboard</Link>
        </li>
        <li  className={`flex w-full gap-2 ${path == "users" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <Users />
            <Link href={`/admin/home/users`} >Users</Link>
        </li>
        <li  className={`flex w-full gap-2 ${path == "blogs" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <StickyNote />
            <Link href={`/admin/home/blogs`} >Blogs</Link>
        </li>
        <li  className={`flex w-full gap-2 ${path == "categories" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <ChartColumnStacked />
            <Link href={`/admin/home/categories`} >Categories</Link>
        </li>
        <li  className={`flex w-full gap-2 ${path == "footer" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <Dock />
            <Link href={`/admin/home/footer`} >Footer</Link>
        </li>
        <li  className={`flex w-full gap-2 ${path == "contact" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <NotebookTabs />
            <Link href={`/admin/home/contact`} >Contact</Link>
        </li>
        <li  className={`flex w-full gap-2 ${path == "about" && "bg-primary text-white"} hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all`}>
            <Text />
            <Link href={`/admin/home/about`} >About</Link>
        </li>

    </ul>)
}