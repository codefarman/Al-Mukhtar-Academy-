import Book from '../models/Book.js';

export const uploadBook = async (req, res) => {
  try {
    const { title, category } = req.body;

    const pdfUrl = req.files?.pdf?.[0]?.path || req.file?.path;
    const coverUrl = req.files?.cover?.[0]?.path || req.file?.path;

    if (!pdfUrl || !coverUrl) {
      return res.status(400).json({ message: "PDF or Cover not uploaded" });
    }

    const book = await Book.create({ title, category, pdfUrl, coverUrl });
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
