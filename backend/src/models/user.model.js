import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, trim: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    },
    {
        timestamps: true,
    });

const User = mongoose.model('User', UserSchema);
export default User;