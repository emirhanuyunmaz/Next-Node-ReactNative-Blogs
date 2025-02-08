import express, { Request, Response } from 'express';
import AuthModels from './model';
import JWT from '../@util/jwt';
import AdminModels from '../admin/model';
import crypto from "crypto"
import nodemailer from "nodemailer"
const router = express.Router()
import dotenv from 'dotenv';
dotenv.config()

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
                userId:getUser._id,
                
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
            const tokens = JWT.createToken(String(user._id ))
            
            res.status(201).json({succes:true,access_token:tokens.access_token,refresh_token:tokens.refresh_token})
        }
        else{    
            res.status(404).json({message:"User Not Found",succes:false})
        }
    }catch(err){
        console.log("ERR:",err);
        res.status(404).json({message:err,succes:false})
    }
}

//***************SEND PASSWORD EMAİL***********************// 
//Şifre yenileme için mail gönderme işlemi.
const transporter = nodemailer.createTransport({
    service:"Gmail",
    host: "smtp.gmail.com",
    // secure:true,
    // logger: true,
    // debug: true,
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });   
const sendEmail = async(req:Request,res:Response) => {

    // Gelen şifre gelen veriye göre düzenlenecek veri db kayıt edilecek.

    try{

        const email = req.body["email"]

        const code = crypto.randomUUID()
        var mailOptions = {
            from:process.env.EMAIL ,
            to: email,
            subject: 'Blog Reset Password',
            text: `Reset Passowrd Code: ${code}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

        // expireAt ile işlemin belirlenen sürede silinmesi olanağı tanır (otomatik olarak)
        const newMail = new AuthModels.Mail({
            code:code,
            sendUserEmail:email,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        })
        await newMail.save()
        
        res.status(201).json({succes:true})
    }catch(err){
        console.log("Mesaj gönderilirken bir hata ile karşılaşıldı.",err);
        res.status(404).json({message:err,succes:false})
    }
}

const resetPassword = async(req:Request,res:Response) => {
    try{
        const email = req.body["email"]
        const code = req.body["code"]
        const password = req.body["password"]

        const searchCode = await AuthModels.Mail.find({sendUserEmail:email})

        console.log(email);
        if(searchCode.length != 0){
            
            console.log("Mail Var");
            if(searchCode[0].code == code){
                console.log("Doğru");
                console.log(password);
                await AuthModels.User.findOneAndUpdate({email:email},{password:password})
                res.status(201).json({succes:true})
            }else{
                console.log("Yanliş");
                res.status(404).json({succes:false,message:"Code does not match !"})                
            }

        }else{
            console.log("Mail Yok");
            res.status(404).json({message:"Message not found",succes:false})
        }

    }catch(err) {
        console.log("Reset password işleminde hata çıktı.",err);
        res.status(404).json({message:err,succes:false})
    }
}


router.route("/login").post(login)
router.route("/signup").post(signup)
router.route("/resetPassword").post(sendEmail)
router.route("/resetPasswordControl").post(resetPassword)


export default router;