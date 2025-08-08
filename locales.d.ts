import type { Locale, Lang639_1 } from './types';
import { localeByTag, localesByLanguage } from './generated/maps';
declare const locales: ReadonlyArray<Locale>;
declare function getLocale(tag: string): Locale | undefined;
declare function getLocalesByLanguage(lang: Lang639_1): Locale[];
export { locales, localeByTag, localesByLanguage, getLocale, getLocalesByLanguage };
