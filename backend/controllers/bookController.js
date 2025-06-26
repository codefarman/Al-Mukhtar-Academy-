import Book from '../models/Book.js';

export const uploadBook = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.files?.pdf || !req.files?.cover) {
      return res.status(400).json({ message: "Missing files" });
    }

    const pdfUrl = `/uploads/${req.files.pdf[0].filename}`;
    const coverUrl = `/uploads/${req.files.cover[0].filename}`;

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
