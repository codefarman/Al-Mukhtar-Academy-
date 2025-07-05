// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary.js';

// // PDF & Image upload using Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const folder = 'books';
//     const allowedFormats = ['pdf', 'jpg', 'png', 'jpeg', 'webp'];
//     return {
//       folder,
//       format: allowedFormats.includes(file.mimetype.split('/')[1]) ? file.mimetype.split('/')[1] : 'pdf',
//       public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
//     };
//   },
// });

// // File filter for PDFs and images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF and image files are allowed!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter, limits: { fileSize: 100 * 1024 * 1024 } }); // 100 MB limit

// // export const uploadBookFiles = (req, res, next) => {
// //   upload.fields([
// //     { name: 'pdf', maxCount: 1 },
// //     { name: 'cover', maxCount: 1 },
// //   ])(req, res, function (err) {
// //     if (err) {
// //       return res.status(400).json({ message: 'Upload error', details: err.message });
// //     }

// //     // Debug: Confirm text fields
// //     console.log('📦 req.body.description =', req.body.description);
// //     console.log('📄 req.body.title =', req.body.title);

// //     if (!req.body.description) {
// //       console.warn('⚠️ Description field missing — check if it was sent properly.');
// //     }

// //     next();
// //   });
// // };
// export const uploadBookFiles = (req, res, next) => {
//   upload.fields([
//     { name: 'pdf', maxCount: 1 },
//     { name: 'cover', maxCount: 1 },
//   ])(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer error:", err);
//       return res.status(400).json({ message: "Multer upload error", error: err.message });
//     } else if (err) {
//       console.error(" Unknown upload error:", err);
//       return res.status(500).json({ message: "Upload failed", error: err.message });
//     }
//     next();
//   });
// };

// export default upload;



import fs from 'fs';
import os from 'os';
import multer from 'multer';
import Book from '../models/Book.js';
import { supabase } from '../utils/supabaseClient.js';
import path from 'path';

// Multer config for temp disk storage
const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// Export this for use in router
export const uploadBookFiles = upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

// Actual upload handler
export const uploadBook = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!req.files?.pdf || !req.files?.cover) {
      return res.status(400).json({ message: "Missing files" });
    }

    const pdfFile = req.files.pdf[0];
    const coverFile = req.files.cover[0];

    // Upload PDF
    const pdfPath = `pdfs/${Date.now()}-${pdfFile.originalname}`;
    const { error: pdfError } = await supabase
      .storage
      .from('books')
      .upload(pdfPath, fs.readFileSync(pdfFile.path), {
        contentType: pdfFile.mimetype,
      });

    if (pdfError) throw pdfError;

    const pdfUrl = supabase.storage.from('books').getPublicUrl(pdfPath).data.publicUrl;

    // Upload Cover
    const coverPath = `covers/${Date.now()}-${coverFile.originalname}`;
    const { error: coverError } = await supabase
      .storage
      .from('books')
      .upload(coverPath, fs.readFileSync(coverFile.path), {
        contentType: coverFile.mimetype,
      });

    if (coverError) throw coverError;

    const coverUrl = supabase.storage.from('books').getPublicUrl(coverPath).data.publicUrl;

    // Clean up temp files
    fs.unlinkSync(pdfFile.path);
    fs.unlinkSync(coverFile.path);

    // Save to MongoDB
    const book = await Book.create({
      title,
      category,
      description,
      pdfUrl,
      coverUrl,
    });

    res.status(201).json(book);

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};
