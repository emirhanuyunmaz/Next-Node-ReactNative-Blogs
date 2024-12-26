'use client'
import { ChartColumnStacked, Dock, House, LayoutDashboard, NotebookTabs, StickyNote, Text, Users } from "lucide-react"
import Link from "next/link"

export default function LeftBar (){
    return(            <ul className="flex flex-col gap-3">
        <li className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <LayoutDashboard />
            <Link href={`/admin/home/dashboard`} >Dashboard</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <Users />
            <Link href={`/admin/home/users`} >Users</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <StickyNote />
            <Link href={`/admin/home/blogs`} >Blogs</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <House />
            <Link href={`/admin/home/home`} >Home</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <ChartColumnStacked />
            <Link href={`/admin/home/categoies`} >Categories</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <Dock />
            <Link href={`/admin/home/footer`} >Footer</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <NotebookTabs />
            <Link href={`/admin/home/contact`} >Contact</Link>
        </li>
        <li  className="flex w-full gap-2 hover:bg-primary hover:text-white px-2 py-2 rounded-xl transition-all">
            <Text />
            <Link href={`/admin/home/about`} >About</Link>
        </li>

    </ul>)
}