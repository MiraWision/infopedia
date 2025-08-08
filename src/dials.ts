import type { Country, CountryDial, ISO2 } from './types';

import dialsData from './data/country-dials.json';
import { countries } from './countries';
import { dialByISO2, countriesByDial } from './generated/maps';

const countryDials: ReadonlyArray<CountryDial> = Object.freeze(dialsData as CountryDial[]);

function getDialByISO2(code: ISO2): CountryDial | undefined {
  return dialByISO2[code];
}
function getCountriesByDialCode(dialCode: string): Country[] {
  return countriesByDial[dialCode] || [];
}

export { countryDials, dialByISO2, countriesByDial, getDialByISO2, getCountriesByDialCode };

