import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (i18n.language === "ur" || i18n.language === "ar") {
      html.setAttribute('dir', 'rtl');
      html.style.fontFamily = "'Noto Naskh Arabic', serif";
    } else {
      html.setAttribute('dir', 'ltr');
      html.style.fontFamily = 'inherit';
    }
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">اسلامی امدادی کتاب</h1>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navbar Links (desktop) */}
        <ul className="hidden md:flex gap-12 text-lg text-gray-700 items-center">
          <li><Link to="/" className="hover:text-green-600">{t("home") || "Home"}</Link></li>
          <li><Link to="/books" className="hover:text-green-600">{t("books") || "Books"}</Link></li>
          <li><Link to="/about" className="hover:text-green-600">{t("about") || "About"}</Link></li>
          <li><Link to="/admin/login" className="hover:text-green-600">{t("admin") || "Admin"}</Link></li>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="bg-white text-green-700 px-2 py-1 rounded hover:bg-gray-100"
            >
            🌐 {i18n.language === 'en' ? 'EN' : i18n.language === 'ur' ? 'اردو' : 'العربية'} ▼
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded z-10">
                <button onClick={() => changeLanguage('en')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">English</button>
                <button onClick={() => changeLanguage('ar')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">العربية</button>
                <button onClick={() => changeLanguage('ur')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">اردو</button>
              </div>
            )}
          </div>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-3 text-gray-700">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-600">{t("home") || "Home"}</Link></li>
            <li><Link to="/books" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-600">{t("books") || "Books"}</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-600">{t("about") || "About"}</Link></li>
            <li><Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-600">{t("admin") || "Admin"}</Link></li>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="bg-white text-green-700 px-2 py-1 rounded  w-full text-left mt-2"
              >
                🌐 {i18n.language.toUpperCase()} ▼
              </button>
              {isLangOpen && (
                <div className="mt-1 w-full bg-white shadow-md rounded">
                  <button onClick={() => changeLanguage('en')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">English</button>
                  <button onClick={() => changeLanguage('ar')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">العربية</button>
                  <button onClick={() => changeLanguage('ur')} className="block px-4 py-2 w-full text-left hover:bg-gray-100">اردو</button>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
