import multer from "multer"
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // create uploadPath
    const uploadPath = path.join(__dirname, '../../../images', 'products');
    console.log(uploadPath);

    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

export const upload = multer({ storage: storage })