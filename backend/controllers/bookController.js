import Book from '../models/Book.js';
import cloudinary from '../utils/cloudinary.js';  // make sure this exports cloudinary instance
import fs from 'fs';

export const uploadBook = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.files?.pdf || !req.files?.cover) {
      return res.status(400).json({ message: "Missing files" });
    }

    // Upload PDF to Cloudinary as raw file
    const pdfResult = await cloudinary.uploader.upload(req.files.pdf[0].path, {
      resource_type: "raw", // auto-detects file type
      folder: "books/pdfs"
    });

    // Upload Cover image to Cloudinary
    const coverResult = await cloudinary.uploader.upload(req.files.cover[0].path, {
      folder: "books/covers"
    });

    // Optionally delete local temp files
    fs.unlinkSync(req.files.pdf[0].path);
    fs.unlinkSync(req.files.cover[0].path);

    // Save book entry
    const book = await Book.create({
      title,
      category,
      pdfUrl: pdfResult.secure_url,
      coverUrl: coverResult.secure_url
    });

    res.status(201).json(book);
  } catch (err) {
    console.error(err);
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
