import dotenv from 'dotenv';
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>  {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed", err);
})



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

