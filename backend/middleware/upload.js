// import multer from 'multer';
// import path from 'path';

// // define custom storage to keep original extension
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
//         cb(null, uniqueName);
//     },
// });

// //support only pdf and image files
// const fileFilter = (req,file,cb) => {
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF and image files are allowed!'), false);
//     }
// }

// const upload = multer({ storage, fileFilter });

// // export fields middleware for book upload (pdf + cover)
// export const uploadBookFiles = upload.fields([
//     { name: 'pdf', maxCount: 1},
//     { name: 'cover', maxCount: 1},
// ]);

// export default upload;


import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {cloudinary} from '../utils/cloudinary.js';

// PDF & Image upload using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = 'books';
    const allowedFormats = ['pdf', 'jpg', 'png', 'jpeg', 'webp'];
    return {
      folder,
      format: allowedFormats.includes(file.mimetype.split('/')[1]) ? file.mimetype.split('/')[1] : 'pdf',
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
    };
  },
});

// File filter for PDFs and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

export const uploadBookFiles = upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

export default upload;
