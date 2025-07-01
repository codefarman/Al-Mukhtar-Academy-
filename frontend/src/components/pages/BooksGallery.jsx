
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const BooksGallery = () => {
  const [books, setBooks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("https://al-mukhtar-academy.onrender.com/api/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

  const handleDownload = () => {
    toast.success('📥 Download started!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        {t('galleryBookTitle')}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col justify-between transition"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">
              {book.title}
            </h2>

            {/* Cover Image */}
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-3"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-64 object-contain rounded"
              />
            </a>

            {/* Read Online + Download  */}
            <div className='flex justify-center gap-4 mb-4'>
              <a
                href={book.pdfUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm'
              >
                📖 {t('readOnline')}
              </a>

              <a
                href={`${book.pdfUrl}?fl_attachment=${encodeURIComponent(book.title)}.pdf`}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
              >
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  {t('download')}
                </button>
              </a>
            </div>

            {/* about book  */}
            <div className='mb-3 text-gray-700 text-sm'>
              <h4 className='font-semibold mb-1'>{t('aboutBook')}:</h4>
              <p className='line-clamp-4'>{book.description}</p>
            </div>

            {/* category */}
            <div className='text-xs text-gray-500 mt-auto'>
              <strong>{t('category')}:</strong> {book.category}
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default BooksGallery;
