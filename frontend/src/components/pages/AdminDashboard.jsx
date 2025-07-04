import { useEffect, useState } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState('');
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
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

        if (!formData.title || !formData.category || !formData.pdf || !formData.cover || !formData.description) {
            alert("please fill all fields");
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('pdf', formData.pdf);
        data.append('cover', formData.cover);
        data.append('description', formData.description);

        try {
            setLoading(true);
            setSuccessMsg("");

            await axios.post("https://al-mukhtar-academy.onrender.com/api/books/upload", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                timeout: 120000, // 120 seconds timeout
            });

            setSuccessMsg(t('bookUploadedSuccessfully'));
            setFormData({ title: "", category: "",  pdf: null, cover: null, description: "" });
            fetchBooks();

            setTimeout(() => {
                setSuccessMsg('');
            }, 3000);


        } catch (err) {
            console.error(err);
            alert('failed to upload book');

            window.location.reload();
        } finally {
            setLoading(false);
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
            setDeleteSuccessMsg(t('bookDeletedSuccessfully'));
            fetchBooks();
            setTimeout(() => {
                setDeleteSuccessMsg('');
            }, 3000);
        } catch {
            alert('Delete failed')
        }
    };

    if (!token) {
        return <p className='text-center mt-10 text-red-600'>{(t('unauthorized'))}.</p>
    }

    return (
        <div className='min-h-screen bg-[#262626] p-6'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-2xl font-bold text-yellow-400 mb-6 text-center'>{(t('adminDashboard'))}</h1>

                {/* upload Form */}
                <form
                    onSubmit={handleSubmit}
                    className='bg-white p-4 rounded shadow mb-8 space-y-4'>
                    <input
                        type="text"
                        placeholder={t('bookTitle')}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className='w-full border p-2 rounded'
                    />
                    <input
                        type="text"
                        placeholder={t('category')}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className='w-full border p-2 rounded'
                    />
                    <textarea
                        placeholder={t('aboutBook')}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border p-2 rounded"
                        rows={4}
                    ></textarea>
                    <label className="block text-sm font-medium text-gray-700">{(t('uploadBookPDF'))}</label>
                    <input
                        type="file"
                        accept='.pdf'
                        onChange={(e) => setFormData({ ...formData, pdf: e.target.files[0] })}
                        className='w-full border p-2 rounded'
                    />
                    {formData.pdf && <p className="text-sm text-gray-500">{(t('selected'))}: {formData.pdf.name}</p>}
                    <label className="block text-sm font-medium text-gray-700 ">{(t('uploadBookCover'))}</label>
                    <input
                        type="file"
                        accept='image/*'
                        onChange={(e) => setFormData({ ...formData, cover: e.target.files[0] })}
                        className='w-full border p-2 rounded'
                    />
                    {formData.cover && <p className="text-sm text-gray-500">{(t('selected'))}: {formData.cover.name}</p>}
                    <button
                        type='submit'
                        className='bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500'
                    >
                        {t('uploadBook')}
                    </button>
                    {loading && (
                        <div className='flex justify-center my-4'>
                            <div className='w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animation-spin'></div>
                        </div>
                    )}
                    {successMsg && (
                        <p className='text-center text-yellow-400 font-semibold'>{successMsg}</p>
                    )}
                </form>

                {/* Upload Books List */}
                {deleteSuccessMsg && (
                    <div className='bg-green-100 text-yellow-400 px-2 rounded mb-4 text-center'>
                        {deleteSuccessMsg}
                    </div>
                )}
                <div className='bg-white p-4 rounded shadow'>
                    <h2 className='text-lg font-semibold mb-4'>{(t('uploadBooks'))}</h2>
                    {books.length === 0 ? (
                        <p className='text-gray-500'>{(t('noBooksUploaded'))}</p>
                    ) : (
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