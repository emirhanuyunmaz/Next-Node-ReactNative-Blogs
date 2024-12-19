import {Request,Response} from "express"
import JWT from "../@util/jwt";

export const authControl = (req:Request,res:Response,next:any) => {
    console.log(":Middleware:")


    try{
        console.log(req.headers);
        
        next()
    }catch(err){
        console.log("MIDDLEWARE ERROR:",err);
        res.status(404).json({message:err,succes:false})
    }
}