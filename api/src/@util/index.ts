import fs from "fs"
import crypto from "crypto"

// Resim kaydetme işlemi.
export const uploadImage = async (image:string) => {
    const imageName = crypto.randomUUID() + ".png"
    const filePath = __dirname+`/../../uploads/${imageName}`
    const newImage = image.split(";base64,").pop() 
    fs.writeFile(filePath,newImage!,{encoding:'base64'},function(err) {
        console.log("REsim :",err);
    })
    return imageName
}

// Resim güncelleme işlemi. 
export const updateImage = async ({imageName,image}:{imageName:String,image:String}) => {
    imageName = imageName.split("/")[5]//Bu işlem resimlerin db de url olarak kayıtlı olduğu için eklendi
    
    const deleteFilePath = __dirname+`/../../uploads/${imageName}`
    // const newImage = image.split(";base64,").pop() 
    fs.rm(deleteFilePath,function(err) {
        console.log("Resim Update:",err);
    })

    const newImageName = crypto.randomUUID() + ".png"
    const newImage = image.split(";base64,").pop() 
    const updateFilePath = __dirname+`/../../uploads/${newImageName}`
    fs.writeFile(updateFilePath,newImage!,{encoding:'base64'},function(err) {
        console.log("REsim :",err);
    })
    return newImageName
}

// Resim güncelleme işlemi. 
export const deleteImage = async ({imageName}:{imageName:String}) => {
    imageName = imageName.split("/")[5]//Bu işlem resimlerin db de url olarak kayıtlı olduğu için eklendi
    const deleteFilePath = __dirname+`/../../uploads/${imageName}`
    // const newImage = image.split(";base64,").pop() 
    fs.rm(deleteFilePath,function(err) {
        console.log("Resim Update:",err);
    })   
}