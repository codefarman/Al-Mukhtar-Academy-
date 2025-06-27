import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Separate storage configs for image and PDF
export const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'book_covers',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png', 'webp'],
  },
});

export const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'book_pdfs',
    resource_type: 'raw', // required for PDFs
    allowed_formats: ['pdf'],
  },
});
