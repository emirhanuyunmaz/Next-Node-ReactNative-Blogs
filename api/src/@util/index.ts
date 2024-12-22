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