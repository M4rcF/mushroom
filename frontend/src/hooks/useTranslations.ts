import { useTranslation } from 'react-i18next';

export const useTranslations = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: 'pt' | 'en') => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    changeLanguage,
    currentLanguage,
    isPortuguese: currentLanguage === 'pt',
    isEnglish: currentLanguage === 'en',
  };
};



