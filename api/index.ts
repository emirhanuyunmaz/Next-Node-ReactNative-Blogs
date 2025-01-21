import express, { Request, Response , Application } from 'express';
import mongoose from 'mongoose';
import app from "./routes"
import AdminModels from './src/admin/model';
// const app: Application = express();
const port = process.env.PORT || 8000;
const  slug = require("mongoose-slug-generator")
async function main(){
  try{
    
    // mongoose.plugin(slug)
    await mongoose.connect(`${process.env.DB_URL}`).then(() => console.log(`DB_URL : ${process.env.DB_URL} `))
    
    const adminUser =await AdminModels.AdminUser.find()
    if(adminUser.length == 0){
      const newAdmin = new AdminModels.AdminUser({
        email:"admin@admin.com",
        firstName:"Admin",
        lastName:"Admin",
        password:"Admin",
      })
      await newAdmin.save()
    }

    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });

  }catch(err){
    console.log("ERROR:",err);
  }
}

main()


app.get('/', (req: Request, res: Response) => {
  res.send('<h1> TypeScript Server</h1>');
});

