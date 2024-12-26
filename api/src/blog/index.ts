import express,{Request,Response} from "express"
import { authControl } from "../middleware/auth";
import path from "path"
import slugify from "slugify";
import { uploadImage } from "../@util";
import Blogs from "./model";
import crypto from "crypto"
const markdown = require( "markdown" ).markdown;

const router = express.Router()

//*********************ADD CATEGORY************************//
//Kategori ekleme işlemi.
const addCategory = async(req:Request,res:Response) => {
    try{
        const category = req.body["category"]
        const categorySlug = slugify(category,"-") 
        const newCategory = new Blogs.Category({
            name:category,
            slug:categorySlug
        })
        await newCategory.save()
        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Kategori eklerken bir hata ile karşılaşıldı.");
        res.status(404).json({message:err,succes:false})
    }
}

// *****************GET CATEGORIES********************//
// Kategori listesinin çekilmesi işlemi.
const getCategories = async (req:Request,res:Response) => {
    try{
        const data = await Blogs.Category.find()

        res.status(200).json({succes:true,data:data})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

const getCategoryBlogs = async(req:Request,res:Response) => {
    try{
        console.log("Category Name Blog listesi :");
        
        const categoryName = req.params["categoryName"]
        console.log(categoryName);
        
        const category = await Blogs.Category.find({slug:categoryName})
        // console.log("CATE",category);
        
        const data = await Blogs.Blog.find({category:category[0]._id}).populate("writer","firstName lastName profileImage ").populate("category","name")
        console.log("DATA:",data);
        
        res.status(200).json({succes:true , data:data})
    }catch(err){
        console.log("Kategori Blog listesi çekilirken bir hata ile karşılaşşıld.",err);
        
        res.status(404).json({message:err,succes:false})
    }
}

// ********************ADD BLOG ********************//
// Blog Kaydetme işlemi
const addBlog = async (req:Request,res:Response) => {
    
    try{
        let image = await uploadImage(req.body.image)
        image = process.env.BASE_URL +"/blog/image/"+ image
        const tags= req.body["tags"]
        const title = req.body["title"]
        const userId = req.headers["id"]
        const category = req.body["category"]
        const blogText = req.body["blogText"]
        let slug = slugify(title)
        const categoryData = await Blogs.Category.findOne({name:category})
        console.log(categoryData);
        
        // Daha önce bu slug bilgisi eklenmiş mi
        const getSlugData =await Blogs.Blog.find({slug:slug})
        
        // Slug bilgisine random değer ekleme işlemi.
        if(getSlugData){
            slug = slug +"-"+ crypto.randomUUID()
        }


        const newBlog = new Blogs.Blog({
            category:categoryData!._id,
            tags:tags,
            title:title,
            writer:userId,
            image:image,
            slug:slug,
            blogText:blogText
        })

        await newBlog.save()
        res.status(201).json({succes:true})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

//********************GET USER BLOG LIST******************// 
// Kullanıcı tarafından yazılan blog listesini getirme işlemi.
const getUserBlogList = async (req:Request,res:Response) => {
    try{
        // console.log("Kullanıcı ID bligisi :",req.headers.id);
        const id = req.headers.id
        const userBlogList = await Blogs.Blog.find({writer:id}).populate("writer","profileImage firstName lastName").populate("category","name")
        // console.log("BLOGS:",userBlogList);
        
        res.status(201).json({succes:true,data:userBlogList})
    }catch(err){
        res.status(404).json({message:false,succes:false})
    }
}

// ********************GET SINGLE BLOG **********************//
// Bir blog bilgilerinin çekilmesi işlemi.
const getSingleBlog = async (req:Request,res:Response) => {
    try{        
        const blogSlug = req.params["name"]
        let data = await Blogs.Blog.findOne({slug:blogSlug}).populate("writer","firstName lastName profileImage").populate("category","name")
        data!.blogText = markdown.toHTML( data?.blogText )
        // console.log(data?.blogText);
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

//************************GET IMAGE********************// 
//Resmin url ile çekilmesi işlemi.
const getImage = async(req:Request,res:Response) => {
    try{
        const name = req.params["name"]
        res.sendFile(path.join(__dirname, `/../../uploads/${name}`));
        // res.status(201).json({succes:true})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}



router.route("/addBlog").post(authControl,addBlog)
router.route("/getBlog/:name").get(getSingleBlog)
router.route("/addCategory").post(authControl,addCategory)
router.route("/getCategories").get(getCategories)
router.route("/getCategoryBlogs/:categoryName").get(getCategoryBlogs)
router.route("/getBlogs").get(authControl,getUserBlogList)
router.route("/image/:name").get(getImage)
export default router