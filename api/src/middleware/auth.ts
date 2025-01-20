import {Request,Response} from "express"
import JWT from "../@util/jwt";

export const authControl = (req:Request,res:Response,next:any) => {
  
    try{
        // console.log("ASSDD");
        
        const access_token = req.headers["access_token"]
        const control = JWT.verifyToken(access_token as string)
        // console.log(control);
        req.headers.id = control.id
        
        next()
    }catch(err){
        console.log("MIDDLEWARE ERROR:",err);
        res.status(401).json({message:err,succes:false})
    }
}