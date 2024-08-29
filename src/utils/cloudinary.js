import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import { env } from 'process';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (uploadFilePath) => {
    try {
        if (!uploadFilePath) return null;
        const response = await cloudinary.uploader.upload(uploadFilePath, {
            resource_type: 'auto'
        })
        console.log("Uploaded file types is : ", response.url)
        return response;
    } catch (error) {
        // It is use like if any malicious file and it got failed then it will be unlink
        fs.unlinkSync(uploadFilePath)
        return null;
    }
}

export {uploadOnCloudinary};