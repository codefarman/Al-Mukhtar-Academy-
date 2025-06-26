import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res =  axios.post("http://localhost:5000/api/admin/login", {
                email,
                password,
            });
            localStorage.setItem('adminToken', (await res).data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Incorrect email or password.");
            } else {
                setError("Server error. Try again later.");
            }
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <div className='bg-white shadow rounded p-6 w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4 text-center'>{t('adminLogin')}</h2>
            {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}
            <form 
            onSubmit={handleLogin}
            className='space-y-4'
            >
                <input
                type="email"
                className='w-full border p-2 rounded'
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                type="password"
                className='w-full border p-2 rounded'
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button
                type='submit'
                className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-700'
                >
                    {t('login')}
                </button>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin