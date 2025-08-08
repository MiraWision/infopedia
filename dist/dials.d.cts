import { f as CountryDial, I as ISO2, e as Country } from './types-Dsl_Lfik.cjs';
export { b as countriesByDial, d as dialByISO2 } from './maps-iAwPK6vE.cjs';

declare const countryDials: ReadonlyArray<CountryDial>;
declare function getDialByISO2(code: ISO2): CountryDial | undefined;
declare function getCountriesByDialCode(dialCode: string): Country[];

export { countryDials, getCountriesByDialCode, getDialByISO2 };
