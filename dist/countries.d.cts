import { e as Country, I as ISO2, a as ISO3 } from './types-Dsl_Lfik.cjs';
export { c as countryByISO2, a as countryByISO3 } from './maps-iAwPK6vE.cjs';

declare const countries: ReadonlyArray<Country>;
declare function getCountryByISO2(code: ISO2): Country | undefined;
declare function getCountryByISO3(code: ISO3): Country | undefined;
declare function findCountriesByName(q: string): Country[];

export { countries, findCountriesByName, getCountryByISO2, getCountryByISO3 };
