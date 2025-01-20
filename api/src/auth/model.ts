import mongoose from "mongoose";

const Schema = mongoose.Schema;

//*****PAYMENT CONTROL ****// 
interface PaymentControlModel {
    userId:String,
    code:String
}

const paymentControlSchema = new Schema<PaymentControlModel>({
    userId:String,
    code:String,
})

//******SEND EMAIL RESET PASSWORD**********// 
interface MailModel{
    sendUserEmail:String,
    code:String,
    createAt:Date,
    expiresAt:Date
}

const mailSchema = new Schema<MailModel>({
    sendUserEmail:String,
    code:String,
    expiresAt:{
        type:Date,
        index: { expires: 0 }
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

//******* USER MODEL*********// 
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
    address:String,
    isPremium:Boolean
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
    isPremium:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model<UserModel>("User",userSchema)
const Mail = mongoose.model<MailModel>("Mail",mailSchema)
const PaymentControl = mongoose.model<PaymentControlModel>("PaymentControl",paymentControlSchema)
const AuthModels = {
    User,
    Mail,
    PaymentControl
}

export default AuthModels

