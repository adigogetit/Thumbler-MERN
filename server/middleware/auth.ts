import { Request, Response, NextFunction } from "express";


export const protect = async (req: Request, res: Response, next:NextFunction) => {
    const {isLoggedIn, userId} = req.session;
    
    if(!isLoggedIn || !userId){
        return res.status(401).json({ message: 'You are Not Logged in' })
    }
    next();
}   
export default protect