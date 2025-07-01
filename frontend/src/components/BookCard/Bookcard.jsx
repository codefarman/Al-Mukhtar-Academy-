
// import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';

// const BookCard = ({ book }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between">
//       {/* Book Title */}
//       <h3 className="text-xl font-semibold text-green-700 mb-2 text-center">
//         {book.title}
//       </h3>

//       {/* Clickable Book Cover */}
//       <a
//         href={book.pdfUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block mb-3"
//       >
//         <img
//           src={book.coverUrl}
//           alt="Book cover"
//           className="w-full h-64 object-contain rounded "
//         />
//       </a>

//       {/* Book Category */}
//       <p className="text-sm text-gray-700 text-center mt-2">
//         {t('category')}: <span className="font-medium">{book.category}</span>
//       </p>
//       {/* <Link
//         to={`/books/${book._id}`}
//         className="text-sm text-white  bg-green-600 px-3 py-1 rounded text-center hover:bg-green-700"
//       >
//         View Book
//       </Link> */}
//       <a 
//         href={book.pdfUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block mb-3 text-sm text-white  bg-green-600 px-3 py-1 rounded text-center"
//       >
//         <button className="text-sm text-white bg-green-600 px-3 py-1 rounded text-center hover:bg-green-700 cursor-pointer">
//          {t('viewBook')}
//         </button>
//       </a>
//     </div>
//   );
// };

// export default BookCard;


import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const Bookcard = ({book}) => {
  const {t} = useTranslation();

  const handleDownload = () => {
    toast.success('📥 Download started!', { title: book.title }, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#4caf50',
        color: '#fff',
      },
    });
  }
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 flex flex-col'>
      {/* title */}
      <h2 className='text-xl font-bold text-green-700 text-center mb-3'>
        {book.title}
      </h2>

      {/* cover Image  */}
      <img 
      src={book.coverUrl} 
      alt={book.title} 
      className='h-64 object-contain rounded-md mb-4 ' />

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
  )
}

export default Bookcard