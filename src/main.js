import dotenv from 'dotenv';
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()



// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js"
// import express from "express"
// const app = express()

// ;(async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log("Testing",process.env.MONGODB_URI)
//         app.on("Error", (error)=> {
//             console.log("Error", error)
//         })
//     app.listen(process.env.PORT, () => {
//         console.log(`App is listning on ${process.env.port}`)
//     })
//     } catch (error) {
//         console.error("Error", error)
//         process.exit(1);
//     }
// })()

