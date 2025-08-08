import { i as Locale, L as Lang639_1 } from './types-Dsl_Lfik.cjs';
export { f as localeByTag, g as localesByLanguage } from './maps-iAwPK6vE.cjs';

declare const locales: ReadonlyArray<Locale>;
declare function getLocale(tag: string): Locale | undefined;
declare function getLocalesByLanguage(lang: Lang639_1): Locale[];

export { getLocale, getLocalesByLanguage, locales };
