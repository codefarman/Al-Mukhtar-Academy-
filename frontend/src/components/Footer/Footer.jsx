import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#262626] border-t mt-10 py-4 text-center text-sm text-gray-100">
      {t('footer_text')}
    </footer>
  );
};

export default Footer;