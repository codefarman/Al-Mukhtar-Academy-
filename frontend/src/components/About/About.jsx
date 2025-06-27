import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    if (i18n.language === 'ur' || i18n.language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.style.fontFamily = "'Noto Naskh Arabic', serif";
    } else {
      html.setAttribute('dir', 'ltr');
      html.style.fontFamily = 'inherit';
    }
  }, [i18n.language]);

  const benefits = t("benefit_list", { returnObjects: true });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md text-gray-800">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">{t("about_title")}</h2>
        <p className="mb-6 text-center text-gray-600">{t("about_intro")}</p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-600 mb-2">{t("our_mission")}</h3>
          <p>{t("mission_desc")}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-600 mb-2">{t("who_benefit")}</h3>
          <ul className="list-disc pl-5 space-y-1">
            {Array.isArray(benefits) && benefits.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-600 mb-2">{t("languages_supported")}</h3>
          <p>{t("languages_desc")}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-600 mb-2">{t("future_plans")}</h3>
          <p>{t("future_desc")}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-green-600 mb-2">{t("contact_us")}</h3>
          <p>{t("contact_desc")}</p>
          <ul className="mt-2 text-gray-700">
            <li>{t("email1")}</li>
            <li>{t("whatsapp")}</li>
          </ul>
        </div>

        <p className="text-center text-gray-500 mt-6 italic">{t("footer")}</p>
      </div>
    </div>
  );
};

export default About;

