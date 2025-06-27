import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const BooksGallery = () => {
  const [books, setBooks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("https://al-mukhtar-academy.onrender.com/api/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        {t('galleryBookTitle')}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">
              {book.title}
            </h2>

            {/* Cover Image (clickable) */}
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-3"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-64 object-contain rounded "
              />
            </a>

            {/* Category */}
            <p className="text-sm text-gray-700 text-center mt-2">
              {t('category')}: <span className="font-medium">{book.category}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksGallery;
