import Image from "next/image";
import Link from "next/link";


export default function Icon(){
    return(<Link href={`/`} className="relative font-bold text-xl flex" >  
    <Image src={`/images/logo.png`} alt="Logo Image" width={52} height={52} />
    Blog</Link>)
}