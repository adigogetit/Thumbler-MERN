# ThumblER
Live link - https://thumblers.vercel.app/
ThumblER is a full-stack thumbnail generator app for YouTube-style content. Users can describe a video idea, choose a thumbnail style and aspect ratio, and generate a custom image using AI-powered prompts and Cloudinary hosting.

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: MongoDB + Mongoose
- Auth: Passport.js + Google OAuth
- AI/Image: Hugging Face image generation + Cloudinary

## Project Structure

```bash
THUMBLER/
├── client/        # React frontend
├── server/        # Express backend
├── README.md      # Project documentation
└── package.json   # Root-level workspace (if added later)
```

## Features

- AI thumbnail generation from custom prompt/title
- Aspect ratio selection
- Style and color scheme options
- Google login/authentication
- Saved user generations
- Preview and management of thumbnails

## Prerequisites

- Node.js 18+
- MongoDB database
- Google Cloud OAuth credentials
- Cloudinary account
- Hugging Face API key

## Environment Variables

Create `.env` files in both the `client` and `server` folders.

### Server `.env`

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
HF_API_KEY=your_huggingface_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

### Client `.env`

```env
VITE_BASE_URL=http://localhost:3000
```

## Run Locally

### 1) Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2) Start backend

```bash
cd server
npm run server
```

### 3) Start frontend

```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000` by default.

## Common Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run server
npm run start
npm run build
```

## Notes

- The backend uses session-based auth and MongoDB session storage.
- Generated images are uploaded to Cloudinary and stored with metadata in MongoDB.
- CORS is configured for local development and production deployment.

## Deployment

This project is set up for deployment on Vercel or similar hosting. For production, update the environment variables and allowed frontend/backend URLs.

## License

This project is for personal/demo use unless a separate license is specified.
