const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req,file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) =>{
    const allowedTypes = ["image/jpeg", "image/png"];
    if(!allowedTypes.includes(file.mimetype)) {
        return cb (new Error("Invalid file type. Only JPG and PNG are allowed"), false)
    }
    cb(null, true)
}

const upload = multer({storage, fileFilter})

module.exports = upload