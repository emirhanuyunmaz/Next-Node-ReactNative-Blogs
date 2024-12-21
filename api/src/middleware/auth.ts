import {Request,Response} from "express"
import JWT from "../@util/jwt";

export const authControl = (req:Request,res:Response,next:any) => {
    console.log(":Middleware:")
    // console.log(req.headers);
    console.log(":Middleware:")


    try{
    
        const access_token = req.headers["access_token"]
        const control = JWT.verifyToken(access_token as string)
        req.headers.id = control.id

        next()
    }catch(err){
        console.log("MIDDLEWARE ERROR:",err);
        res.status(404).json({message:err,succes:false})
    }
}