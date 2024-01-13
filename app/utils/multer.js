const multer = require("multer")
const path = require("path")
const fs = require("fs")
const Error = require("http-errors")

function createRoute(req) {
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDate().toString()
    const dir = path.join(__dirname, "..", "..", "public", "uploads", "avatar", year, month, day)
    req.body.fileUploadPath = path.join("uploads", "avatar", year, month, day)
    fs.mkdirSync(dir, {recursive: true})
    return dir
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file?.originalname) {
        const filePath = createRoute(req);
        return cb(null, filePath);
      }
      cb(null, null);
    },
    filename: (req, file, cb) => {
      if (file.originalname) {
        const ext = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + ext);
        req.body.filename = fileName;
        return cb(null, fileName);
      }
      cb(null, null);
    },
  });

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname)
    const format = [".jpeg", ".jpg", ".webp", ".gif", ".png"]
    if(!format.includes(ext)){
        return cb(Error.BadRequest("image's format incorrect"))
    }else{
        return cb(null, true)
    }
}


const ImageMax = 9 * 1000 * 1000

const uploadFile = multer({storage, fileFilter, limits: { fileSize: ImageMax }})

module.exports = {
  uploadFile
}