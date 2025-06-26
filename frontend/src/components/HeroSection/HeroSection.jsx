import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-green-700 text-white text-center py-10 px-4">
      <h2 className="text-3xl font-semibold mb-2">{t('heroTitle')}</h2>
      <p className="text-sm">{t('heroSubtitle')}</p>
    </div>
  );
}


export default HeroSection;