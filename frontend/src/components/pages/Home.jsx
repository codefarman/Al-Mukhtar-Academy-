import Navbar from "../Navbar/Navbar";
import HeroSection from "../HeroSection/HeroSection";
import BookCard from "../BookCard/Bookcard";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react"; 
// import { useTranslation } from 'react-i18next';

const Home = () => {
  const [books, setBooks] = useState([]);
  //  const { t } = useTranslation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="bg-gray-100 text-gray-900">
      <Navbar />
      <HeroSection />
      <section className="px-4 py-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default Home;