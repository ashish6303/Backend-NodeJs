import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // Here we can use the file.---- according to use, 
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ 
    storage: storage 
})