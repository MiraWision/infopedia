## @mirawision/infopedia

Infopedia is a tiny, zero‑dependency TypeScript library that provides canonical reference lists and ergonomic helpers for:

- Countries (ISO‑3166)
- Country phone codes (E.164)
- Continents
- Languages (ISO‑639‑1/2)
- Locales (BCP 47 tags by official languages per country)
- Time zones (IANA)
- Currencies (ISO‑4217)
- Months / Weekdays (en)
- US states & codes

### Features

- **Zero dependencies**: pure data + helpers
- **Fast lookups**: prebuilt O(1) maps generated at build time
- **Typed**: full TypeScript types for all lists and helpers
- **Granular imports**: subpath entrypoints to keep bundles small
- **Standards aligned**: ISO/IANA/CLDR sourced data

### Installation

```bash
npm install @mirawision/infopedia
```

### Quick start

Aggregate import:
```ts
const { countries, getCountryByISO2 } = require('@mirawision/infopedia');
console.log(getCountryByISO2('PL'));
```

Focused subpaths:
```ts
const { countries, getCountryByISO2 } = require('@mirawision/infopedia/countries');
const { languages, getLanguageBy639_1 } = require('@mirawision/infopedia/languages');
const { locales, getLocalesByLanguage } = require('@mirawision/infopedia/locales');
const { timeZones, getTimeZone } = require('@mirawision/infopedia/timezones');
const { currencies, getCurrency } = require('@mirawision/infopedia/currencies');
```

### API Overview

Raw lists (frozen arrays):
- `countries`, `countryDials`, `continents`, `languages`, `locales`, `timeZones`, `currencies`, `months`, `weekdays`, `usStates`

Helpers (O(1) unless noted):
- Countries: `getCountryByISO2`, `getCountryByISO3`, `findCountriesByName` (search)
- Dials: `getDialByISO2`, `getCountriesByDialCode`
- Languages: `getLanguageBy639_1`, `getLanguageBy639_2`
- Locales: `getLocale`, `getLocalesByLanguage`
- Time zones: `getTimeZone`
- Currencies: `getCurrency`
- US states: `getUSState`

### Data Sources

- Countries & dials: `mledoze/countries`
- Languages: `haliaeetus/iso-639`
- Locales: CLDR `supplementalData.xml` territoryInfo
- Time zones: IANA `zone1970.tab`, current offsets via Intl
- Currencies: `datasets/currency-codes` + public symbol map

### Notes

- All arrays are frozen to discourage mutation.
- Time zones expose static metadata only (no runtime DST transitions).
- Months/weekdays are English only in v1.

### License

MIT
