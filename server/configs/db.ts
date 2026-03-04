import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    await mongoose.connect(process.env.MONGODB_URI as   string)
  } catch(err){
    console.error("Error connecting to MongoDb",err);
  }
}

export default connectDB;