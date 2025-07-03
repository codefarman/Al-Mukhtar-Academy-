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
    <div className=' bg-[#262626] text-white border border-[#333] shadow-lg rounded-lg hover:bg-[#333333] hover:shadow-xl  transition p-5 flex flex-col'>
      {/* title */}
      <h2 className='text-xl font-bold text-yellow-400 text-center mb-3'>
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
        className='bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 text-sm'
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
        <button className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 cursor-pointer">
          {t('download')}
        </button>
      </a>
      </div>

      {/* about book  */}
      <div className='mb-3 text-white text-sm'>
        <h4 className='font-semibold text-yellow-400 mb-1'>{t('aboutBook')}:</h4>
        <p className='line-clamp-4'>{book.description}</p>
      </div>

      {/* category */}
      <div className='text-xs text-white mt-auto'>
        <strong className='text-yellow-400'>{t('category')}:</strong> {book.category}
      </div>
    </div>
  )
}

export default Bookcard