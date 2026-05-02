import express, { Request, Response } from 'express';
import cors from "cors";
import "dotenv/config";
import connectDB from './configs/db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import AuthRouter from './routes/AuthRoutes.js';
import ThumbnailRouter from './routes/ThumbnailRoutes.js';
import UserRouter from './routes/UserRoutes.js';
import passport from './configs/passport.js';

declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string
    }
}

await connectDB();

const app = express();

// Get CORS origins based on environment
const getCORSOrigins = () => {
    if (process.env.NODE_ENV === 'production') {
        return [
            'https://thumblers.vercel.app',
            process.env.FRONTEND_URL || 'https://thumblers.vercel.app'
        ].filter(Boolean);
    }
    return ['http://localhost:5173', 'http://localhost:3000'];
};

// Middleware
app.use(cors({
    origin: getCORSOrigins(),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.set('trust proxy', 1)

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
    }, // expires in 7 days

    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI as string,
        collectionName: 'sessions',
        touchAfter: 24 * 3600, // lazy session update
    })
}))

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});


// AFTER session
app.use(passport.initialize());
app.use(passport.session());


// added auth routes
app.use('/api/auth', AuthRouter);
// added thumbnail routes
app.use('/api/thumbnail', ThumbnailRouter);
// added user routes
app.use('/api/user', UserRouter);



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});