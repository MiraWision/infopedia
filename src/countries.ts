import type { Country, ISO2, ISO3 } from './types';

import countriesData from './data/countries.json';
import { countryByISO2, countryByISO3 } from './generated/maps';

const countries: ReadonlyArray<Country> = Object.freeze(countriesData as Country[]);

function getCountryByISO2(code: ISO2): Country | undefined {
  return countryByISO2[code];
}
function getCountryByISO3(code: ISO3): Country | undefined {
  return countryByISO3[code];
}
function findCountriesByName(q: string): Country[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return countries.filter((c) =>
    c.name.en.toLowerCase().includes(needle) || (c.name.native?.toLowerCase() || '').includes(needle)
  );
}

export { countries, countryByISO2, countryByISO3, getCountryByISO2, getCountryByISO3, findCountriesByName };

