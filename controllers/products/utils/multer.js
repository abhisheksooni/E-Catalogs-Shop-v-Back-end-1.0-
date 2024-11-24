import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs';
import path from "path";




// const uploadDir = path.join(__dirname, '../../Data/Images');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }


const fileStoreLS = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Data/Images/')
    },
    filename: (res, file, cb) => {
        const fileName = `${nanoid(5)}${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
})

export const upload = multer({ storage: fileStoreLS });

