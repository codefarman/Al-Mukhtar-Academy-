// import { Link } from "react-router-dom";

// const BookCard = ({ book }) => {
//   return (
//     <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
//       {book.coverUrl && (
//         <img 
//           src={`http://localhost:5000${book.coverUrl}`} 
//           alt="Book cover" 
//           className="w-full h-64 object-cover rounded mb-3" 
//         />
//       )}
//       <h3 className="text-lg font-semibold text-green-700">{book.title}</h3>
//       <p className="text-sm text-gray-600 mb-2">Category: {book.category}</p>
//       <Link
//         to={`/books/${book._id}`}
//         className="text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
//       >
//         View Book
//       </Link>
//     </div>
//   );
// };
// export default BookCard;



import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const BookCard = ({ book }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between">
      {/* Book Title */}
      <h3 className="text-xl font-semibold text-green-700 mb-2 text-center">
        {book.title}
      </h3>

      {/* Clickable Book Cover */}
      <a
        href={`http://localhost:5000${book.pdfUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-3"
      >
        <img
          src={`http://localhost:5000${book.coverUrl}`}
          alt="Book cover"
          className="w-full h-64 object-contain rounded "
        />
      </a>

      {/* Book Category */}
      <p className="text-sm text-gray-700 text-center mt-2">
        {t('category')}: <span className="font-medium">{book.category}</span>
      </p>
      {/* <Link
        to={`/books/${book._id}`}
        className="text-sm text-white  bg-green-600 px-3 py-1 rounded text-center hover:bg-green-700"
      >
        View Book
      </Link> */}
      <a 
        href={`http://localhost:5000${book.pdfUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-3 text-sm text-white  bg-green-600 px-3 py-1 rounded text-center"
      >
        <button className="text-sm text-white bg-green-600 px-3 py-1 rounded text-center hover:bg-green-700 cursor-pointer">
         {t('viewBook')}
        </button>
      </a>
    </div>
  );
};

export default BookCard;