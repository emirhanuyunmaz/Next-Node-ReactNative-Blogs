import express ,{ Request , Response } from "express";
import AdminModels from "./model";
import { deleteImage, updateImage, uploadImage } from "../@util";
import AuthModels from "../auth/model";
import Blogs from "../blog/model";
import slugify from "slugify";
const router = express.Router()
const markdown = require("markdown").markdown;

// **********************ADMIN LOGIN ************************//
// Admin girş yapma işlemi
const loginAdmin = async (req:Request,res:Response) => {
    try{
        console.log("Admin giriş :",req.body);
        
        res.status(200).json({succes:true})
    }catch(err) {
        console.log("Admin giriş yaparken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// *******************HOME CAROUSEL IMAGE ADD************************//
// Home sayfasına resim ekleme işlemi
const homeCarouselImageAdd = async (req:Request,res:Response) => {
    try{
        const image = req.body["image"]
        let imageName = await uploadImage(image)
        imageName = process.env.BASE_URL +"/blog/image/"+ imageName
        
        const newImage = new AdminModels.HomeCarousel({
            imageName:imageName
        })
        await newImage.save()
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Home carousel resim eklenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ******************HOME CAROUSEL GET IMAGE********************//
// Resimi güncelleme işlemi .
const homeCarouselGetImages = async(req:Request,res:Response) => {
    try{
        const data = await AdminModels.HomeCarousel.find()
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Home Carousel Image çekilirken bir hata ile karşılaşıldı.",err);
        res.status(200).json({message:err,succes:false})
    }
}

// *****************HOME CAROUSEL UPDATE IMAGE******************//
// Kayıtlı bir resmi güncelleme işlemi .
const homeCarouselUpdateImage = async(req:Request,res:Response) => {
    try{
        const imageId = req.body["imageId"]
        const image = req.body["image"]
        const imageData = await AdminModels.HomeCarousel.findById(imageId)
        const dataImage = {
            imageName:imageData!.imageName,
            image:image
        }
        let newImageName = await updateImage(dataImage)
        newImageName = process.env.BASE_URL +"/blog/image/" +newImageName  
        await AdminModels.HomeCarousel.findByIdAndUpdate(imageId,{imageName:newImageName})
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Home Carousel Resimleri gğncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ****************HOME CAROUSEL DELETE IMAGE***********************//
// Kayıtlı bir resmi silme işlemi
const homeCarouselDeleteImage = async(req:Request,res:Response) => {
    try{
        const imageId = req.body["imageId"]
        console.log("Resim id bilgisi:",imageId);
        const image = await AdminModels.HomeCarousel.findByIdAndDelete(imageId)
        await deleteImage({imageName:image!.imageName})
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Home resim silme işleminde hata .",err);
        res.status(404).json({message:err,succes:false})
    }
}

// **********************HOME PAGE GET INFO****************************//
// Home sayfasındaki verilerin sayısı ve başlık bilgisinin alınması işlemi.
const homePageGetInfo = async (req:Request,res:Response) => {
    try{
        const data = await AdminModels.HomeInfo.find()
        // console.log(data);
        if(data.length === 0 ){
            console.log("Hiç veri girilmemiş");
            
        }else{
            console.log("Veri girilmiş güncelleme yapılacak");
            
        }
        res.status(200).json({succes:true,data:data})
    }catch(err) {
        console.log("Home page blog bilgileri çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ******************HOME PAGE UPDATE INFO ****************************//
// Kullanıcı sayfasına ait düzenlemeleri içerin bilgiler.
const homeInfoUpdate = async (req:Request,res:Response) => {
    try{
        // console.log(".Home page update.");
        const title = req.body["title"]
        const piece = req.body["piece"]
        
        const updateData = await AdminModels.HomeInfo.find()
        // console.log(updateData.length === 0);
        
        if(updateData.length === 0){
            const newData = new AdminModels.HomeInfo({title:title,piece:piece})
            newData.save() 
        }else{
            await AdminModels.HomeInfo.findByIdAndUpdate(updateData[0]._id,{title:title,piece:piece})
        }


        res.status(201).json({succes:true})
    }catch(err){
        console.log("Home page info güncelleme yapılırken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//*************************** GET USER LIST ****************************//
// Kayıtlı olan kullanıcı listesini getirme işlemi.
const getUserList = async(req:Request,res:Response) => {
    try{
        console.log("User list");
        const data = await AuthModels.User.find().select("firstName lastName email")
        // console.log(data);
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Kullanıcı listesi çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//*************************** GET SINGLE USER ****************************//
// Kayıtlı olan kullanıcı listesini getirme işlemi.
const getSingleUser = async(req:Request,res:Response) => {
    try{
        const id = req.params["id"]
        console.log("USER ID :",id);
        
        const data = await AuthModels.User.findById(id)
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Kullanıcı listesi çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//******************************UPDATE USER******************************//
// Kayıtlı kullanıcının bilgilerinin güncellenmesi işlemi
const updateUser = async (req:Request,res:Response) => {
    try{
        console.log("Profil güncelleme işlemi.");
        const id = req.params["id"]
        console.log("USER ID :",id);
        console.log("GELEN VERİ:",req.body)
        const firstName = req.body["firstName"]
        const lastName = req.body["lastName"]
        const email = req.body["email"]
        const address = req.body["address"]
        const password = req.body["password"]
        const birthDay = req.body["birthDay"]

        await AuthModels.User.findByIdAndUpdate(id,{
            firstName:firstName, 
            lastName:lastName,
            email:email,
            address:address,
            password:password,
            birthDay:birthDay
        })

        res.status(201).json({succes:true})
    }catch(err){
        console.log("Kullanıcı güncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}


//******************************UPDATE USER******************************//
// Kayıtlı kullanıcının bilgilerinin güncellenmesi işlemi
const updateUserProfileImage = async (req:Request,res:Response) => {
    try{
        console.log("Profil resmi güncelleme işlemi.");
        const id = req.params["id"]
        const image = req.body["image"]
        // console.log("KULLANICI RESİMİ:",image);
        
        const user = await AuthModels.User.findById(id)
        console.log("USER ::",);
        
        if(user?.profileImage){
            let imageName = await updateImage({imageName:user!.profileImage,image:image})
            imageName = process.env.BASE_URL + "/blog/image/" + imageName  
            await AuthModels.User.findByIdAndUpdate(id,{profileImage:imageName})
        }else{
            let imageName = await uploadImage(image)
            imageName =  process.env.BASE_URL + "/blog/image/" + imageName
            await AuthModels.User.findByIdAndUpdate(id,{profileImage:imageName})
        }
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Kullanıcı güncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//******************************* ADD USER ******************************// 
// Yeni kullanıcı ekleme işlemi.
const addUser = async(req:Request,res:Response) => {
    try{
        const firstName =req.body["firstName"]
        const lastName =req.body["lastName"]
        const email =req.body["email"]
        const password =req.body["password"]
        const isGoogle =req.body["isGoogle"]
        const address =req.body["address"]
        const profileImage = req.body["profileImage"]
        console.log("RESİM:",profileImage);
        let imageName = undefined
        if(profileImage){
            imageName = await uploadImage(profileImage)
            imageName = process.env.BASE_URL +"/blog/image/" + imageName  
        }

        const newUser = new AuthModels.User({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            isGoogle:isGoogle,
            address:address,
            profileImage:imageName
        })
        await newUser.save()
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Kullanıcı ekleme işleminde hata çıktı.",err);
        res.status(404).json({message:err,succes:false})
        
    }
}
//*****************************DELETE USER*******************************//
// Kayıtlı kullanıcı silme işlemi.
const deleteUser = async (req:Request,res:Response) => {
    try{
        const id = req.params["id"]
        const user = await AuthModels.User.findByIdAndDelete(id)
        await deleteImage({imageName:user!.profileImage})
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Kullanıcı silinirken bir hata ile karşılaşıldı.",err)
        res.status(404).json({message:err,succes:false})

        
    }
}
// *********************GET BLOGS LIST **********************************//
// Atılmış blog listesi çekilmesi işlemi.
const getBlogList = async(req:Request,res:Response) => {
    try{
        console.log("Tüm blog listesi çekilmesi işlemi.");
        const data = await Blogs.Blog.find().populate("writer","firstName lastName email").populate("category","name")
        console.log("BLOG LİST:",data);
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Tüm blog listesi çekilirken bir hata ile karşılaşıldı.");
        res.status(404).json({message:err,succes:false})
    }
}

//*************************GET SINGLE BLOG*******************************// 
// Seçilen blog bilgilerinin çekilmesi
const getSingleBlog = async(req:Request,res:Response) => {
    try{
        console.log("Blog çekilmesi işlemi.");
        const id = req.params["id"] 
        // console.log("ID:",id);
        
        const data = await Blogs.Blog.findById(id).populate("writer","firstName lastName email").populate("category","name")
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Tüm blog listesi çekilirken bir hata ile karşılaşıldı.");
        res.status(404).json({message:err,succes:false})
    }
}

// ****************************UPDATE BLOG*******************************//
// Kayıtlı bir blog üzerinde düzenleme işlemi.
const updateBlog = async(req:Request,res:Response) => {
    try{
        const id = req.body["id"]
        console.log("RR:",id);
        const title = req.body["title"]
        const tags = req.body["tags"]
        const category = req.body["category"] 
        const categoryData = await Blogs.Category.find({name:category})
        console.log(categoryData);
        
        const blogText = req.body["blogText"]
        await Blogs.Blog.findByIdAndUpdate(id,{title:title,blogText:blogText,tags:tags,category:categoryData[0]._id,})
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Blog güncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ****************************UPDATE BLOG IMAGE*******************************//
// Kayıtlı bir blog üzerinde resmi düzenleme işlemi.
const updateBlogImage = async(req:Request,res:Response) => {
    try{
        console.log("::Update Blog IMAGE:: ADMIN");
        console.log("Data:",req.body)
        const id = req.body["id"]
        const image = req.body["image"]
        const blogData = await Blogs.Blog.findById(id)

        let newImage = await updateImage({imageName:blogData!.image,image:image})

        newImage = process.env.BASE_URL +"/blog/image/" +newImage 

        await Blogs.Blog.findByIdAndUpdate(id,{image:newImage})

        res.status(201).json({succes:true})
    }catch(err){
        console.log("Blog resmi güncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ********************** DELETE BLOG ******************************//
// Kayıtlı bir blog silme işlemi.
const deleteBlog = async(req:Request,res:Response) => {
    try{
        const id = req.body["id"]
        const blogData = await Blogs.Blog.findById(id)
        await deleteImage({imageName:blogData!.image})
        await Blogs.Blog.findByIdAndDelete(id)
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Blog silme işlemi yapılırken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}


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

//*********************UPDATE CATEGORY************************//
//Kategori düzenleme işlemi.
const updateCategory = async(req:Request,res:Response) => {
    try{
        console.log("kategory ekleme işlemi.");
        
        const categoryId = req.body["id"]
        const category = req.body["category"]
        const categorySlug = slugify(category,"-") 
        await Blogs.Category.findByIdAndUpdate(categoryId,{name:category,slug:categorySlug})
        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Kategori eklerken bir hata ile karşılaşıldı.");
        res.status(404).json({message:err,succes:false})
    }
}

//*********************DELETE CATEGORY************************//
//Kategori silme işlemi.
const deleteCategory = async(req:Request,res:Response) => {
    try{
        console.log("::DELETE::");
        
        const categoryId = req.body["id"]
        console.log(categoryId);
        
        await Blogs.Category.findByIdAndDelete(categoryId)
        res.status(201).json({succes:false})
    }catch(err) {
        console.log("Kategori eklerken bir hata ile karşılaşıldı.");
        res.status(404).json({message:err,succes:false})
    }
}

// *****************GET CATEGORIES********************//
// Kategori listesinin çekilmesi işlemi.
const getCategories = async (req:Request,res:Response) => {
    try{
        console.log(".Tüm kategory listesi .");
        
        const data = await Blogs.Category.find()
        res.status(200).json({succes:true,data:data})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

// **************** FOOTER UPDATE DATA ****************//
// Footer kısmına veri ekleme ve güncelleme işlemi.
const footerUpdateData = async (req:Request,res:Response) => {
    try{
        console.log("Footer data update",req.body);
        const text = req.body["text"]
        const data = await AdminModels.Footer.find()

        if(data.length == 0){
            console.log("Hiçbir veri eklenmemiş");
            const newData = new AdminModels.Footer({
                text:text
            })
            await newData.save()
        }else{
            console.log("Daha önce veri eklenmiş güncelleme yapılacak.");
            const latestData = await AdminModels.Footer.find()
            await AdminModels.Footer.findByIdAndUpdate(latestData[0]._id,{text:text})
        }

        res.status(201).json({succes:true})
    }catch(err) {
        console.log("Footer update err.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ****************** GET FOOTER DATA *********************//
// Footer da ekli olan verilerin çekilmesi işlemi.
const getFooterData = async (req:Request,res:Response) => {
    try{
        const data = await AdminModels.Footer.find() 
        res.status(200).json({succes:true,data:data[0]})
    }catch(err){
        console.log("Footer data çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ********************* GET ABOUT PAGE DATA ****************************//
// About safasına ait verilerin çekilmesi işlemi.
const getAboutData = async(req:Request,res:Response) => {
    try{
        const data = await AdminModels.About.find()
        console.log("DATA:",data);
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("About sayfası bilgi çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ********************* UPDATE ABOUT PAGE DATA ****************************//
// About safasına ait verilerin düzenleme işlemi.
const updateAboutData = async(req:Request,res:Response) => {
    try{
        const data = await AdminModels.About.find()
        console.log("DATA:",data);
        console.log("REQ:",req.body);
        const text = req.body["text"]
        
        if(data.length == 0){
            console.log("Veri eklenememiş");
            const newAboutData = new AdminModels.About({
                text:text
            })
            await newAboutData.save()
            
        }else{
            console.log("Veri eklenmiş");
            const about = await AdminModels.About.find()
            await AdminModels.About.findByIdAndUpdate(about[0]._id,{text:text})
        }
        
        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("About sayfası bilgi güncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

// ********************* UPDATE ABOUT PAGE DATA ****************************//
// About safasına ait verilerin düzenleme işlemi.
const updateAboutImage = async(req:Request,res:Response) => {
    try{
        const data = await AdminModels.About.find()
        console.log("DATA:",data);
        const image = req.body["image"]
        if(data.length == 0){
            let newImageName = await uploadImage(image) 
            newImageName = process.env.BASE_URL +"/blog/image/" + newImageName
            console.log("Veri eklenememiş");
            const newAboutData = new AdminModels.About({
                image:newImageName
            })
            await newAboutData.save()
            
        }else{
            if(data[0].image){
                let newImageName = await updateImage({imageName:data[0].image,image:image}) 
                newImageName = process.env.BASE_URL +"/blog/image/" + newImageName
                await AdminModels.About.findByIdAndUpdate(data[0]._id,{image:newImageName})
            }else{
                let newImageName = await uploadImage(image)
                newImageName = process.env.BASE_URL +"/blog/image/" + newImageName              
                await AdminModels.About.findByIdAndUpdate(data[0]._id,{image:newImageName})
            }
        }

        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("About sayfası resim güncellenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//******************* GET ABOUT PAGE ***********************//
//About sayfasını çekme işlemi. 
const getAboutPage = async (req:Request,res:Response) => {
    try{
        console.log(":About:");
        let data = await AdminModels.About.find()
        console.log(data);
        if(data.length > 0 ){
            console.log("DATA:::",data[0].text);
            if(data[0].text){
                data[0].text = markdown.toHTML( data[0].text )
            }
            res.status(200).json({succes:true,data:data[0]})
        }else{
            res.status(200).json({succes:true,data:data})
        }
        
    }catch(err){
        console.log("About sayfası çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//***********************GET CONTACT************************// 
// Contact verilerinin alınması işlemi.
const getContact = async(req:Request,res:Response) => {
    try{
        const data = await AdminModels.Contact.find()
        res.status(200).json({succes:true,data:data[0]})
    }catch(err){
        console.log("Contact sayfasının verileri çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({succes:false,message:err})
    }
}

//*******************UPDATE CONTACT *************************// 
// Contact verilerinin güncellenmesi işlemi.
const updateContact = async(req:Request,res:Response) => {
    try{
        const data = await AdminModels.Contact.find()
        const email = req.body["email"]
        const location = req.body["location"]
        const phoneNumber = req.body["phoneNumber"]
        const twitterUrl = req.body["twitterUrl"]
        const twitterUrlShow = req.body["twitterUrlShow"]
        const instagramUrl = req.body["instagramUrl"]
        const instagramUrlShow = req.body["instagramUrlShow"]
        const facebookUrl = req.body["facebookUrl"]
        const facebookUrlShow = req.body["facebookUrlShow"]
        if(data.length == 0){
            console.log("Contact data yok");
            const newData = new AdminModels.Contact({
                email:email,
                location:location,
                phoneNumber:phoneNumber,
                facebookUrl:facebookUrl,
                facebookUrlShow:facebookUrlShow,
                instagramUrl:instagramUrl,
                instagramUrlShow:instagramUrlShow,
                twitterUrl:twitterUrl,
                twitterUrlShow:twitterUrlShow
            })
            await newData.save()

        }else{
            console.log("Contact data var");
            await AdminModels.Contact.findByIdAndUpdate(data[0]._id,{
                email:email,
                location:location,
                phoneNumber:phoneNumber,
                facebookUrl:facebookUrl,
                facebookUrlShow:facebookUrlShow,
                instagramUrl:instagramUrl,
                instagramUrlShow:instagramUrlShow,
                twitterUrl:twitterUrl,
                twitterUrlShow:twitterUrlShow
            })
        }

        res.status(201).json({succes:true})
    }catch(err){
        console.log("Contact verileri çekilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

//****************************** DASHBOARD ******************************//
// Kullanıcıların yapmış olduğu işlemleri çekme işlemi. 
const getDashboard = async (req:Request,res:Response) => {
    console.log("::DASHBOARD::");
    
    try{
        const data = await AdminModels.Dashboard.find().populate("userId","firstName lastName email")

        res.status(200).json({succes:true,data:data})
    }catch(err){
        console.log("Dashboard verileri çekililrken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}


// /admin/...
router.route("/login").post(loginAdmin)
router.route("/homeCarouselAddImage").post(homeCarouselImageAdd)
router.route("/homeCarouselUpdateImage").post(homeCarouselUpdateImage)
router.route("/homeCarouselDeleteImage").post(homeCarouselDeleteImage)
router.route("/homeCarouselGetImage").get(homeCarouselGetImages)
router.route("/homeInfo").get(homePageGetInfo)
router.route("/homeInfoUpdate").post(homeInfoUpdate)
router.route("/addUser").post(addUser)
router.route("/deleteUser/:id").post(deleteUser)
router.route("/getUserList").get(getUserList)
router.route("/getSingleUser/:id").get(getSingleUser)
router.route("/updateUser/:id").post(updateUser)
router.route("/updateUserProfileImage/:id").post(updateUserProfileImage)
router.route("/getBlogList").get(getBlogList)
router.route("/updateBlog").post(updateBlog)
router.route("/deleteBlog").post(deleteBlog)
router.route("/updateBlogImage").post(updateBlogImage)
router.route("/getSingleBlog/:id").get(getSingleBlog)
router.route("/addCategory").post(addCategory)
router.route("/updateCategory").post(updateCategory)
router.route("/deleteCategory").delete(deleteCategory)
router.route("/getCategories").get(getCategories)
router.route("/updateFooter").post(footerUpdateData)
router.route("/getFooterData").get(getFooterData)
router.route("/getAboutData").get(getAboutData)
router.route("/updateAboutData").post(updateAboutData)
router.route("/updateAboutImage").post(updateAboutImage)
router.route("/getAboutPage").get(getAboutPage)
router.route("/getContact").get(getContact)
router.route("/updateContact").post(updateContact)
router.route("/getDashboard").get(getDashboard)

export default router