import parse from 'html-react-parser'
import "./about_style.css"
interface About {
    data:{
        text:String,
        image:String
    }
}

async function getPost() {
    try{
        const res = await fetch(`http://localhost:8000/admin/getAboutPage/`)
        const post: About = await res.json()
        return post.data
    }catch(err){
        console.log("ERRR:::",err);
        return {image:"",text:""}
    }
}


export default async function Page(){
    const data = await getPost()
    
    return(<div className="max-w-7xl min-h-[85vh] flex flex-col mx-auto">
        
        <div className="relative w-full h-[70vh] text-center flex justify-center">
            <img  src={`${data?.image ?  `${process.env.NEXT_PUBLIC_BASE_URL}/${data?.image}` : "/images/not_image.png" }`} alt="About Image" className="w-full" />
        </div>

        <div className="flex items-center flex-col mt-3 gap-3">
            <h1 className="text-5xl font-bold">About</h1>
            <div className='flex flex-col gap-3'>
                {data?.text ? parse(data?.text as string) : <></>}
            </div>
            
        </div>
        
    </div>)
}