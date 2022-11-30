import React, { useEffect, useState } from "react";
import { translations } from "../i18n/translations";
import { I18n } from "i18n-js";

type i18nHook = {
  children: React.ReactNode;
  locale?: string;
};

export const i18nContext = React.createContext({} as any);

export const I18nProvider = ({ children }: i18nHook) => {
  const [locale, setLocale] = useState<string>("en");
  const [i18n, seti18n] = useState<I18n>(new I18n());

  useEffect(() => {
    const createTranslation = async () => {
      const i18n = new I18n(translations);
      i18n.locale = 'es';
      i18n.enableFallback = true;
      seti18n(i18n);
    };

    createTranslation();
  }, []);

  const updateLang = (lang: string) => {
    setLocale(lang);
    i18n.locale = lang;
    seti18n(i18n);
    
  };

  return (
    <i18nContext.Provider value={{ locale, updateLang, i18n }}>
      {children}
    </i18nContext.Provider>
  );
};
