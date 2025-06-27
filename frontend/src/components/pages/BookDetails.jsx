
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookViewer from "../pages/BookViewer";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch("https://al-mukhtar-academy.onrender.com/api/books");
      const allBooks = await res.json();
      const foundBook = allBooks.find((b) => b._id === id);
      setBook(foundBook);
    };

    fetchBook();
  }, [id]);

  if (!book) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <img
          src={`https://al-mukhtar-academy.onrender.com${book.coverUrl}`}
          alt={book.title}
          className="w-full h-96 object-contain mb-6 rounded shadow"
        />
        <h1 className="text-3xl font-bold text-green-700 mb-2">{book.title}</h1>
        <p className="text-sm text-gray-600 mb-6">Category: {book.category}</p>

        {/* Custom PDF Viewer */}
        <BookViewer pdfUrl={`https://al-mukhtar-academy.onrender.com${book.pdfUrl}`} />

        <div className="mt-6 text-center">
          <a
            href={`https://al-mukhtar-academy.onrender.com${book.pdfUrl}`}
            download
            className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            📥 Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
