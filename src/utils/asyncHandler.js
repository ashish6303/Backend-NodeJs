
// This is going to use the promise syntax
const asyncHandlers = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

// export {asyncHandlers}

// This is going to use the try catch methods

// const asyncHandlers = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }

