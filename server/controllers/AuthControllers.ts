import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

// Controllers for user registrations
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' })
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id.toString();

        return res.json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        })

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
}

// Controllers for user login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid eamil aur password' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password || '');
        if(!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid eamil aur password' })
        }

        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();

        return res.json({
            message: 'Login Successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
}

// Controller for user logout
export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((error:any) => {
        if (error){
            console.error(error);
            return res.status(500).json({message: error.message})
        }
    })
    return res.json({
        message: 'Logout Successful'
    })
}

// controller for verifying user
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.session;
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json({user})

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
}

// controller for google auth
export const googleAuthSuccess = async (req: Request, res: Response) => {
    try {
        const user = req.user as any;

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        //store session (same as login)
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();

        // Get the frontend URL from environment or default to localhost
        const frontendURL = process.env.NODE_ENV === "production" 
            ? "https://thumblers.vercel.app" : "http://localhost:5173";

        return res.redirect(`${frontendURL}/?auth=success`);
    } 
    catch (error: any) {
        console.error(error);
        const frontendURL = process.env.NODE_ENV === "production" 
            ? "https://thumblers.vercel.app" : "http://localhost:5173";
        
        return res.redirect(`${frontendURL}/?auth=failed`);
    }
};