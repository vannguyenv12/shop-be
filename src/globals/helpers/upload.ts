import multer from "multer"
import path from "node:path";
import fs from "node:fs";


function createStorage(uploadDir: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // if folder does not exist
      const uploadPath = path.join(__dirname, '../../../images', uploadDir);
      if (!fs.existsSync(uploadPath)) {
        // create folder uploadDir name
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  });

  return storage
}

export const upload = multer({ storage: createStorage('products') })
export const uploadAvatar = multer({ storage: createStorage('users') })