import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/HeroSection";
import BookCard from "../BookCard/Bookcard";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://al-mukhtar-academy.onrender.com/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);



  return (
    <div className="bg-[#1a1a1a] text-gray-900">
      <Helmet>
        <title>Al-Mukhtar Library - Free Islamic Books</title>
        <meta name="description" content="Read and download authentic Islamic books in PDF. Hosted by Al-Mukhtar Library." />
        <meta name="keywords" content="Islamic books, Urdu PDF books, Arabic books, Ashraf Ali Thanwi books, tasawwuf, Islamic library" />
        <link rel="canonical" href="https://almukhtarlibrary.com" />
      </Helmet>
      <Navbar />
      <HeroSection />

      <section className="px-4 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
