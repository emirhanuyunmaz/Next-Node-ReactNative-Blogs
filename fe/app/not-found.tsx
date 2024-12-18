import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto min-h-[85vh] bg-[url('/images/not_found.png')] bg-cover flex flex-col justify-between " >
        <div className="relative w-1/3 h-[20vh] mx-auto ">
          <Image src={`/images/404.png`} alt='404 Images' layout='fill' />
        </div>
        <div className='flex flex-col items-center gap-3'>
          <h3 className='text-3xl font-bold text-center'>Not Found</h3>
          <Link href={`/`} className='mb-5 btn-black' >Go Home</Link>
        </div>
    </div>
  )
}