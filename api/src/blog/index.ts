import express,{Request,Response} from "express"
import { authControl } from "../middleware/auth";
import path from "path"
import { uploadImage } from "../@util";
import Blogs from "./model";

const router = express.Router()

//*********************ADD CATEGORY************************//
//Kategori ekleme işlemi.
const addCategory = async(req:Request,res:Response) => {
    try{
        const category = req.body["category"]
        const newCategory = new Blogs.Category({
            name:category
        })
        await newCategory.save()
        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Kategori eklerken bir hata ile karşılaşıldı.");
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

        const newBlog = new Blogs.Blog({
            category:"676823582bf543f8524584b8",
            tags:tags,
            title:title,
            writer:userId,
            image:image
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
        console.log("Kullanıcı ID bligisi :",req.headers.id);
        const id = req.headers.id
        const userBlogList = await Blogs.Blog.find({writer:id}).populate("writer","profileImage firstName lastName").populate("category","name")
        console.log("BLOGS:",userBlogList);
        
        res.status(201).json({succes:true,data:userBlogList})
    }catch(err){
        res.status(404).json({message:false,succes:false})
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
router.route("/addCategory").post(authControl,addCategory)
router.route("/getBlogs").get(authControl,getUserBlogList)
router.route("/image/:name").get(getImage)
export default router