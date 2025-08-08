# @mirawision/infopedia

Ready‑to‑use lists and helpers for everyday application data: countries, languages, locales, time zones, currencies, and more — with zero dependencies.

## Contents

- Countries and flags
- Country phone codes
- Continents
- Languages
- Locales
- Time zones
- Currencies
- Months and weekdays (English)
- US states and codes

## Installation

```bash
npm install @mirawision/infopedia
```

## Quick Start

```ts
// CommonJS
const { getCountryByISO2, getCurrency } = require('@mirawision/infopedia');

console.log(getCountryByISO2('PL')?.name.en); // "Poland"
console.log(getCurrency('USD')?.symbol);      // "$"
```

## Focused Imports

```ts
// Countries
const { countries, findCountriesByName } = require('@mirawision/infopedia/countries');

// Locales
const { getLocalesByLanguage } = require('@mirawision/infopedia/locales');

// Time zones
const { getTimeZone } = require('@mirawision/infopedia/timezones');
```

## Common Operations

- Find a country by code: `getCountryByISO2('US')`
- Search countries by name: `findCountriesByName('king')`
- Get countries by dial code: `getCountriesByDialCode('+44')`
- Get a language by code: `getLanguageBy639_1('en')`
- List locales for a language: `getLocalesByLanguage('es')`
- Look up a time zone: `getTimeZone('Europe/Warsaw')`
- Look up a currency: `getCurrency('EUR')`
- Find a US state: `getUSState('CA')`

## Notes

- Data is read‑only (arrays are frozen)
- No runtime dependencies

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
