import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend 
    // Validate non empty fields 
    // check if user already exists
    // check for the image and avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db 
    // remove password and refreshtoken from the response
    // check for user creation 
    // return res 

    const { fullName, email, userName, password } = req.body;

    // if(fullName === ""){
    //     throw new ApiError(400, "fullname is required")
    // }

    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Here we are using await because it might take sometime 
    const existedUser =await User.findOne({
        $or : [{userName}, {email}]
    })

    if(existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    const avatarLocalPath =  await req.files?.avatar[0]?.path ; 
    const coverImageLocalPath = await req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required 1")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required 2");
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        email, 
        coverImage : coverImage?.url || "",
        password,
        userName : userName.toLowerCase()
    })

    // findById is use because in response i don't want to 
    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500, "something went wrong while registering user ")

    console.log("userId: ",  createdUser._id.toString())
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
});

export { registerUser };