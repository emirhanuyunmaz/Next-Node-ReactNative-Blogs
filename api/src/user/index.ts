import express ,{Request,Response} from "express"
import { authControl } from "../middleware/auth"
import AuthModels from "../auth/model";
import AdminModels from "../admin/model";
import { updateImage, uploadImage } from "../@util";

const router = express.Router()

// ******************USER DETAİL***************** //
//Kullanıcı profil detay bilgisi.
const userProfileDetail = async (req:Request,res:Response) => {
    try{
        // console.log("Kullanıcı ID bilgisi:",req.headers.id);
        const userID = req.headers.id
        const user = await AuthModels.User.findById(userID)
        // console.log("Kullanıcı bilgisi :",user)
        res.status(201).json({succes:true,data:user})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

// *********************PROFILE UPDATE*************************** //
//Kullanıcı profil güncelleme işlemi.
const userProfileUpdate = async (req:Request,res:Response) => {
    try{
        console.log("Update profile");
        // console.log("Kullanıcı ID bilgisi:",req.headers.id);
        const userID = req.headers.id
        const {body} = req
        await AuthModels.User.findByIdAndUpdate(userID,body)
        
        const newDashboard = new AdminModels.Dashboard({
            userId:userID,
            action:"Update Profile"
        })
        await newDashboard.save()
        res.status(201).json({succes:true})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

// ********************* USER UPDATE PROFILE IMAGE ***********************//
// Kullanıcı profil resmi güncelleme işlemi.
const userProfileImageUpdate = async(req:Request,res:Response) => {
    try{
        const id = req.headers.id
        const image = req.body["image"]
        
        const user = await AuthModels.User.findById(id)
        let imageName = await updateImage({image:image , imageName:user!.profileImage})
        imageName = process.env.BASE_URL +"/blog/image/"+ imageName
        await AuthModels.User.findByIdAndUpdate(id,{profileImage:imageName})
        const newDashboard = new AdminModels.Dashboard({
            userId:id,
            action:"Update Profile"
        })
        await newDashboard.save()
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Kullanıcı profil resmi güncellenirken bi,r hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

router.route("/userProfile").get(authControl,userProfileDetail)
router.route("/updateProfile").post(authControl,userProfileUpdate)
router.route("/updateProfileImage").post(authControl,userProfileImageUpdate)


export default router