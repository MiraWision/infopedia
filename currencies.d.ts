import type { Currency, Currency4217 } from './types';
import { currencyByCode } from './generated/maps';
declare const currencies: ReadonlyArray<Currency>;
declare function getCurrency(code: Currency4217): Currency | undefined;
export { currencies, currencyByCode, getCurrency };
