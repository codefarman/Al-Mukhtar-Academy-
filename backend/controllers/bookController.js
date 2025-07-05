// import Book from '../models/Book.js';
// import cloudinary from '../utils/cloudinary.js';
// import fs from 'fs';

// export const uploadBook = async (req, res) => {
//   try {

//     // Debug: Log incoming request body and files
//      console.log("📥 Incoming upload...");
//     console.log("📄 req.files.pdf:", req.files?.pdf?.[0]);
//     console.log("🖼️ req.files.cover:", req.files?.cover?.[0]);
//     console.log("📝 req.body:", req.body);

//     const pdfFile = req.files?.pdf?.[0];
//     if (pdfFile) {
//       console.log("📄 PDF size (MB):", (pdfFile.size / 1024 / 1024).toFixed(2));
//     }

//     const { title, category, description } = req.body;

//     if (!req.files?.pdf || !req.files?.cover) {
//       return res.status(400).json({ message: "Missing files" });
//     }

//     // Upload to Cloudinary
//     const pdfUpload = await cloudinary.uploader.upload(req.files.pdf[0].path, {
//       resource_type: 'raw',
//       folder: 'books/pdfs',
//       timeout: 120000, // 120 seconds timeout
//     });

//     const coverUpload = await cloudinary.uploader.upload(req.files.cover[0].path, {
//       folder: 'books/covers',
//       timeout: 120000, // 120 seconds timeout
//     });

//     // Delete only local files (temp uploads)
//     try {
//       fs.unlinkSync(req.files.pdf[0].path);
//       fs.unlinkSync(req.files.cover[0].path);
//     } catch (unlinkErr) {
//       console.warn("Warning: Failed to delete temp files", unlinkErr.message);
//     }

//     // Save to MongoDB
//     const book = await Book.create({
//       title,
//       category,
//       description,
//       pdfUrl: `${pdfUpload.secure_url}?fl_attachment=${encodeURIComponent(title)}.pdf`,
//       coverUrl: coverUpload.secure_url,
//     });

//     res.status(201).json(book);

//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// };

import fs from 'fs';
import Book from '../models/Book.js';
import { supabase } from '../utils/supabaseClient.js';

// Utility: Sanitize filenames to avoid Supabase key issues
const sanitizeFileName = (originalName) => {
  const base = originalName
    .replace(/\.[^/.]+$/, '')            // Remove extension
    .replace(/[^a-zA-Z0-9-_]/g, '')      // Remove special/unicode characters
    .toLowerCase();
  const ext = originalName.split('.').pop();
  return `${Date.now()}-${base}.${ext}`;
};

export const uploadBook = async (req, res) => {
  try {

      // Debug: Log incoming request body and files
     console.log("📥 Incoming upload...");
    console.log("📄 req.files.pdf:", req.files?.pdf?.[0]);
    console.log("🖼️ req.files.cover:", req.files?.cover?.[0]);
    console.log("📝 req.body:", req.body);

    const pdfFile = req.files?.pdf?.[0];
    if (pdfFile) {
      console.log("📄 PDF size (MB):", (pdfFile.size / 1024 / 1024).toFixed(2));
    }

    const { title, category, description } = req.body;

    if (!req.files?.pdf || !req.files?.cover) {
      return res.status(400).json({ message: "Missing files" });
    }

    const coverFile = req.files.cover[0];

    // Sanitize file names
    const pdfPath = `pdfs/${sanitizeFileName(pdfFile.originalname)}`;
    const coverPath = `covers/${sanitizeFileName(coverFile.originalname)}`;

    // Upload PDF
    const { error: pdfError } = await supabase
      .storage
      .from('books')
      .upload(pdfPath, fs.readFileSync(pdfFile.path), {
        contentType: pdfFile.mimetype,
      });

    if (pdfError) throw pdfError;

    const pdfUrl = supabase.storage.from('books').getPublicUrl(pdfPath).data.publicUrl;

    // Upload Cover
    const { error: coverError } = await supabase
      .storage
      .from('books')
      .upload(coverPath, fs.readFileSync(coverFile.path), {
        contentType: coverFile.mimetype,
      });

    if (coverError) throw coverError;

    const coverUrl = supabase.storage.from('books').getPublicUrl(coverPath).data.publicUrl;

    // Delete local temp files
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
    console.error("Upload failed:", {
    message: err.message,
    name: err.name,
    stack: err.stack,
    fullError: err,
  });
  res.status(500).json({ error: "Upload failed", details: err.message });
}
};

export const getAllBooks = async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1});
    res.json(books);
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
};
