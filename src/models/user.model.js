import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistroy: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

// This is a predefined hook from mongoose
userSchema.pre('save', async function (next) {
    // await 
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

// This is a custom method     
// Here we are using this funtion() instead of arrow because we have to use the this keywords 
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(this.password, password);
}

// This method is going to be use for the acess token 
userSchema.method.generateAcessToken = function () {
    jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

// This is going to be use for the refresh token 
userSchema.method.generateRefreshtoken = function () {
    jwt.sign({
        _id: this.id
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
    )
}


export const User = mongoose.model("User", userSchema)
