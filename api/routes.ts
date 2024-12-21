import express, { Application }  from "express"
import dotenv from 'dotenv';
import cors from "cors"
import authRouter from "./src/auth"
import userRouter from "./src/user"
const app:Application = express()
// const app:Application = express();

dotenv.config() //.env dosyası için gerekli

app.use(cors())
app.use(express.json()) //Gelen verileri json formatinda alınabilmesini sağlar.
app.use('/uploads', express.static('uploads'))


app.use("/auth",authRouter)
app.use("/user",userRouter)

export default app;