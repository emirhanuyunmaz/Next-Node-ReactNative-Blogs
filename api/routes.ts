import express, { Application }  from "express"
import dotenv from 'dotenv';
import cors from "cors"
import authRouter from "./src/auth"
const app:Application = express()
// const app:Application = express();

dotenv.config() //.env dosyası için gerekli

app.use(cors())
app.use(express.json()) //Gelen verileri json formatinda alınabilmesini sağlar.
app.use('/uploads', express.static('uploads'))


app.use("/auth",authRouter)

export default app;