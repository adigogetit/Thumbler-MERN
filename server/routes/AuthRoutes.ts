import express from "express";
import { loginUser, logoutUser, registerUser, verifyUser , googleAuthSuccess} from "../controllers/AuthControllers.js";
import protect from "../middleware/auth.js";
import passport from "../configs/passport.js";

const AuthRouter = express.Router();

AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.get('/verify', protect, verifyUser);
AuthRouter.post('/logout', protect, logoutUser);

// GOOGLE AUTH
AuthRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

AuthRouter.get("/google/callback",passport.authenticate("google", { failureRedirect: "/login" }),googleAuthSuccess);

export default AuthRouter;