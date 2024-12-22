import mongoose from "mongoose";

const Scheama = mongoose.Schema

interface CategoryModel{
    name:String
}


const CategorySchema = new Scheama<CategoryModel>({
    name:String
})


interface BlogModel {
    title:String,
    image:String,
    tags:[],
    writer:String,
    category:String,

}

const BlogSchema = new Scheama<BlogModel>({
    title:String,
    image:String,
    tags:[],
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },

})

const Category = mongoose.model<CategoryModel>("Category",CategorySchema)

const Blog = mongoose.model("Blog",BlogSchema)

const Blogs = {
    Category,
    Blog
}

export default Blogs