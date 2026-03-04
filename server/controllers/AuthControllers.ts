import { Request,Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

// Controllers for user registrations
export const registerUser = async (req:Request , res:Response)=>{
    try {
        const {name,email,password} = req.body;

        // find user by email
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:'User already exists with this email'})
        }

    } catch (error) {
        
    }
}