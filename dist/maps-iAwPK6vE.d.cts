import { e as Country, j as Currency, f as CountryDial, U as USState, h as Language, i as Locale, T as TimeZone } from './types-Dsl_Lfik.cjs';

declare const countryByISO2: Record<string, Country>;
declare const countryByISO3: Record<string, Country>;
declare const dialByISO2: Record<string, CountryDial>;
declare const countriesByDial: Record<string, Country[]>;
declare const languageBy639_1: Record<string, Language>;
declare const languageBy639_2: Record<string, Language>;
declare const localeByTag: Record<string, Locale>;
declare const localesByLanguage: Record<string, Locale[]>;
declare const timeZoneByName: Record<string, TimeZone>;
declare const currencyByCode: Record<string, Currency>;
declare const usStateByCode: Record<string, USState>;

export { countryByISO3 as a, countriesByDial as b, countryByISO2 as c, dialByISO2 as d, languageBy639_2 as e, localeByTag as f, localesByLanguage as g, currencyByCode as h, languageBy639_1 as l, timeZoneByName as t, usStateByCode as u };
