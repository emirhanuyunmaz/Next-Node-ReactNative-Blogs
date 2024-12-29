import parse from 'html-react-parser'
import "./about_style.css"
interface About {
    data:{
        text:String,
        image:String
    }
}

async function getPost() {
    const res = await fetch(`http://localhost:8000/admin/getAboutPage/`)
    const post: About = await res.json()
    return post.data
}


export default async function Page(){
    const data = await getPost()
    
    return(<div className="max-w-7xl min-h-[85vh] flex flex-col mx-auto">
        
        <div className="relative w-full h-[70vh] text-center flex justify-center">
            <img  src={`${data.image}`} alt="About Image" className="w-full" />
        </div>

        <div className="flex items-center flex-col mt-3 gap-3">
            <h1 className="text-5xl font-bold">About</h1>
            {parse(data.text as string)}
            
        </div>
        
    </div>)
}