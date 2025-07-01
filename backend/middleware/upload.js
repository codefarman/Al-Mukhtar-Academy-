import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

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

// export const uploadBookFiles = upload.fields([
//   { name: 'pdf', maxCount: 1 },
//   { name: 'cover', maxCount: 1 },
// ]);

// export default upload;

export const uploadBookFiles = (req, res, next) => {
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ])(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: 'Upload error', details: err.message });
    }

    // Debug: Confirm text fields
    console.log('📦 req.body.description =', req.body.description);
    console.log('📄 req.body.title =', req.body.title);

    if (!req.body.description) {
      console.warn('⚠️ Description field missing — check if it was sent properly.');
    }

    next();
  });
};

export default upload;