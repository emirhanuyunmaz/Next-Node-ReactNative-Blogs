'use client'
import Image from "next/image";
import TicketText from "./TicketText";
import Link from "next/link";

export default function BlogCard(){
    return(<Link href={`/blogDetail`} className="md:w-96 hover:shadow-2xl flex flex-col  justify-center items-center gap-2 border-2  p-2 rounded-xl transition-all ">
        <div className="relative w-[22rem] h-56 ">
            <Image loader={() => "https://picsum.photos/seed/picsum/1200/800"} src={"https://picsum.photos/seed/picsum/1200/800"} alt="" layout="fill" className="rounded-xl" />
        </div>
        <div className="w-full ms-5">
            <TicketText>Teknology</TicketText>
        </div>
        <h4 className="font-bold text-xl w-full ms-3">
            Lorem ipsum dolor sit amet.
        </h4>

        <div className="flex gap-2 items-center w-full ms-3 ">
            <div className="relative w-10 h-10 rounded-full">
                <Image loader={() => "https://picsum.photos/seed/picsum/1200/800"} src={"https://picsum.photos/seed/picsum/1200/800"} alt="" layout="fill" className="rounded-full" />
            </div>
            <p className="text-sm text-primary">User Name</p>
            <p className="text-sm text-primary">12/12/2024</p>
        </div>
    </Link>)
}