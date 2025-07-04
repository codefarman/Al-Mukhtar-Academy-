// import { useTranslation } from 'react-i18next';

// const HeroSection = () => {
//   const { t } = useTranslation();
//   return (
//     <div className="bg-green-700 text-white text-center py-10 px-4">
//       <h2 className="text-3xl font-semibold mb-2">{t('heroTitle')}</h2>
//       <p className="text-sm">{t('heroSubtitle')}</p>
//     </div>
//   );
// }


// export default HeroSection;

// const HeroSection = () => {
//   return (
//     <div className="relative bg-green-900 text-white py-10 sm:py-14 px-4 sm:px-8 overflow-hidden">
//       {/* Left Logo */}
//       {/* <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
//         <img
//           src="images/logo1.png" // ← Replace with your actual logo file
//           alt="Left Logo"
//           className="w-10 sm:w-14 h-auto"
//         />
//       </div> */}

//       {/* Right Logo */}
//       {/* <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
//         <img
//           src="/images/logo2.png" // ← Replace with your actual logo file
//           alt="Right Logo"
//           className="w-10 sm:w-14 h-auto"
//         />
//       </div> */}

//       {/* Main Content */}
//       <div className="text-center max-w-3xl mx-auto relative z-10">
//         {/* Calligraphy Image */}
//         <div className="flex justify-center mb-4 sm:mb-6">
//           <img
//             src="/images/calli3.png"
//             alt="Quranic Ayah Calligraphy"
//             className="h-16  sm:h-24 object-contain"
//           />
//         </div>

//         {/* Urdu Title */}
//         <h1 className="text-xl sm:text-3xl font-bold text-yellow-300 mb-2">
//            المختار  (محدث) لائبریری
//         </h1>

//         {/* Urdu Subtitle */}
//         <p className="text-sm sm:text-base text-white leading-relaxed">
//            اردو اور عربی اسلامی کتب کا مفت مرکز
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


const HeroSection = () => {
  return (
    <div className="w-full">
      <picture>
        {/* Mobile version of banner */}
        <source srcSet="/images/logo3.jpg" media="(max-width: 640px)" />

        {/* Default (desktop/tablet) version */}
        <img
          src="/images/logo3.jpg"
          alt="Hero Banner"
          className="w-full h-auto object-cover max-h-[500px] sm:max-h-[600px]"
        />
      </picture>
    </div>
  );
};

export default HeroSection;