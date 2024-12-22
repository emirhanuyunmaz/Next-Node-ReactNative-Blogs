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
    birthDay:Date,
    address:String
}

const userSchema = new Schema<UserModel>({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profileImage:String,
    isGoogle:Boolean,
    contrat:Boolean,
    birthDay:Date,
    address:String,
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

