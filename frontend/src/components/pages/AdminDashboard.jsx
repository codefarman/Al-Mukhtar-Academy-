import {useEffect, useState} from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [ formData, setFormData] = useState({
        title: "",
        category: "",
        pdf: null,
        cover: null,
    });
    const { t } = useTranslation();

    const token = localStorage.getItem('adminToken');

    // fetch books
    const fetchBooks = async () => {
        const res = await axios.get('https://al-mukhtar-academy.onrender.com/api/books');
        setBooks(res.data);
    };

    useEffect(() => {
        fetchBooks();

    }, []);

    //upload book
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.pdf || !formData.cover) {
            alert("please fill all fields");
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('pdf', formData.pdf);
        data.append('cover', formData.cover);

        try {
            await axios.post("https://al-mukhtar-academy.onrender.com/api/books/upload", data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,              
                  },
            });
            alert('Book uploaded successfully');
            setFormData({ title: "", category: "", pdf: null, cover: null });
            fetchBooks();
        } catch (err) {
            console.error(err);
            alert('failed to upload book');

            window.location.reload();
        }
        fetchBooks();
    };

    // delete book
    const deleteBook = async (id) => {
        try {
            await axios.delete(`https://al-mukhtar-academy.onrender.com/api/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchBooks();
        } catch  {
            alert('Delete failed')
        }
    };

    if (!token) {
        return <p className='text-center mt-10 text-red-600'>{(t('unauthorized'))}.</p>
    }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-2xl font-bold text-green-700 mb-6 text-center'>{(t('adminDashboard'))}</h1>

            {/* upload Form */}
            <form 
             onSubmit={handleSubmit}
             className='bg-white p-4 rounded shadow mb-8 space-y-4'>
                <input 
                type="text"
                placeholder={t('bookTitle')}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value })}
                className='w-full border p-2 rounded'
                />
                <input 
                type="text"
                placeholder={t('category')}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value })}
                className='w-full border p-2 rounded'
                />
                <label className="block text-sm font-medium text-gray-700">{(t('uploadBookPDF'))}</label>
                <input 
                type="file"
                accept='.pdf'           
                onChange={(e) => setFormData({...formData, pdf: e.target.files[0] })}
                className='w-full border p-2 rounded'
                />
                {formData.pdf && <p className="text-sm text-gray-500">{(t('selected'))}: {formData.pdf.name}</p>}
                <label className="block text-sm font-medium text-gray-700 ">{(t('uploadBookCover'))}</label>
                <input 
                type="file"
                accept='image/*'
                onChange={(e) => setFormData({...formData, cover: e.target.files[0] })}
                className='w-full border p-2 rounded'
                />
                {formData.cover && <p className="text-sm text-gray-500">{(t('selected'))}: {formData.cover.name}</p>}
                <button
                 type='submit'
                 className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                >
                    {t('uploadBook')}
                </button>
             </form>

             {/* Upload Books List */}
             <div className='bg-white p-4 rounded shadow'>
                <h2 className='text-lg font-semibold mb-4'>{(t('uploadBooks'))}</h2>
                {books.length === 0 ? (
                    <p className='text-gray-500'>{(t('noBooksUploaded'))}</p>
                ):(
                    <table className='w-full text-left'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='p-2'>{(t('bookTitle1'))}</th>
                                <th className='p-2'>{(t('category'))}</th>
                                <th className='p-2'>{(t('view'))}</th>
                                <th className='p-2'>{(t('actions'))}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id} className='border-t'>
                                    <td className='p-2'>{book.title}</td>
                                    <td className='p-2'>{book.category}</td>
                                    <td className='p-2'>
                                        <a 
                                        href={book.pdfUrl}
                                        target='_blank'
                                        rel='noopener  noreferrer'
                                        className='text-blue-600 underline'
                                        >
                                            {(t('view'))} 
                                        </a>
                                    </td>
                                    <td className='p-2'>
                                        <button 
                                         onClick={() => deleteBook(book._id)}
                                         className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                                        >
                                            {(t('delete'))}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
             </div>

             <div className='flex justify-between mt-10 items-center mb-4'>
                <button 
                 onClick={() => {
                    localStorage.removeItem('adminToken');
                    window.location.href = '/admin/login';
                 }}
                 className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600'
                >
                    {(t('logout'))}
                </button>
             </div>
        </div>
    </div>
  )
}

export default AdminDashboard