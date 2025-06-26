import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: String,
    category: String,
    pdfUrl: String,
    coverUrl: String,
}, { timestamps: true});

const Book = mongoose.model('Book', bookSchema);
export default Book;