import type { Locale, Lang639_1 } from './types';

import localesData from './data/locales.json';
import { localeByTag, localesByLanguage } from './generated/maps';

const locales: ReadonlyArray<Locale> = Object.freeze(localesData as Locale[]);

function getLocale(tag: string): Locale | undefined {
  return localeByTag[tag];
}
function getLocalesByLanguage(lang: Lang639_1): Locale[] {
  return localesByLanguage[lang] || [];
}

export { locales, localeByTag, localesByLanguage, getLocale, getLocalesByLanguage };

