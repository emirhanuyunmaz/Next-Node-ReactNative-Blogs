import express, { Request, Response , Application } from 'express';
import AuthModels from './model';
import JWT from '../@util/jwt';
import AdminModels from '../admin/model';
const router = express.Router()

//***************** SIGN UP USER *****************//
// Kullanıcı kayıt etme işlemi .
const signup = async (req:Request,res:Response) => {
    
    console.log("Kayıt Olma işlemi.");
    console.log(req.body);
    
    try{
        const control = await AuthModels.User.findOne({email:req.body.email})
        const isGoogle = req.body["isGoogle"]
        // console.log(control == null);

        if(control == null){
            const data = req.body 
            const newUser = new AuthModels.User(data)
            const getUser = await newUser.save()
            console.log("YENİ KULLANICI :",getUser);
            const tokens = JWT.createToken(String(getUser._id ))
            console.log("TOKENS:",tokens);
            const newDashboard = new AdminModels.Dashboard({
                action:"Register User",
                userId:getUser._id
            })
            await newDashboard.save()
            res.status(201).json({succes:true,access_token:tokens.access_token,refresh_token:tokens.refresh_token})
        }else{
            console.log("Zaten var olan bir kullanıcı::",control);
            if(isGoogle == true){
                const tokens = JWT.createToken(String(control._id ))
                console.log("TOKEN :",tokens);
                res.status(201).json({succes:true,access_token:tokens.access_token,refresh_token:tokens.refresh_token})
            }else{
                res.status(403).json({message:"Already existing user",succes:false})
            }
        }
    }catch(err){
        console.log("ERR:",err);
        res.status(404).json({message:err,succes:false})
    }
}

//***************** LOGIN *****************//
// Kullanıcı giriş yapma işlemi.
const login = async (req:Request,res:Response) => {
    console.log("GİRİŞ İŞLEMİ ");
    console.log(req.body);
    
    try{
        const email = req.body["email"]
        const password = req.body["password"]
        const user = await AuthModels.User.findOne({email:email,password:password})
        
        console.log("UUU:",user);
        if(user !== null){
            const data = JWT.createToken(String(user._id ))
            console.log(data);
            
            res.status(201).json({succes:true})
        }
        else{    
            res.status(404).json({message:"User Not Found",succes:false})
        }
    }catch(err){
        console.log("ERR:",err);
        res.status(404).json({message:err,succes:false})
    }
}


router.route("/login").post(login)
router.route("/signup").post(signup)

export default router;