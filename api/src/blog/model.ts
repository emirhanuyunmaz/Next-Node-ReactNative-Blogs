import mongoose from "mongoose";
const Scheama = mongoose.Schema

interface CategoryModel{
    name:String,
    slug:String
}


const CategorySchema = new Scheama<CategoryModel>({
    name:String,
    slug:String

})


interface BlogModel {
    title:String,
    image:String,
    blogText:String,
    tags:[],
    writer:String,
    category:String,
    slug: { type: String, slug: "title" }
}

const BlogSchema = new Scheama<BlogModel>({
    title:String,
    image:String,
    blogText:String,
    tags:[],
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    slug: { type: String, slug: "title" , unique:true }

})

const Category = mongoose.model<CategoryModel>("Category",CategorySchema)

const Blog = mongoose.model("Blog",BlogSchema)

const Blogs = {
    Category,
    Blog
}

export default Blogs