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
import path from 'path';

// Define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Allow only PDFs and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and image files are allowed!'), false);
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

// Middleware for handling multiple fields
export const uploadBookFiles = upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

// Optional: Debug logger middleware
export const debugLogger = (req, res, next) => {
  console.log('Incoming upload request...');
  next();
};

// Error handler for multer-specific errors
export const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('MulterError:', err.message);
    return res.status(400).json({ error: err.message });
  } else if (err) {
    console.error('Unknown error during file upload:', err.message);
    return res.status(500).json({ error: 'File upload failed' });
  }
  next();
};

export default upload;
