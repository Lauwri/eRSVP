import { Language } from '@rsvp/db/dist/dbTypes';
import en from '../static/en.json';
import fi from '../static/fi.json';

export const getTranslations = (language: Language) => {
  if (language === Language.FIN) return fi;
  return en;
};
