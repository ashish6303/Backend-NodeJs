// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'
// import { env } from 'process';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (uploadFilePath) => {
//     try {
        
//         if (!uploadFilePath){
//             console.log(uploadFilePath, "uploadFilePath")
//              return null
//             };
//         const response = await cloudinary.uploader.upload(uploadFilePath, {
//             resource_type: 'auto'
//         })
//         console.log("Uploaded file types is : ", response.url)
//         return response;
//     } catch (error) {
//         // It is use like if any malicious file and it got failed then it will be unlink
//         fs.unlinkSync(uploadFilePath)
//         return null;
//     }
// }

// export {uploadOnCloudinary};

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // console.log("Uploading file from path:", localFilePath);

        // Check if the file path is valid
        if (!localFilePath) {
            console.error("No file path provided.");
            return null;
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        // console.log("Upload response:", response);
        
        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        
        return response;

    } catch (error) {
        // console.error("Upload failed. Error:", error);

        // Ensure the local file is removed even if the upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};


export {uploadOnCloudinary}