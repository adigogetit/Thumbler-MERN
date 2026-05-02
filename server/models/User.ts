import mongoose from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    googleId?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    name:{type:String , required:true , trim:true},
    email:{type:String , required:true , trim:true , unique:true , lowercase:true},
    password:{type:String , required:false},
    googleId:{type:String , required:false}
}, {timestamps:true})

const User = mongoose.models.user || mongoose.model<IUser>('User',UserSchema);

export default User; 