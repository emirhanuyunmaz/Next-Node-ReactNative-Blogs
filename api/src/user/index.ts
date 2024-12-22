import express ,{Request,Response} from "express"
import { authControl } from "../middleware/auth"
import AuthModels from "../auth/model";

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
        console.log(body);
        await AuthModels.User.findByIdAndUpdate(userID,body)
        // console.log("Kullanıcı bilgisi :",user)
        res.status(201).json({succes:true})
    }catch(err){
        res.status(404).json({message:err,succes:false})
    }
}

router.route("/userProfile").get(authControl,userProfileDetail)
router.route("/updateProfile").post(authControl,userProfileUpdate)


export default router