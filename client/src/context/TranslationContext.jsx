import { createContext, useContext, useEffect, useState } from 'react';
import { fetchTranslations } from '../services/translationService';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const res = await fetchTranslations();

        // Handle both plain array and wrapped object
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.translations)
          ? res.data.translations
          : [];

        const dict = {};
        data.forEach(item => {
          dict[item.key] = { en: item.en, es: item.es };
        });

        setTranslations(dict);
      } catch (err) {
        console.error('❌ Error loading translations:', err);
        setTranslations({});
      }
    };

    loadTranslations();
  }, []);

  const t = (key) => {
    return translations[key]?.[language] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, setLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
