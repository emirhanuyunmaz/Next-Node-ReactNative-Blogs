import BlogCard from "./BlogCard";

interface model{
    title:String
}

export default function BlogCardList({title}:model){
    return(<div className="mt-5 ">
            <h2 className="font-bold text-2xl text-gray-800 ">Latest Post</h2>
        <div className="flex flex-wrap gap-8 justify-center mt-5">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>

        </div>
    </div>)
}