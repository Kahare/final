// import multer from 'multer';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb)
    {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) =>
{
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname)
    {
        return cb(null, true);
    } else
    {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

export default upload;
