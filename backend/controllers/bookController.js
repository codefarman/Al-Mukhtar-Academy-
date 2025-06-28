import Book from '../models/Book.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const uploadBook = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.files?.pdf || !req.files?.cover) {
      return res.status(400).json({ message: "Missing files" });
    }

    // Upload PDF to Cloudinary
    const pdfUpload = await cloudinary.uploader.upload(req.files.pdf[0].path, {
      resource_type: 'raw', // important for PDFs
      folder: 'books/pdfs',
    });

    // Upload Cover image to Cloudinary
    const coverUpload = await cloudinary.uploader.upload(req.files.cover[0].path, {
      folder: 'books/covers',
    });

    // Only delete local temp files from multer
    fs.unlinkSync(req.files.pdf[0].path);
    fs.unlinkSync(req.files.cover[0].path);

    // Save book data to DB
    const book = await Book.create({
      title,
      category,
      pdfUrl: pdfUpload.secure_url,
      coverUrl: coverUpload.secure_url,
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
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
