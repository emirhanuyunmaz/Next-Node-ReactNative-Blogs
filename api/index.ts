import express, { Request, Response , Application } from 'express';
import mongoose from 'mongoose';
import app from "./routes"
// const app: Application = express();
const port = process.env.PORT || 8000;
const  slug = require("mongoose-slug-generator")
async function main(){
  try{
    
    mongoose.plugin(slug)
    await mongoose.connect(`${process.env.DB_URL}`).then(() => console.log(`DB_URL : ${process.env.DB_URL} `))
    
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

