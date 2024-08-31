// import {asyncHandler} from './utils/asyncHandler.js'

import { asyncHandler } from "../utils/asyncHandler.js";

// const registerUser = asyncHandler( async(req, res) => {
//     res.status(200).json({
//         message : "User Created Successfully"
//     })
// })

// export {registerUser}



const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'User Created Successfully',
    });
});

export { registerUser };