// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// // transation files
// const resources = {
//     en: {
//         translation: {
//             welcome: 'Welcome to Islamic Library',
//             login: 'Login',
//             logout: 'Logout',
//             upload: 'Upload Book',
//             gallery: 'Books Gallery'
//         },
//     },
//      ur: {
//     translation: {
//       welcome: "اسلامی کتب خانہ میں خوش آمدید",
//       login: "لاگ ان",
//       logout: "لاگ آؤٹ",
//       upload: "کتاب اپلوڈ کریں",
//       gallery: "کتب گیلری",
//     },
//   },
//   ar: {
//     translation: {
//       welcome: "مرحبًا بكم في المكتبة الإسلامية",
//       login: "تسجيل الدخول",
//       logout: "تسجيل الخروج",
//       upload: "تحميل الكتاب",
//       gallery: "معرض الكتب",
//     },
//   },
// };

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: 'en',
//     interpolation: {
//         escapeValue:  false,
//     },
//   });

//   export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ur from './locales/ur.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
