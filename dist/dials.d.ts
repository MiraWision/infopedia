import { f as CountryDial, I as ISO2, e as Country } from './types-Dsl_Lfik.js';
export { b as countriesByDial, d as dialByISO2 } from './maps-vygyojxn.js';

declare const countryDials: ReadonlyArray<CountryDial>;
declare function getDialByISO2(code: ISO2): CountryDial | undefined;
declare function getCountriesByDialCode(dialCode: string): Country[];

export { countryDials, getCountriesByDialCode, getDialByISO2 };
