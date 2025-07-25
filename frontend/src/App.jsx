import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
// import BookDetails from "./components/pages/BookDetails";
import AdminLogin from "./components/pages/AdminLogin";
import AdminDashboard from "./components/pages/AdminDashboard";
import BooksGallery from "./components/pages/BooksGallery";
// import About from "./components/About/About";
import './index.css';
import { Toaster } from 'react-hot-toast';


export default function App() {
  
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    
  

    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/books/:id" element={<BookDetails />} /> */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/books" element={<BooksGallery />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
    
    </>
  );
}