import { Language } from 'rsvp-db';
import en from '../static/en.json';
import fi from '../static/fi.json';

export const getTranslations = (language: Language) => {
  if (language === Language.FIN) return fi;
  return en;
};
