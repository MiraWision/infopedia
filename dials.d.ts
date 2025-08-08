import type { Country, CountryDial, ISO2 } from './types';
import { dialByISO2, countriesByDial } from './generated/maps';
declare const countryDials: ReadonlyArray<CountryDial>;
declare function getDialByISO2(code: ISO2): CountryDial | undefined;
declare function getCountriesByDialCode(dialCode: string): Country[];
export { countryDials, dialByISO2, countriesByDial, getDialByISO2, getCountriesByDialCode };
