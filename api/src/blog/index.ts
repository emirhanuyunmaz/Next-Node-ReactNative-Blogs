import express,{Request,Response} from "express"
import { authControl } from "../middleware/auth";
import path from "path"
import slugify from "slugify";
import { deleteImage, updateImage, uploadImage } from "../@util";
import Blogs from "./model";
import crypto from "crypto"
import AdminModels from "../admin/model";
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

//******************GET ALL BLOG***********************// 
//Tüm blog listesini çekme işlemi.
const getAllBlog = async(req:Request,res:Response) => {
    try{
        const data = await Blogs.Blog.find().populate("writer","firstName lastName profileImage").populate("category","name")
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Tüm blog listesi çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//********************GET CATEGORY BLOG****************// 
// Kategori olarak blog listesi çekilmesi işlemi .
const getCategoryBlogs = async(req:Request,res:Response) => {
    try{
        console.log("Category Name Blog listesi :");
        
        const categoryName = req.params["categoryName"]
        // console.log(categoryName);
        
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
//**************************GET SEARCH BLOGS**************************// 
// Blog title bilgisine göre arama işlemi.
const getSearchBlogs = async (req:Request,res:Response) => {
    try{
        const search = req.params.search
        console.log("SS:",search);
        
        const data =await Blogs.Blog.find({$or:[
            {title:{ $regex: `${search}`, $options: 'i' }},
        ]}).select("title image slug")

        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Blog arama işlemi yapılırken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}


// ********************ADD BLOG ********************//
// Blog Kaydetme işlemi
const addBlog = async (req:Request,res:Response) => {
    
    try{
        let image = await uploadImage(req.body.image)
        image = "update/"+ image
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

        const newDashboard = new AdminModels.Dashboard({
            userId:userId,
            action:"Add Blog",
        })
        await newDashboard.save()

        res.status(201).json({succes:true})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

//********************GET USER BLOG LIST******************// 
// Kullanıcı tarafından yazılan blog listesini getirme işlemi.
const getUserBlogList = async (req:Request,res:Response) => {
    try{

        const id = req.headers.id
        const userBlogList = await Blogs.Blog.find({writer:id}).populate("writer","profileImage firstName lastName createdAt").populate("category","name")
        
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
        data!.blogText = markdown.toHTML( data!.blogText )
        // console.log(data?.blogText);
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Blog çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//*****************USER BLOG UPDATE*************************// 
// Kullanıcı blog güncelleme işlemi.
const updateBlog = async(req:Request,res:Response) => {
    try{
        const slug = req.body["slug"]
        console.log("RR:",slug);
        const blogData = await Blogs.Blog.find({slug:slug})
        const title = req.body["title"]
        const tags = req.body["tags"]
        const category = req.body["category"] 
        const categoryData = await Blogs.Category.find({name:category})
        const blogText = req.body["blogText"]
        await Blogs.Blog.findByIdAndUpdate(blogData[0]._id,{title:title,blogText:blogText,tags:tags,category:categoryData[0]._id,})

        const newDashboard = new AdminModels.Dashboard({
            userId:blogData[0].writer,
            action:"Update Blog",
        })
        await newDashboard.save()
        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Kullanıcı blog göncelleme işleleminde hata.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//******************UPDATE BLOG IMAGE ****************************// 
// Blog resmi güncelleme işlemi .
const updateBlogImage = async (req:Request,res:Response) => {
    console.log(":BLOG GÜNCELLEME:");
    
    try{
        const slug = req.params.slug
        console.log("REQ:",req.body);
        const image = req.body.image
        const blog = await Blogs.Blog.find({slug:slug})

        let newBlogImage = await updateImage({imageName:blog[0].image,image:image})
        newBlogImage = process.env.BASE_URL +"/blog/image/"+ newBlogImage
        await Blogs.Blog.findByIdAndUpdate(blog[0]._id,{image:newBlogImage})

        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Blog resmi güncellenirklen bir hata ile karşılaşıldı.",err);
        res.status(404).json({succes:false})
    }
}

//*****************USER GET BLOG UPDATE*************************// 
// Kullanıcı blog güncelleme işlemi için blog bilgisini alma işlemi.
const getUpdateBlog = async(req:Request,res:Response) => {
    try{
        const blogSlug = req.params["slug"]
        const data = await Blogs.Blog.findOne({slug:blogSlug}).populate("writer","firstName lastName profileImage").populate("category","name")
        // console.log(data?.blogText);
        res.status(200).json({succes:true,data:data})
    }catch(err) {
        console.log("Kullanıcı blog göncelleme işleleminde hata.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// **********************DELETE BLOG*******************//
// Kayıtlı bir blog bilgisini silme işlemi.
const deleteBlog = async (req:Request,res:Response) => {
    
    try{
        const id = req.params.id
        const blogData = await Blogs.Blog.findById(id)
        await deleteImage({imageName:blogData!.image})
        await Blogs.Blog.findByIdAndDelete(id)  
        const newDashboard = new AdminModels.Dashboard({
            userId:blogData!.writer,
            action:"Delete Blog",
        })
        await newDashboard.save()      
        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Blog silinirken bir hata ile karşılaşıldı.",err);
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


router.route("/getAllBlog").get(getAllBlog)
router.route("/addBlog").post(authControl,addBlog)
router.route("/updateBlog").post(updateBlog)
router.route("/updateBlogImage/:slug").post(updateBlogImage)
router.route("/getBlog/:name").get(getSingleBlog)
router.route("/searchBlog/:search").get(getSearchBlogs)
router.route("/deleteBlog/:id").delete(deleteBlog)
router.route("/addCategory").post(addCategory)
router.route("/getCategories").get(getCategories)
router.route("/getUpdateBlog/:slug").get(getUpdateBlog)
router.route("/getCategoryBlogs/:categoryName").get(getCategoryBlogs)
router.route("/getBlogs").get(authControl,getUserBlogList)
router.route("/image/:name").get(getImage)

export default router