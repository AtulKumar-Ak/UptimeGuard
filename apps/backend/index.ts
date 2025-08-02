import express from 'express';
const app=express();
import PrismaClient from "db/client"
import {AuthInput} from "./types";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authmiddleware } from './middleware';
import cors from 'cors';
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.send("hello world")
})
app.post('/user/signup',async(req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        res.status(400).send("Username and password are required");
        return;
    }
    const ParsedInput=AuthInput.safeParse(req.body);
    if(!ParsedInput.success){
        res.status(400).send("Invalid input");
        return;
    }
    try{
        const user=await PrismaClient.user.create({
            data:{
                username:username,
                password:await bcrypt.hash(password,10),
            }
        })
        res.status(201).json({
            id:user.id,
            username:user.username,
        });
        return
    }
    catch(e){
        console.log(e);
        res.status(500).send("Internal Server Error");
        return
    }
})
app.post('/user/signin',async(req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        res.status(400).send("Username and password are required");
        return;
    }
    const ParsedInput=AuthInput.safeParse(req.body);
    if(!ParsedInput.success){
        res.status(400).send("Invalid input");
        return;
    }
    try{
        const user=await PrismaClient.user.findUnique({
            where:{
                username:username
            }
        })
        if(!user){
            res.status(404).send("User not found");
            return;
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(401).send("Invalid password");
            return;
        }
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET!)
        res.status(200).json({
            token:token,
        });
    }
    catch(e){
        res.status(500).send("Internal Server Error");
        return;
    }
})

app.post('/website',authmiddleware, async (req, res) => {
    const url= req.body.url;
    if(!url) {
        res.status(400).send("URL is required");
        return
    }
    try{
        const website=await PrismaClient.website.create({
            data:{
                url:url,
                createdAt:new Date(),
                userId:req.userId!
            }
        })
        console.log("hereagain");
        res.status(201).json({
            id:website.id,
        });
    }catch(e){
        res.status(500).send("Internal Server Error");
    }
})
app.get('/status/:websiteId',authmiddleware,async(req,res)=>{
    const websiteId=req.params.websiteId;
    if(!websiteId){
        res.status(400).send("Website ID is required");
        return
    }
    try{
        const website=await PrismaClient.website.findUnique({
            where:{
                id:websiteId,
                userId:req.userId!
            },include:{
                ticks:{
                    orderBy:{
                        createdAt:'desc'
                    },
                    take:1
                }
            }
        })
        if(!website){
            res.status(404).send("Website not found");
            return
        }
        res.status(200).json({
            website
        })
        
    }catch(e){
        res.status(500).send("Internal Server Error");
    }
})
app.get('/websites',authmiddleware,async(req,res)=>{
    try{
        const websites=await PrismaClient.website.findMany({
            where:{
                userId:req.userId!
            }
        })
        res.status(200).json({
            websites
        })
    }catch(e){
        res.status(500).send("Internal Server Error");
    }
})
app.listen(process.env.PORT||3000);