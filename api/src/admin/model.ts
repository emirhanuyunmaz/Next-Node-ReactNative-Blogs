import mongoose from "mongoose";

const Schema = mongoose.Schema

// **************** HOME CAROUSEL USER ****************** //
interface HomeCarouselModel{
    imageName:String
}
const homeCarouselSchema = new Schema<HomeCarouselModel>({
    imageName:String
})

// **************** HOME CAROUSEL USER ****************** //
interface HomeInfoModel {
    piece:Number,
    title:String
    createAt:Date
}

const homeInfoSchema = new Schema<HomeInfoModel>({
    title:String,
    piece:Number,
    createAt:{
        type:Date,
        default:Date.now()
    }
})

// ****************** ADMIN USER ********************** //
interface AdminUserModel {
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profileImage:String,
}

const AdminUserScheam = new Schema<AdminUserModel>({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profileImage:String,
})

// ****************** ABOUT ********************** //
interface AboutModel {
    image:String,
    text:String,
}

const AboutSchema = new Schema<AboutModel>({
    image:String,
    text:String
})
// ****************** DASHBOARD ********************** //
interface DashboardModel{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    action:String,
    createAt:Date,
}

const DashboardSchema = new Schema<DashboardModel>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    action:String,
    createAt:{
        type:Date,
        default:Date.now()
    }
})

// ****************** FOOTER ********************** //
interface FooterModel {
    text:String
}

const FooterSchema = new Schema<FooterModel>({
    text:String
})

// ****************** CONTACT ********************** //
interface ContactModel{
    phoneNumber:String,
    location:String,
    email:String,
    twitterUrl:String,
    twitterUrlShow:Boolean,
    instagramUrl:String,
    instagramUrlShow:Boolean,
    facebookUrl:String,
    facebookUrlShow:Boolean,
}

const ContactSchema = new Schema<ContactModel>({
    email:String,
    location:String,
    phoneNumber:String,
    facebookUrl:String,
    facebookUrlShow:{
        type:Boolean,
        default:false
    },
    instagramUrl:String,
    instagramUrlShow:{
        type:Boolean,
        default:false
    },
    twitterUrl:String,
    twitterUrlShow:{
        type:Boolean,
        default:false
    },
})

const HomeCarousel = mongoose.model<HomeCarouselModel>("HomeCarousel",homeCarouselSchema)
const HomeInfo = mongoose.model<HomeInfoModel>("HomeInfo",homeInfoSchema)
const AdminUser = mongoose.model<AdminUserModel>("AdminUser",AdminUserScheam)
const About = mongoose.model<AboutModel>("About",AboutSchema)
const Dashboard = mongoose.model<DashboardModel>("Dashboard",DashboardSchema)
const Footer = mongoose.model<FooterModel>("Footer",FooterSchema)
const Contact = mongoose.model<ContactModel>("Contact",ContactSchema)

const AdminModels = {
    HomeCarousel,
    HomeInfo,
    AdminUser,
    About,
    Dashboard,
    Footer,
    Contact,
    
}
export default AdminModels