import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = ['en', 'bg'];
const availableLanguages = ['en', 'bg'];
const selectedLanguage = localStorage.getItem('i18next_selected_language') || 'en';
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    preload: ['en', 'bg'],
    // lng: 'en',
    lng: selectedLanguage, // Set selected language
    detection: {
      checkWhitelist: true
    },
    // resources: {
    //   // // Load translation data from localStorage for the default language if available
    //   en: {
    //     translation: JSON.parse(localStorage.getItem('i18next_res_en') || '{}')
    //   },
    //   bg: {
    //     translation: JSON.parse(localStorage.getItem('i18next_res_bg') || '{}')
    //   }
    // },
   
   
    resources: {
      [selectedLanguage]: {
        translation: JSON.parse(localStorage.getItem(`i18next_res_${selectedLanguage}`) || '{}')
      }
    },
    debug: true,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    },
    useSuspense: true, // Disable Suspense
  });

export const updateResources = (language, translationData) => {
  localStorage.setItem('i18next_selected_language', language);
  localStorage.setItem(`i18next_res_${language}`, JSON.stringify(translationData));
  i18n.addResourceBundle(language, 'translation', translationData, true, true);
};

export default i18n;





