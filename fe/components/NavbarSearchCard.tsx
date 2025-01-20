import Link from "next/link";


export function NavbarSearchCard({data,setSearch}:{data:any,setSearch:any}) {
  return (<div className="absolute mt-3 bg-white rounded-xl  w-full z-10">
    <ul>
        {
            data.map((item:any) => <li key={item._id} className="border-t border-white ">
            <Link onClick={() => setSearch("")} href={`/blogDetail/${item.slug}`} className="flex items-center gap-3 py-1 px-2 hover:bg-primary rounded-xl transition-all ">
                <div className=" rounded-full">
                    <img className="w-16 h-16 rounded-full" src={item.image} alt="" />
                </div>
                <p>
                    {item.title}
                </p>
            
            </Link>
        </li>)
        }

        

        
    </ul>

  </div>
  )
}
