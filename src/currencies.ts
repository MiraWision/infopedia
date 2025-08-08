import type { Currency, Currency4217 } from './types';

import currenciesData from './data/currencies.json';
import { currencyByCode } from './generated/maps';

const currencies: ReadonlyArray<Currency> = Object.freeze(currenciesData as Currency[]);

function getCurrency(code: Currency4217): Currency | undefined {
  return currencyByCode[code];
}

export { currencies, currencyByCode, getCurrency };

