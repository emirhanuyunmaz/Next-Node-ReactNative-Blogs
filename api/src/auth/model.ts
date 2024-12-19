import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface UserModel{
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profileImage:String,
    isGoogle:Boolean,
    contrat:Boolean,
    createAt:Date,
}

const userSchema = new Schema<UserModel>({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profileImage:String,
    isGoogle:Boolean,
    contrat:Boolean,
    createAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model<UserModel>("User",userSchema)

const AuthModels = {
    User
}

export default AuthModels

