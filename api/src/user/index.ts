import express ,{Request,Response} from "express"
import { authControl } from "../middleware/auth"
import AuthModels from "../auth/model";
import AdminModels from "../admin/model";
import { updateImage} from "../@util";
import Stripe from "stripe";
import dotenv from 'dotenv';
import crypto from "crypto"
dotenv.config()
                  
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
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

//*****************USER PREMIUM ADD*******************// 
// Kullanıcının premium satın alma işlemi.
const buyPremium = async(req:Request,res:Response,next:any) => {
    try{
        const lineItems = [{
            price_data:{
                currency:"usd",
                product_data:{name:"Premium Blog"},
                unit_amount:Math.floor(10*100),
            }, 
                quantity:1
            },
        ]
        
        const id = req.headers.id
        
        const session_id = crypto.randomUUID() 
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:`http://localhost:3000/success?session_id=${session_id}`
        })

        const newPaymentControl = new AuthModels.PaymentControl({
            userId:id,
            code:session_id
        })

        await newPaymentControl.save()
        res.status(201).json({succes:true,id:session.id,url:session.url})
    }catch(err){
        console.log("Kullanıcı premium alma işleminde hata ile karşılalıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

const checkPayment = async (req:Request,res:Response) => {

    try{
        const session_id = req.body["session_id"]
        // console.log("Payment:",req.body["session_id"]);
        
        const id = req.headers.id
        
        const code = await AuthModels.PaymentControl.findOneAndDelete({userId:id})
        // console.log(session_id);
        

        if(session_id != null && code?.code == session_id){
            // console.log("ASDDSA:::::",code?.code == session_id);
            
            await AuthModels.User.findByIdAndUpdate(id,{isPremium:true})
            res.status(201).json({succes:true})
        }else{
            res.status(404).json({succes:true})
        }
    }catch(err){
        console.log("Premium işaretlenirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({succes:false})
    }
    
} 

router.route("/userProfile").get(authControl,userProfileDetail)
router.route("/updateProfile").post(authControl,userProfileUpdate)
router.route("/updateProfileImage").post(authControl,userProfileImageUpdate)
router.route("/buyPremium").post(authControl,buyPremium)
router.route("/checkPayment").post(authControl,checkPayment)

export default router