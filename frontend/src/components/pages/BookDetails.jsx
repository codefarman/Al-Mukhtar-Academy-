// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const BookDetails = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/books`);
//         const allBooks = await res.json();
//         const foundBook = allBooks.find((b) => b._id === id);
//         setBook(foundBook);
//       } catch (err) {
//         console.error("Failed to fetch book details:", err);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   if (!book) {
//     return <div className="text-center py-10 text-gray-500">Loading book details...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
//         {/* Book Cover */}
//         {book.coverUrl && (
//           <img
//             src={`http://localhost:5000${book.coverUrl}`}
//             alt="Book cover"
//             className="w-full h-80 object-cover rounded mb-6"
//           />
//         )}

//         {/* Book Title and Category */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-green-700">{book.title}</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Category: <span className="font-medium">{book.category}</span>
//           </p>
//         </div>

//         {/* PDF Viewer */}
//         <div className="w-full h-[600px] rounded-md overflow-hidden border mb-6">
//           <iframe
//             src={`http://localhost:5000${book.pdfUrl}`}
//             width="100%"
//             height="100%"
//             title="Book PDF"
//             target='_blank'
//             rel='noopener noreferrer'
//             className="w-full h-full"
//           ></iframe>
//         </div>

//         {/* Download Button */}
//         <div className="text-center">
//           <a
//             href={`http://localhost:5000${book.pdfUrl}`}
//             download
//             className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             📥 Download PDF
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;



// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const BookDetails = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/books");
//         const allBooks = await res.json();
//         const foundBook = allBooks.find((b) => b._id === id);
//         setBook(foundBook);
//       } catch (err) {
//         console.error("Failed to fetch book details:", err);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   if (!book) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         Loading book details...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
//         {/* Cover */}
//         {book.coverUrl && (
//           <img
//             src={`http://localhost:5000${book.coverUrl}`}
//             alt="Book Cover"
//             className="w-full h-80 object-contain rounded mb-6"
//           />
//         )}

//         {/* Title and Category */}
//         <h1 className="text-3xl font-bold text-green-700 mb-2">{book.title}</h1>
//         <p className="text-sm text-gray-600 mb-6">
//           Category: <span className="font-medium">{book.category}</span>
//         </p>

//         {/* PDF Viewer using react-pdf-viewer */}
//         <div className="w-full h-[600px] border rounded overflow-hidden mb-6">
//           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//             <Viewer fileUrl={`http://localhost:5000${book.pdfUrl}`} />
//           </Worker>
//         </div>

//         {/* Download Button */}
//         <div className="text-center">
//           <a
//             href={`http://localhost:5000${book.pdfUrl}`}
//             download
//             className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             📥 Download PDF
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;



import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookViewer from "../pages/BookViewer";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch("http://localhost:5000/api/books");
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
          src={`http://localhost:5000${book.coverUrl}`}
          alt={book.title}
          className="w-full h-96 object-contain mb-6 rounded shadow"
        />
        <h1 className="text-3xl font-bold text-green-700 mb-2">{book.title}</h1>
        <p className="text-sm text-gray-600 mb-6">Category: {book.category}</p>

        {/* Custom PDF Viewer */}
        <BookViewer pdfUrl={`http://localhost:5000${book.pdfUrl}`} />

        <div className="mt-6 text-center">
          <a
            href={`http://localhost:5000${book.pdfUrl}`}
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
