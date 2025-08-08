import type { Country, ISO2, ISO3 } from './types';
import { countryByISO2, countryByISO3 } from './generated/maps';
declare const countries: ReadonlyArray<Country>;
declare function getCountryByISO2(code: ISO2): Country | undefined;
declare function getCountryByISO3(code: ISO3): Country | undefined;
declare function findCountriesByName(q: string): Country[];
export { countries, countryByISO2, countryByISO3, getCountryByISO2, getCountryByISO3, findCountriesByName };
